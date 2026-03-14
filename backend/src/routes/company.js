const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getCompanyProgress,
  updateCompanyProgress,
  updateCompanyEin
} = require('../controllers/companyProgressController');

const router = express.Router();

router.get('/:id/progress', protect, getCompanyProgress);
router.patch('/:id/progress', protect, updateCompanyProgress);
router.patch('/:id/ein', protect, updateCompanyEin);

module.exports = router;
