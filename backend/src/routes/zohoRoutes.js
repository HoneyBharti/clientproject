const express = require('express');
const { getZohoLeads, syncZohoLeads, getStoredLeads } = require('../controllers/zohoController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/leads', protect, authorize('admin'), getZohoLeads);
router.post('/sync', protect, authorize('admin'), syncZohoLeads);
router.get('/stored-leads', protect, authorize('admin'), getStoredLeads);

module.exports = router;
