const express = require('express');
const {
  getMyTaxFilings,
  getMyTaxFilingById,
  uploadTaxFilingDocument,
} = require('../controllers/taxFilingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/me', protect, getMyTaxFilings);
router.get('/:id', protect, getMyTaxFilingById);
router.post('/:id/documents', protect, uploadTaxFilingDocument);

module.exports = router;
