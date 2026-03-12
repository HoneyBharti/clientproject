const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, companyName, region } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      companyName,
      region
    });

    const token = generateToken(user._id);
    req.session.token = token;
    req.session.userId = user._id;
    req.session.save((sessionError) => {
      if (sessionError) {
        return res.status(500).json({ message: 'Unable to create session.' });
      }

      res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          companyName: user.companyName,
          servicePlan: user.servicePlan,
          subscriptionStatus: user.subscriptionStatus
        }
      });
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
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          companyName: user.companyName,
          servicePlan: user.servicePlan,
          subscriptionStatus: user.subscriptionStatus
        }
      });
    });
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
