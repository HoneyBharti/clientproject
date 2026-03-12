const express = require('express');
const { 
  getAllSettings, 
  getPublicSettings, 
  getSettingByKey, 
  createOrUpdateSetting, 
  deleteSetting 
} = require('../controllers/settingsController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('admin'), getAllSettings);
router.get('/public', getPublicSettings);
router.get('/:key', protect, authorize('admin'), getSettingByKey);
router.post('/', protect, authorize('admin'), createOrUpdateSetting);
router.delete('/:key', protect, authorize('admin'), deleteSetting);

module.exports = router;
