const express = require('express');
const { 
  getAllTickets, 
  getMyTickets, 
  getTicketById, 
  createTicket, 
  addMessage, 
  updateTicket, 
  deleteTicket 
} = require('../controllers/ticketController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('admin'), getAllTickets);
router.get('/me', protect, getMyTickets);
router.get('/:id', protect, getTicketById);
router.post('/', protect, createTicket);
router.post('/:id/messages', protect, addMessage);
router.put('/:id', protect, updateTicket);
router.delete('/:id', protect, authorize('admin'), deleteTicket);

module.exports = router;
