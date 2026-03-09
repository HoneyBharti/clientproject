const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const User = require('../models/User');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, plan, serviceId } = req.body;

    if (!req.user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: req.user.email,
        name: req.user.name,
      });
      await User.findByIdAndUpdate(req.user._id, { stripeCustomerId: customer.id });
      req.user.stripeCustomerId = customer.id;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      customer: req.user.stripeCustomerId,
      metadata: {
        userId: req.user._id.toString(),
        plan: plan || '',
        serviceId: serviceId || ''
      }
    });

    const payment = await Payment.create({
      user: req.user._id,
      stripePaymentId: paymentIntent.id,
      amount,
      plan,
      status: 'pending',
      metadata: { serviceId }
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.createCheckoutSession = async (req, res) => {
  try {
    const { amount, plan, country, state, entityType, email, name } = req.body;

    // BYPASS MODE - Skip Stripe and create fake session
    const fakeSessionId = 'cs_test_' + Date.now();
    const fakeUrl = `${process.env.FRONTEND_URL}/dashboard?payment=success&session_id=${fakeSessionId}`;

    // If user is authenticated, update their plan immediately
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, {
        servicePlan: plan,
        status: 'active',
        subscriptionStatus: 'active'
      });

      await Payment.create({
        user: req.user._id,
        stripePaymentId: fakeSessionId,
        amount,
        plan,
        status: 'succeeded',
        metadata: {
          country: country || 'USA',
          state: state || 'Wyoming',
          entityType: entityType || 'LLC'
        }
      });
    }

    res.json({ success: true, sessionId: fakeSessionId, url: fakeUrl });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log('Stripe webhook event:', event.type);

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object);
        break;
      case 'checkout.session.completed':
        await handleCheckoutComplete(event.data.object);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionCancelled(event.data.object);
        break;
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ message: error.message });
  }
};

async function handleCheckoutComplete(session) {
  const userId = session.metadata.userId;
  const plan = session.metadata.plan;

  // Only update user if authenticated (not guest)
  if (userId && userId !== 'guest') {
    await User.findByIdAndUpdate(userId, {
      servicePlan: plan,
      status: 'active',
      subscriptionStatus: 'active'
    });

    await Payment.create({
      user: userId,
      stripePaymentId: session.payment_intent,
      amount: session.amount_total / 100,
      plan,
      status: 'succeeded',
      metadata: {
        country: session.metadata.country,
        state: session.metadata.state,
        entityType: session.metadata.entityType
      }
    });
  } else {
    // Guest checkout - just log the payment
    console.log('Guest payment completed:', session.id);
  }
}

async function handleSubscriptionUpdate(subscription) {
  const user = await User.findOne({ stripeCustomerId: subscription.customer });
  if (user) {
    await User.findByIdAndUpdate(user._id, {
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status
    });
  }
}

async function handleSubscriptionCancelled(subscription) {
  const user = await User.findOne({ stripeCustomerId: subscription.customer });
  if (user) {
    await User.findByIdAndUpdate(user._id, {
      subscriptionStatus: 'cancelled'
    });
  }
}

async function handlePaymentSuccess(paymentIntent) {
  const payment = await Payment.findOne({ stripePaymentId: paymentIntent.id });
  if (payment) {
    payment.status = 'succeeded';
    await payment.save();

    await User.findByIdAndUpdate(payment.user, {
      servicePlan: payment.plan,
      status: 'active',
      subscriptionStatus: 'active'
    });
  }
}

async function handlePaymentFailure(paymentIntent) {
  const payment = await Payment.findOne({ stripePaymentId: paymentIntent.id });
  if (payment) {
    payment.status = 'failed';
    await payment.save();
  }
}

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).sort('-createdAt');
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('user', 'name email').sort('-createdAt');
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};