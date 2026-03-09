const express = require('express');
const {
  getMyDocuments,
  uploadMyDocument,
  getUserDocumentsAsAdmin,
  uploadOfficialDocumentAsAdmin,
  updateDocumentStatusAsAdmin,
  downloadDocument,
} = require('../controllers/documentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/me', protect, getMyDocuments);
router.post('/me/upload-client', protect, uploadMyDocument);

router.get('/admin/user/:userId', protect, authorize('admin'), getUserDocumentsAsAdmin);
router.post('/admin/user/:userId/upload-official', protect, authorize('admin'), uploadOfficialDocumentAsAdmin);
router.patch('/admin/:documentId/status', protect, authorize('admin'), updateDocumentStatusAsAdmin);

router.get('/:documentId/download', protect, downloadDocument);

module.exports = router;
