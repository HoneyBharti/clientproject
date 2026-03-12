const express = require('express');
const { 
  getAllOrders, 
  getMyOrders, 
  getOrderById, 
  createOrder, 
  updateOrder, 
  deleteOrder 
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('admin'), getAllOrders);
router.get('/me', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.post('/', protect, createOrder);
router.put('/:id', protect, authorize('admin'), updateOrder);
router.delete('/:id', protect, authorize('admin'), deleteOrder);

module.exports = router;
