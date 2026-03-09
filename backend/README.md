# YourLegal Backend API

Complete backend API with authentication, payments, and QuickBooks integration.

## Features

- ✅ User Authentication (JWT + Sessions)
- ✅ Role-Based Access Control (User/Admin)
- ✅ Stripe Payment Integration
- ✅ QuickBooks Integration
- ✅ MongoDB Database
- ✅ Secure Session Handling
- ✅ Protected Routes
- ✅ Payment Webhooks
- ✅ Rate Limiting & Security

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your credentials:
- MongoDB URI
- JWT Secret
- Stripe Keys
- QuickBooks Credentials

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (Protected)

### Payments
- `POST /api/payment/create-intent` - Create payment intent (Protected)
- `POST /api/payment/webhook` - Stripe webhook handler
- `GET /api/payment/my-payments` - Get user payments (Protected)
- `GET /api/payment/all` - Get all payments (Admin only)

### QuickBooks
- `GET /api/quickbooks/auth-url` - Get QB auth URL (Protected)
- `GET /api/quickbooks/callback` - OAuth callback (Protected)
- `POST /api/quickbooks/disconnect` - Disconnect QB (Protected)
- `GET /api/quickbooks/company-info` - Get company info (Protected)
- `GET /api/quickbooks/invoices` - Get invoices (Protected)

## Stripe Webhook Setup

1. Install Stripe CLI
2. Forward webhooks to local:
```bash
stripe listen --forward-to localhost:5000/api/payment/webhook
```
3. Copy webhook secret to `.env`

## QuickBooks Setup

1. Create app at https://developer.intuit.com
2. Add redirect URI: `http://localhost:5000/api/quickbooks/callback`
3. Copy Client ID and Secret to `.env`

## Security Features

- Helmet.js for HTTP headers
- Rate limiting (100 req/15min)
- CORS protection
- JWT token authentication
- Bcrypt password hashing
- Secure session storage
- Role-based authorization

## Database Models

### User
- Authentication credentials
- Role (user/admin)
- Company information
- QuickBooks tokens
- Stripe customer ID

### Payment
- Transaction records
- Payment status
- User reference
- Metadata

## Environment Variables

See `.env.example` for all required variables.