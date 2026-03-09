const express = require('express');
const { getAllUsers, updateUserStatus, getAdminStats } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/users', protect, authorize('admin'), getAllUsers);
router.put('/users/status', protect, authorize('admin'), updateUserStatus);
router.get('/stats', protect, authorize('admin'), getAdminStats);

module.exports = router;
