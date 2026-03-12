const express = require('express');
const { 
  createPaymentIntent,
  createCheckoutSession, 
  handleWebhook, 
  getPayments, 
  getAllPayments 
} = require('../controllers/paymentController');
const {
  createSubscription,
  cancelSubscription,
  getSubscription
} = require('../controllers/subscriptionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/create-intent', protect, createPaymentIntent);
router.post('/create-checkout', protect, createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);
router.get('/my-payments', protect, getPayments);
router.get('/all', protect, authorize('admin'), getAllPayments);

router.post('/subscription/create', protect, createSubscription);
router.post('/subscription/cancel', protect, cancelSubscription);
router.get('/subscription', protect, getSubscription);

module.exports = router;
