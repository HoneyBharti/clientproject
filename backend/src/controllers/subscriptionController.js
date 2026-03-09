const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

exports.createSubscription = async (req, res) => {
  try {
    const { priceId, plan } = req.body;

    if (!req.user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: req.user.email,
        name: req.user.name,
      });
      await User.findByIdAndUpdate(req.user._id, { stripeCustomerId: customer.id });
      req.user.stripeCustomerId = customer.id;
    }

    const subscription = await stripe.subscriptions.create({
      customer: req.user.stripeCustomerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        userId: req.user._id.toString(),
        plan
      }
    });

    await User.findByIdAndUpdate(req.user._id, {
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
      servicePlan: plan
    });

    res.json({
      success: true,
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    if (!req.user.subscriptionId) {
      return res.status(400).json({ message: 'No active subscription' });
    }

    await stripe.subscriptions.cancel(req.user.subscriptionId);

    await User.findByIdAndUpdate(req.user._id, {
      subscriptionStatus: 'cancelled'
    });

    res.json({ success: true, message: 'Subscription cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubscription = async (req, res) => {
  try {
    if (!req.user.subscriptionId) {
      return res.json({ success: true, subscription: null });
    }

    const subscription = await stripe.subscriptions.retrieve(req.user.subscriptionId);

    res.json({ success: true, subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
