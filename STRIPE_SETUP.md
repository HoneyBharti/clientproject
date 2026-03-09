# Stripe Integration Setup Guide

## Overview
Your application now has complete Stripe integration for handling plan purchases and subscriptions.

## Setup Steps

### 1. Get Stripe API Keys
1. Go to https://dashboard.stripe.com/
2. Navigate to Developers > API keys
3. Copy your Publishable key and Secret key

### 2. Configure Backend (.env)
Update `backend/.env` with your Stripe keys:
```
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key
```

### 3. Configure Frontend (.env.local)
Update `.env.local` in the root directory:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Setup Stripe Webhook
1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Run: `stripe listen --forward-to localhost:5000/api/payment/webhook`
3. Copy the webhook signing secret (starts with `whsec_`)
4. Add to `backend/.env`:
```
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Features Implemented

### 1. Plan Selection (`/pricing`)
- Displays 3 pricing tiers: Micro ($499), Vitals ($2,388), Elite ($3,588)
- Users can select state (Wyoming/Delaware) and entity type (LLC/C-Corp)
- Redirects to checkout with selected plan

### 2. Checkout Flow (`/checkout`)
- Shows order summary with price breakdown
- Calculates total including state fees
- Creates Stripe Checkout Session
- Redirects to Stripe hosted payment page

### 3. Payment Processing
- One-time payments via Stripe Checkout
- Subscription support for recurring billing
- Automatic customer creation in Stripe
- Payment status tracking in MongoDB

### 4. Webhook Handling
Automatically processes:
- `payment_intent.succeeded` - Updates payment status
- `checkout.session.completed` - Activates user plan
- `customer.subscription.created/updated` - Updates subscription
- `customer.subscription.deleted` - Handles cancellations

## API Endpoints

### Payment Endpoints
- `POST /api/payment/create-checkout` - Create Stripe Checkout session
- `POST /api/payment/create-intent` - Create payment intent
- `POST /api/payment/webhook` - Handle Stripe webhooks
- `GET /api/payment/my-payments` - Get user's payment history

### Subscription Endpoints
- `POST /api/payment/subscription/create` - Create subscription
- `POST /api/payment/subscription/cancel` - Cancel subscription
- `GET /api/payment/subscription` - Get subscription details

## Components Created

1. **PlanSelector** (`src/components/payment/PlanSelector.tsx`)
   - Displays pricing cards with features
   - Handles plan selection

2. **StripeCheckout** (`src/components/payment/StripeCheckout.tsx`)
   - Initiates Stripe Checkout flow
   - Handles loading and error states

3. **Pricing Page** (`src/app/pricing/page.tsx`)
   - Full pricing page with plan selection
   - State and entity type selectors

## Testing

### Test Cards
Use these test card numbers in Stripe test mode:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

Use any future expiry date, any 3-digit CVC, and any ZIP code.

## User Flow

1. User visits `/pricing`
2. Selects state and entity type
3. Clicks "Select Plan" button
4. Redirected to `/checkout` with plan details
5. Reviews order summary
6. Clicks "Proceed to Payment"
7. Redirected to Stripe Checkout
8. Completes payment
9. Redirected back to `/dashboard?payment=success`
10. Webhook updates user's plan and status in database

## Database Updates

When payment succeeds:
- User's `servicePlan` is updated
- User's `status` changes to 'active'
- User's `subscriptionStatus` is set
- Payment record is created in MongoDB

## Production Checklist

- [ ] Replace test API keys with live keys
- [ ] Set up production webhook endpoint
- [ ] Update `FRONTEND_URL` in backend `.env`
- [ ] Enable HTTPS for webhook security
- [ ] Test all payment flows
- [ ] Set up Stripe email receipts
- [ ] Configure tax collection if needed
