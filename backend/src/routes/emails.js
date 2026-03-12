const express = require('express');
const { 
  getAllEmails, 
  getMyEmails, 
  sendEmail, 
  getEmailById 
} = require('../controllers/emailController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('admin'), getAllEmails);
router.get('/me', protect, getMyEmails);
router.get('/:id', protect, authorize('admin'), getEmailById);
router.post('/send', protect, authorize('admin'), sendEmail);

module.exports = router;
