const express = require('express');
const { getZohoLeads } = require('../controllers/zohoController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/leads', protect, authorize('admin'), getZohoLeads);

module.exports = router;
