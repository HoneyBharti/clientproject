const express = require('express');
const { 
  getComplianceOverview, 
  getUserCompliance,
  getMyComplianceEvents
} = require('../controllers/complianceController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/overview', protect, authorize('admin'), getComplianceOverview);
router.get('/user/:userId', protect, authorize('admin'), getUserCompliance);
router.get('/events/me', protect, getMyComplianceEvents);

module.exports = router;
