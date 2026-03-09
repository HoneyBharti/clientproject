const OAuthClient = require('intuit-oauth');
const User = require('../models/User');

const oauthClient = new OAuthClient({
  clientId: process.env.QB_CLIENT_ID,
  clientSecret: process.env.QB_CLIENT_SECRET,
  environment: process.env.QB_ENVIRONMENT || 'sandbox',
  redirectUri: process.env.QB_REDIRECT_URI,
});

const makeApiCall = async (accessToken, realmId, url, method = 'GET', body = null) => {
  const baseUrl = process.env.QB_ENVIRONMENT === 'sandbox' 
    ? 'https://sandbox-quickbooks.api.intuit.com'
    : 'https://quickbooks.api.intuit.com';
  
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${baseUrl}/v3/company/${realmId}/${url}`, options);
  return response.json();
};

const refreshTokenIfNeeded = async (user) => {
  if (!user.quickBooksTokens || !user.quickBooksTokens.expiresAt) {
    return user;
  }

  const expiresAt = new Date(user.quickBooksTokens.expiresAt);
  const now = new Date();
  
  if (expiresAt > now) {
    return user;
  }

  try {
    oauthClient.setToken({
      refresh_token: user.quickBooksTokens.refreshToken,
    });

    const authResponse = await oauthClient.refresh();
    const token = authResponse.getJson();

    user.quickBooksTokens = {
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
      realmId: user.quickBooksTokens.realmId,
      expiresAt: new Date(Date.now() + token.expires_in * 1000)
    };
    await user.save();
    return user;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};

exports.getAuthUrl = (req, res) => {
  try {
    const authUri = oauthClient.authorizeUri({
      scope: [OAuthClient.scopes.Accounting],
      state: req.user.id,
    });
    res.json({ success: true, authUrl: authUri });
  } catch (error) {
    console.error('QuickBooks Auth URL Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.handleCallback = async (req, res) => {
  try {
    const { code, realmId, state } = req.query;
    const userId = state;

    console.log('QuickBooks Callback:', { code: !!code, realmId, userId });

    const authResponse = await oauthClient.createToken(req.url);
    const token = authResponse.getJson();

    console.log('QuickBooks Token Success');

    await User.findByIdAndUpdate(userId, {
      quickBooksConnected: true,
      quickBooksTokens: {
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
        realmId,
        expiresAt: new Date(Date.now() + token.expires_in * 1000)
      }
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard?qb_status=success&page=settings`);
  } catch (error) {
    console.error('QuickBooks Callback Error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?qb_status=error&page=settings`);
  }
};

exports.disconnect = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      quickBooksConnected: false,
      quickBooksTokens: {}
    });
    res.json({ success: true, message: 'QuickBooks disconnected' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkConnection = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ 
      success: true, 
      connected: user.quickBooksConnected || false 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompanyInfo = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user.quickBooksConnected) {
      return res.status(400).json({ message: 'QuickBooks not connected' });
    }

    user = await refreshTokenIfNeeded(user);
    const data = await makeApiCall(
      user.quickBooksTokens.accessToken,
      user.quickBooksTokens.realmId,
      'companyinfo/' + user.quickBooksTokens.realmId
    );
    
    res.json({ success: true, companyInfo: data });
  } catch (error) {
    console.error('Get company info error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user.quickBooksConnected) {
      return res.status(400).json({ message: 'QuickBooks not connected' });
    }

    user = await refreshTokenIfNeeded(user);
    const data = await makeApiCall(
      user.quickBooksTokens.accessToken,
      user.quickBooksTokens.realmId,
      'query?query=select * from Invoice'
    );
    
    res.json({ success: true, invoices: data.QueryResponse?.Invoice || [] });
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.proxyRequest = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user.quickBooksConnected) {
      return res.status(400).json({ message: 'QuickBooks not connected' });
    }

    user = await refreshTokenIfNeeded(user);
    const { method, url, data } = req.body;

    const result = await makeApiCall(
      user.quickBooksTokens.accessToken,
      user.quickBooksTokens.realmId,
      url,
      method,
      data
    );
    
    res.json(result);
  } catch (error) {
    console.error('Proxy request error:', error);
    res.status(500).json({ message: error.message });
  }
};
