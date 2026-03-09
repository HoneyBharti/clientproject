# Backend Integration Guide

## ✅ Yes, the auth will work from your frontend!

The backend is fully configured to work with your Next.js frontend.

## Quick Start

### 1. Start Backend Server

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

Backend will run on: `http://localhost:5000`

### 2. Configure Frontend

Add to your `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
```

### 3. Use API from Frontend

```typescript
import { api } from '@/lib/api';

// Register user
const result = await api.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  companyName: 'Acme Inc',
  region: 'USA'
});

// Login user
const loginResult = await api.login({
  email: 'john@example.com',
  password: 'password123'
});

// Store token
localStorage.setItem('token', loginResult.token);

// Use token for protected routes
const token = localStorage.getItem('token');
const user = await api.getMe(token);
```

## How It Works

### Registration Flow:
1. Frontend sends POST to `/api/auth/register`
2. Backend creates user in MongoDB
3. Backend creates Stripe customer
4. Backend returns JWT token + user data
5. Frontend stores token (localStorage/cookies)
6. Session is created on backend

### Login Flow:
1. Frontend sends POST to `/api/auth/login`
2. Backend verifies credentials
3. Backend returns JWT token
4. Frontend stores token
5. Session is created on backend

### Protected Routes:
1. Frontend sends token in Authorization header
2. Backend verifies token
3. Backend returns requested data

## Payment Flow

```typescript
// Create payment intent
const { clientSecret } = await api.createPaymentIntent(token, {
  amount: 99,
  plan: 'Growth'
});

// Use Stripe.js to complete payment
const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const result = await stripe.confirmCardPayment(clientSecret);
```

## QuickBooks Flow

```typescript
// Get auth URL
const { authUrl } = await api.getQBAuthUrl(token);

// Redirect user to QuickBooks
window.location.href = authUrl;

// After callback, check connection
const { companyInfo } = await api.getQBCompanyInfo(token);
```

## Security Features

✅ **CORS Enabled** - Frontend can make requests
✅ **Credentials Included** - Sessions work across domains
✅ **JWT + Sessions** - Dual authentication
✅ **Password Hashing** - Bcrypt with salt rounds
✅ **Rate Limiting** - 100 requests per 15 minutes
✅ **Helmet.js** - Security headers
✅ **Role-Based Access** - Admin/User roles

## Testing

### Test Registration:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "companyName": "Test Co",
    "region": "USA"
  }'
```

### Test Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Database Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGODB_URI` in `.env`
3. Database and collections are created automatically

## Stripe Setup

1. Get keys from https://dashboard.stripe.com/test/apikeys
2. Add to backend `.env`:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
3. Add to frontend `.env.local`:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## QuickBooks Setup

1. Create app at https://developer.intuit.com
2. Add redirect URI: `http://localhost:5000/api/quickbooks/callback`
3. Copy credentials to `.env`

## Admin Access

To make a user admin:
```javascript
// In MongoDB or using MongoDB Compass
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Troubleshooting

**CORS Error?**
- Check `FRONTEND_URL` in backend `.env`
- Ensure `credentials: 'include'` in fetch calls

**Session Not Working?**
- Check MongoDB connection
- Verify `SESSION_SECRET` is set

**Payment Failing?**
- Test with Stripe test cards: `4242 4242 4242 4242`
- Check webhook is running: `stripe listen --forward-to localhost:5000/api/payment/webhook`

## Production Deployment

1. Set `NODE_ENV=production`
2. Use production MongoDB URI
3. Use production Stripe keys
4. Set secure cookie settings
5. Enable HTTPS
6. Update CORS origins