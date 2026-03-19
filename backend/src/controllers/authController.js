const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const { sendZeptoMail } = require('../services/zeptoMailService');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const isEmailServiceConfigured = () =>
  Boolean(process.env.ZEPTOMAIL_TOKEN && process.env.ZEPTOMAIL_FROM_ADDRESS);

const isEmailVerificationEnabled = () => {
  if (process.env.EMAIL_VERIFICATION_ENABLED === 'false') return false;
  return isEmailServiceConfigured();
};

const buildVerificationToken = (user) => {
  const token = crypto.randomBytes(32).toString('hex');
  user.emailVerificationToken = crypto.createHash('sha256').update(token).digest('hex');
  user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return token;
};

const buildResetToken = (user) => {
  const token = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
  user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
  return token;
};

const sendVerificationEmail = async (user, token) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const subject = 'Verify your YourLegal account';
  const text = `Please verify your email by visiting: ${verifyUrl}`;
  const html = `<p>Welcome to YourLegal!</p><p>Please verify your email by clicking the link below:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
  await sendZeptoMail({ to: user.email, subject, text, html });
};

const sendResetEmail = async (user, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const subject = 'Reset your YourLegal password';
  const text = `Reset your password by visiting: ${resetUrl}`;
  const html = `<p>We received a request to reset your password.</p><p>You can reset it here:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`;
  await sendZeptoMail({ to: user.email, subject, text, html });
};

const serializeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  companyName: user.companyName,
  region: user.region,
  servicePlan: user.servicePlan,
  subscriptionStatus: user.subscriptionStatus,
  bypassPlan: user.bypassPlan,
});

exports.register = async (req, res) => {
  try {
    const { name, email, password, companyName, region, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'Name, email, phone, and password are required.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      companyName,
      region,
      phone,
      emailVerified: !isEmailVerificationEnabled()
    });

    if (isEmailVerificationEnabled()) {
      const verifyToken = buildVerificationToken(user);
      await user.save();

      try {
        await sendVerificationEmail(user, verifyToken);
      } catch (mailError) {
        await User.deleteOne({ _id: user._id });
        return res.status(500).json({ message: mailError.message || 'Unable to send verification email.' });
      }

      return res.status(201).json({
        success: true,
        message: 'Account created. Please verify your email to continue.',
        verificationRequired: true
      });
    }

    res.status(201).json({
      success: true,
      message: 'Account created. You can log in now.',
      verificationRequired: false
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is deactivated
    if (user.status === 'paused' || user.status === 'closed') {
      return res.status(403).json({ 
        message: 'Your account has been deactivated. Please contact support for assistance.' 
      });
    }

    if (user.emailVerified === false && isEmailVerificationEnabled()) {
      return res.status(403).json({ message: 'Please verify your email before logging in.' });
    }

    const token = generateToken(user._id);
    req.session.token = token;
    req.session.userId = user._id;
    req.session.save((sessionError) => {
      if (sessionError) {
        return res.status(500).json({ message: 'Unable to create session.' });
      }

      res.json({
        success: true,
        token,
        user: serializeUser(user)
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const token = req.body?.token || req.query?.token;
    if (!token) {
      return res.status(400).json({ message: 'Verification token is required.' });
    }

    const hashedToken = crypto.createHash('sha256').update(String(token)).digest('hex');
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification link.' });
    }

    user.emailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;
    await user.save();

    res.json({ success: true, message: 'Email verified successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    if (!isEmailVerificationEnabled()) {
      return res.json({ success: true, message: 'Email verification is currently disabled.' });
    }

    const user = await User.findOne({ email });
    if (!user || user.emailVerified) {
      return res.json({ success: true });
    }

    const verifyToken = buildVerificationToken(user);
    await user.save();
    await sendVerificationEmail(user, verifyToken);

    res.json({ success: true, message: 'Verification email sent.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    if (!isEmailServiceConfigured()) {
      return res.status(503).json({ message: 'Email service is not configured yet.' });
    }

    const user = await User.findOne({ email });
    if (user) {
      const resetToken = buildResetToken(user);
      await user.save();
      try {
        await sendResetEmail(user, resetToken);
      } catch (error) {
        return res.status(500).json({ message: error.message || 'Unable to send reset email.' });
      }
    }

    res.json({ success: true, message: 'If an account exists, a reset link has been sent.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: 'Token and new password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const hashedToken = crypto.createHash('sha256').update(String(token)).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() }
    }).select('+password');

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token.' });
    }

    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required.' });
    }

    if (String(newPassword).length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.googleAuth = async (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res.status(500).json({ message: 'Google OAuth is not configured.' });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    prompt: 'select_account',
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
};

exports.googleCallback = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      return res.status(400).json({ message: 'Authorization code is missing.' });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      return res.status(500).json({ message: 'Google OAuth is not configured.' });
    }

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: String(code),
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json().catch(() => null);
    if (!tokenRes.ok || !tokenData?.access_token) {
      return res.status(400).json({ message: 'Unable to authenticate with Google.' });
    }

    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userInfo = await userInfoRes.json().catch(() => null);

    if (!userInfo?.email) {
      return res.status(400).json({ message: 'Unable to fetch Google profile.' });
    }

    let user = await User.findOne({ email: userInfo.email });
    if (!user) {
      const randomPassword = crypto.randomBytes(16).toString('hex');
      user = await User.create({
        name: userInfo.name || userInfo.email.split('@')[0],
        email: userInfo.email,
        password: randomPassword,
        companyName: '',
        emailVerified: true,
        googleId: userInfo.id || undefined,
      });
    } else {
      if (user.emailVerified === false) {
        user.emailVerified = true;
      }
      if (userInfo.id) {
        user.googleId = userInfo.id;
      }
      await user.save();
    }

    const token = generateToken(user._id);
    req.session.token = token;
    req.session.userId = user._id;
    req.session.save((sessionError) => {
      if (sessionError) {
        return res.status(500).json({ message: 'Unable to create session.' });
      }

      const redirectBase = process.env.FRONTEND_URL || '';
      let redirectPath = '/dashboard';
      if (user.role === 'admin') {
        redirectPath = '/admin';
      } else if (!user.servicePlan && !user.bypassPlan) {
        redirectPath = '/usa/pricing';
      }

      res.redirect(`${redirectBase}${redirectPath}`);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const { name, email, phone } = req.body || {};
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const hasPhone = typeof phone === 'string';
    const trimmedPhone = hasPhone ? phone.trim() : '';

    if (!trimmedName && !trimmedEmail && !hasPhone) {
      return res.status(400).json({ message: 'Name, email, or phone is required.' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (trimmedEmail && trimmedEmail !== user.email) {
      const existing = await User.findOne({ email: trimmedEmail, _id: { $ne: user._id } });
      if (existing) {
        return res.status(400).json({ message: 'Email is already in use.' });
      }
    }

    let verificationRequired = false;
    let verificationToken = null;

    if (trimmedName) {
      user.name = trimmedName;
    }

    if (trimmedEmail && trimmedEmail !== user.email) {
      user.email = trimmedEmail;
      if (isEmailVerificationEnabled()) {
        user.emailVerified = false;
        verificationToken = buildVerificationToken(user);
        verificationRequired = true;
      }
    }

    if (hasPhone) {
      user.phone = trimmedPhone;
    }

    await user.save();

    if (verificationRequired && verificationToken) {
      try {
        await sendVerificationEmail(user, verificationToken);
      } catch (mailError) {
        // Keep the update; user can resend verification later.
        return res.status(200).json({
          success: true,
          user: serializeUser(user),
          verificationRequired: true,
          message: 'Profile updated, but verification email could not be sent.'
        });
      }
    }

    res.json({ success: true, user: serializeUser(user), verificationRequired });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  };

  if (!req.session) {
    res.clearCookie('connect.sid', cookieOptions);
    return res.json({ success: true, message: 'Logged out successfully' });
  }

  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Unable to log out. Please try again.' });
    }

    res.clearCookie('connect.sid', cookieOptions);
    return res.json({ success: true, message: 'Logged out successfully' });
  });
};

exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};
