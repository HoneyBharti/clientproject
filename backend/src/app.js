const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
});
app.use('/api/', limiter);

app.use((req, res, next) => {
  if (req.originalUrl === '/api/payment/webhook') {
    next();
    return;
  }

  express.json({ limit: '25mb' })(req, res, next);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    proxy: process.env.NODE_ENV === 'production',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      touchAfter: 24 * 3600,
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  })
);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/quickbooks', require('./routes/quickbooks'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin/compliance', require('./routes/adminCompliance'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/activity-logs', require('./routes/activityLogs'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/formations', require('./routes/formations'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/tickets', require('./routes/tickets'));
app.use('/api/services', require('./routes/services'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/emails', require('./routes/emails'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/onboarding', require('./routes/onboarding'));
app.use('/api/compliance', require('./routes/compliance'));
app.use('/api/tax-filings', require('./routes/taxFilings'));
app.use('/api/admin/tax-filings', require('./routes/adminTaxFilings'));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
