const express = require('express');
const {
  createOnboardingSubmission,
  getOnboardingSubmissions,
  createFormationFromOnboarding,
} = require('../controllers/onboardingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createOnboardingSubmission);
router.get('/admin', protect, authorize('admin'), getOnboardingSubmissions);
router.post('/admin/:id/create-formation', protect, authorize('admin'), createFormationFromOnboarding);

module.exports = router;
