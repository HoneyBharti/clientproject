const ZOHO_ACCOUNTS_URL = process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.com';
const ZOHO_API_BASE_URL = process.env.ZOHO_API_BASE_URL || 'https://www.zohoapis.com';

let cachedAccessToken = null;
let tokenExpiresAt = 0;

const requireZohoEnv = () => {
  const required = ['ZOHO_CLIENT_ID', 'ZOHO_CLIENT_SECRET', 'ZOHO_REFRESH_TOKEN'];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    const error = new Error(`Missing Zoho environment variables: ${missing.join(', ')}`);
    error.statusCode = 500;
    throw error;
  }
};

const requestAccessToken = async () => {
  requireZohoEnv();

  const body = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    grant_type: 'refresh_token',
  });

  const response = await fetch(`${ZOHO_ACCOUNTS_URL}/oauth/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.access_token) {
    const error = new Error(data?.error || data?.message || 'Unable to refresh Zoho access token');
    error.statusCode = 502;
    error.details = data;
    throw error;
  }

  cachedAccessToken = data.access_token;
  const expiresInSeconds = Number(data.expires_in) || 3600;
  tokenExpiresAt = Date.now() + Math.max(expiresInSeconds - 60, 0) * 1000;

  return cachedAccessToken;
};

const getAccessToken = async () => {
  if (cachedAccessToken && Date.now() < tokenExpiresAt) {
    return cachedAccessToken;
  }
  return requestAccessToken();
};

const formatLead = (lead) => ({
  id: lead?.id,
  Full_Name: lead?.Full_Name || '',
  Email: lead?.Email || '',
  Phone: lead?.Phone || '',
  Company: lead?.Company || '',
  Lead_Source: lead?.Lead_Source || '',
  Created_Time: lead?.Created_Time || '',
});

const fetchLeads = async () => {
  let accessToken = await getAccessToken();

  const fetchFromZoho = async (token) =>
    fetch(`${ZOHO_API_BASE_URL}/crm/v2/Leads`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    });

  let response = await fetchFromZoho(accessToken);

  if (response.status === 401) {
    cachedAccessToken = null;
    tokenExpiresAt = 0;
    accessToken = await requestAccessToken();
    response = await fetchFromZoho(accessToken);
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.message || data?.error?.message || 'Zoho API request failed');
    error.statusCode = response.status || 502;
    error.details = data;
    throw error;
  }

  const leads = Array.isArray(data?.data) ? data.data.map(formatLead) : [];
  return leads;
};

module.exports = {
  fetchLeads,
};
