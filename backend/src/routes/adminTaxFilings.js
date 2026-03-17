const express = require('express');
const {
  getAllTaxFilings,
  getTaxFilingById,
  createTaxFiling,
  updateTaxFiling,
  deleteTaxFiling,
  updateTaxFilingStatus,
  assignTaxFiling,
  requestTaxFilingDocuments,
} = require('../controllers/taxFilingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/', getAllTaxFilings);
router.post('/', createTaxFiling);
router.get('/:id', getTaxFilingById);
router.put('/:id', updateTaxFiling);
router.delete('/:id', deleteTaxFiling);
router.patch('/:id/status', updateTaxFilingStatus);
router.post('/:id/assign', assignTaxFiling);
router.post('/:id/request-documents', requestTaxFilingDocuments);

module.exports = router;
