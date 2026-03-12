const express = require('express');
const { getLogs, getUserLogs, createAdminLog } = require('../controllers/activityLogController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('admin'), getLogs);
router.post('/', protect, authorize('admin'), createAdminLog);
router.get('/me', protect, getUserLogs);

module.exports = router;
