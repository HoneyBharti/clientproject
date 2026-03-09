const express = require('express');
const { 
  getAuthUrl, 
  handleCallback, 
  disconnect, 
  getCompanyInfo, 
  getInvoices,
  proxyRequest,
  checkConnection
} = require('../controllers/quickbooksController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/auth-url', protect, getAuthUrl);
router.get('/callback', handleCallback);
router.post('/disconnect', protect, disconnect);
router.get('/company-info', protect, getCompanyInfo);
router.get('/invoices', protect, getInvoices);
router.post('/proxy', protect, proxyRequest);
router.get('/status', protect, checkConnection);

module.exports = router;