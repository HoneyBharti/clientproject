const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const User = require('../models/User');
const Order = require('../models/Order');

const generateOrderNumber = () => {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

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
    const { amount, plan, country, state, entityType, serviceType, serviceName, serviceId } = req.body;
    const numericAmount = Number(amount);
    const planValue = plan && String(plan).trim() ? String(plan).trim() : undefined;
    const resolvedServiceName = serviceName && String(serviceName).trim() ? String(serviceName).trim() : planValue || 'Service';

    if (!numericAmount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: 'Amount is required.' });
    }

    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    if (!req.user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: req.user.email,
        name: req.user.name,
      });
      await User.findByIdAndUpdate(req.user._id, { stripeCustomerId: customer.id });
      req.user.stripeCustomerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer: req.user.stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(numericAmount * 100),
            product_data: {
              name: `${resolvedServiceName} ${entityType || ''}`.trim(),
              description: `${country || 'USA'} • ${state || 'Unknown'} • ${entityType || 'LLC'}`,
            },
          },
        },
      ],
      metadata: {
        userId: req.user._id.toString(),
        plan: planValue || '',
        serviceName: resolvedServiceName,
        serviceId: serviceId || '',
        country: country || 'USA',
        state: state || 'Unknown',
        entityType: entityType || 'LLC',
        serviceType: serviceType || 'formation',
      },
      success_url: `${process.env.FRONTEND_URL}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout?planName=${encodeURIComponent(plan || '')}&state=${encodeURIComponent(state || '')}&entityType=${encodeURIComponent(entityType || '')}&country=${encodeURIComponent(country || 'USA')}`,
    });

    const paymentPayload = {
      user: req.user._id,
      stripePaymentId: session.id,
      amount: numericAmount,
      plan: planValue,
      status: 'pending',
      metadata: {
        serviceName: resolvedServiceName,
        serviceId: serviceId || '',
        serviceType: serviceType || 'formation',
        country: country || 'USA',
        state: state || 'Unknown',
        entityType: entityType || 'LLC',
        checkoutSessionId: session.id,
      },
    };

    if (!planValue) {
      delete paymentPayload.plan;
    }

    const payment = await Payment.create(paymentPayload);

    const existingOrder = await Order.findOne({ payment: payment._id });
    if (!existingOrder) {
      const orderPayload = {
        user: req.user._id,
        orderNumber: generateOrderNumber(),
        serviceType: serviceType || 'formation',
        plan: planValue,
        status: 'pending',
        amount: numericAmount,
        payment: payment._id,
        metadata: {
          serviceName: resolvedServiceName,
          serviceId: serviceId || '',
          country: country || 'USA',
          state: state || 'Unknown',
          entityType: entityType || 'LLC',
        },
      };

      if (!planValue) {
        delete orderPayload.plan;
      }

      await Order.create(orderPayload);
    }

    res.json({ success: true, sessionId: session.id, url: session.url });
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
  const userId = session.metadata?.userId;
  const plan = session.metadata?.plan;
  const sessionId = session.id;
  const allowedPlans = new Set(['Starter', 'Growth', 'Scale', 'Micro', 'Vitals', 'Elite', 'Formation', 'Compliance', 'AllInOne', 'Startup']);
  const allowedServiceTypes = new Set(['formation', 'accounting', 'bookkeeping', 'tax-compliance', 'payroll', 'virtual-cfo', 'annual-compliance', 'audit-support']);
  const planValue = plan && allowedPlans.has(plan) ? plan : undefined;
  const serviceTypeValue = session.metadata?.serviceType && allowedServiceTypes.has(session.metadata.serviceType)
    ? session.metadata.serviceType
    : 'formation';
  const serviceName = session.metadata?.serviceName?.trim() || planValue || 'Service';

  // Only update user if authenticated (not guest)
  if (userId && userId !== 'guest') {
    const updates = {};
    if (planValue) {
      updates.servicePlan = planValue;
      updates.status = 'active';
      updates.subscriptionStatus = 'active';
    }
    if (Object.keys(updates).length) {
      await User.findByIdAndUpdate(userId, updates);
    }

    let payment = await Payment.findOne({ stripePaymentId: sessionId });
    if (payment) {
      payment.status = 'succeeded';
      payment.amount = (session.amount_total || 0) / 100;
      payment.metadata = {
        ...(payment.metadata || {}),
        serviceName,
        serviceId: session.metadata?.serviceId,
        serviceType: serviceTypeValue,
        country: session.metadata?.country,
        state: session.metadata?.state,
        entityType: session.metadata?.entityType,
        paymentIntentId: session.payment_intent,
      };
      if (planValue && !payment.plan) {
        payment.plan = planValue;
      }
      await payment.save();
    } else {
      const paymentPayload = {
        user: userId,
        stripePaymentId: sessionId,
        amount: (session.amount_total || 0) / 100,
        plan: planValue,
        status: 'succeeded',
        metadata: {
          serviceName,
          serviceId: session.metadata?.serviceId,
          serviceType: serviceTypeValue,
          country: session.metadata?.country,
          state: session.metadata?.state,
          entityType: session.metadata?.entityType,
          paymentIntentId: session.payment_intent,
        },
      };

      if (!planValue) {
        delete paymentPayload.plan;
      }

      payment = await Payment.create(paymentPayload);
    }

    if (payment) {
      const existingOrder = await Order.findOne({ payment: payment._id });
      if (existingOrder) {
        await Order.findByIdAndUpdate(existingOrder._id, { status: 'confirmed' });
      } else {
        const orderPayload = {
          user: userId,
          orderNumber: generateOrderNumber(),
          serviceType: serviceTypeValue,
          plan: planValue,
          status: 'confirmed',
          amount: (session.amount_total || 0) / 100,
          payment: payment._id,
          metadata: {
            serviceName,
            serviceId: session.metadata?.serviceId,
            country: session.metadata?.country,
            state: session.metadata?.state,
            entityType: session.metadata?.entityType,
          },
        };

        if (!planValue) {
          delete orderPayload.plan;
        }

        await Order.create(orderPayload);
      }
    }
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

    if (payment.plan) {
      await User.findByIdAndUpdate(payment.user, {
        servicePlan: payment.plan,
        status: 'active',
        subscriptionStatus: 'active'
      });
    }

    // Update associated order to confirmed
    await Order.findOneAndUpdate(
      { payment: payment._id },
      { status: 'confirmed' }
    );
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
