const mongoose = require('mongoose');
const Document = require('../models/Document');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { getS3Object, deleteS3Object } = require('../utils/s3Client');
const { MAX_FILE_BYTES, parseBase64File, storeDocument } = require('../utils/documentStorage');
const TaxFiling = require('../models/TaxFiling');

const toDocumentResponse = (doc, req) => {
  const host = req.get('host');
  const protocol = req.protocol || 'http';
  const baseUrl = `${protocol}://${host}`;
  return {
    id: doc._id,
    userId: doc.user,
    name: doc.originalName,
    mimeType: doc.mimeType,
    size: doc.size,
    source: doc.source,
    status: doc.status,
    folder: doc.folder,
    subfolder: doc.subfolder,
    documentType: doc.documentType,
    uploadedAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    reviewedAt: doc.reviewedAt,
    taxFilingId: doc.taxFiling || null,
    downloadUrl: `${baseUrl}/api/documents/${doc._id}/download`,
  };
};

const validateObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const allowedDocumentTypes = new Set([
  'passport',
  'proof_of_address',
  'pan',
  'aadhaar',
  'photo',
  'bank_statement',
  'tax_id',
  'prior_tax_return',
  'certificate_of_incorporation',
  'operating_agreement',
  'bylaws',
  'ein_confirmation',
  'irs_documents',
  'state_filings',
  'bank_account_documents',
  'loan_documents',
  'contract',
  'nda',
  'ip_assignment',
  'shareholder_agreement',
  'other',
]);

const normalizeDocumentType = (value) => {
  if (!value) return undefined;
  const raw = String(value).trim();
  const snake = raw
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
  if (snake === 'proofofaddress') return 'proof_of_address';
  if (snake === 'bank_statements') return 'bank_statement';
  return allowedDocumentTypes.has(snake) ? snake : 'other';
};

const notifyAdmins = async ({ title, message, metadata = {}, link } = {}) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('_id').lean();
    if (!admins.length) return;
    const payload = admins.map((admin) => ({
      user: admin._id,
      title,
      message,
      type: 'info',
      category: 'document',
      link,
      metadata,
    }));
    await Notification.insertMany(payload);
  } catch (error) {
    console.error('Admin notification error:', error?.message || error);
  }
};

const notifyUser = async (userId, { title, message, metadata = {}, link, type = 'info' } = {}) => {
  if (!userId) return;
  try {
    await Notification.create({
      user: userId,
      title,
      message,
      type,
      category: 'document',
      link,
      metadata,
    });
  } catch (error) {
    console.error('User notification error:', error?.message || error);
  }
};

exports.getMyDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ user: req.user._id })
      .select('-data')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      documents: docs.map((doc) => toDocumentResponse(doc, req)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadMyDocument = async (req, res) => {
  try {
    const { fileName, mimeType, fileDataBase64, folder, subfolder, documentType } = req.body;

    if (!fileName || !mimeType || !fileDataBase64) {
      return res.status(400).json({ message: 'fileName, mimeType, and fileDataBase64 are required.' });
    }

    if (!folder || !['KYC', 'Compliance', 'Tax', 'Banking', 'Legal', 'Corporate'].includes(folder)) {
      return res.status(400).json({ message: 'Valid folder is required (KYC, Compliance, Tax, Banking, Legal, Corporate).' });
    }

    const buffer = parseBase64File(fileDataBase64);
    if (!buffer || buffer.length === 0) {
      return res.status(400).json({ message: 'Invalid file payload.' });
    }
    if (buffer.length > MAX_FILE_BYTES) {
      return res.status(413).json({ message: 'File exceeds 10 MB limit.' });
    }

    const doc = await storeDocument({
      userId: req.user._id,
      source: 'client_uploads',
      status: 'pending',
      fileName,
      mimeType,
      buffer,
      uploadedBy: req.user._id,
      folder: folder || 'KYC',
      subfolder,
      documentType: normalizeDocumentType(documentType),
    });

    await notifyAdmins({
      title: 'New client document uploaded',
      message: `${req.user.name || req.user.email || 'A client'} uploaded ${fileName}.`,
      metadata: {
        userId: req.user._id,
        documentId: doc._id,
        folder: doc.folder,
        documentType: doc.documentType,
      },
      link: '/admin/documents',
    });

    res.status(201).json({
      success: true,
      document: toDocumentResponse(doc, req),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserDocumentsAsAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!validateObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }

    const docs = await Document.find({ user: userId })
      .select('-data')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      documents: docs.map((doc) => toDocumentResponse(doc, req)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadOfficialDocumentAsAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fileName, mimeType, fileDataBase64, folder, subfolder, documentType } = req.body;

    if (!validateObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }
    if (!fileName || !mimeType || !fileDataBase64) {
      return res.status(400).json({ message: 'fileName, mimeType, and fileDataBase64 are required.' });
    }

    if (!folder || !['KYC', 'Compliance', 'Tax', 'Banking', 'Legal', 'Corporate', 'Incorporation'].includes(folder)) {
      return res.status(400).json({ message: 'Valid folder is required (KYC, Compliance, Tax, Banking, Legal, Corporate, Incorporation).' });
    }

    const targetUser = await User.findById(userId).select('_id');
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const buffer = parseBase64File(fileDataBase64);
    if (!buffer || buffer.length === 0) {
      return res.status(400).json({ message: 'Invalid file payload.' });
    }
    if (buffer.length > MAX_FILE_BYTES) {
      return res.status(413).json({ message: 'File exceeds 10 MB limit.' });
    }

    const doc = await storeDocument({
      userId,
      source: 'legal_docs',
      status: 'verified',
      fileName,
      mimeType,
      buffer,
      uploadedBy: req.user._id,
      folder: folder || 'Compliance',
      subfolder,
      documentType: normalizeDocumentType(documentType),
    });

    await notifyUser(userId, {
      title: 'New document available',
      message: `Yourlegal uploaded ${fileName} to your document center.`,
      metadata: {
        documentId: doc._id,
        folder: doc.folder,
        documentType: doc.documentType,
      },
      link: '/dashboard',
      type: 'success',
    });

    res.status(201).json({
      success: true,
      document: toDocumentResponse(doc, req),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDocumentStatusAsAdmin = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { status } = req.body;

    if (!validateObjectId(documentId)) {
      return res.status(400).json({ message: 'Invalid document ID.' });
    }
    if (!['pending', 'verified', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    const doc = await Document.findById(documentId);
    if (!doc) {
      return res.status(404).json({ message: 'Document not found.' });
    }
    if (doc.source !== 'client_uploads') {
      return res.status(400).json({ message: 'Only client-uploaded documents can be reviewed.' });
    }

    doc.status = status;
    doc.reviewedAt = new Date();
    doc.reviewedBy = req.user._id;
    await doc.save();

    res.json({
      success: true,
      document: toDocumentResponse(doc, req),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.downloadDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    if (!validateObjectId(documentId)) {
      return res.status(400).json({ message: 'Invalid document ID.' });
    }

    const doc = await Document.findById(documentId);
    if (!doc) {
      return res.status(404).json({ message: 'Document not found.' });
    }

    const isOwner = doc.user.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to access this document.' });
    }

    const safeName = doc.originalName.replace(/"/g, '');
    const downloadFlag = String(req.query.download || '').toLowerCase();
    const dispositionType = downloadFlag === '1' || downloadFlag === 'true' ? 'attachment' : 'inline';

    if (doc.data && doc.data.length) {
      res.setHeader('Content-Type', doc.mimeType);
      res.setHeader('Content-Length', doc.size.toString());
      res.setHeader('Content-Disposition', `${dispositionType}; filename="${safeName}"`);
      return res.send(doc.data);
    }

    if (!doc.s3Bucket || !doc.s3Key) {
      return res.status(404).json({ message: 'Document payload not found.' });
    }

    const s3Object = await getS3Object({ bucket: doc.s3Bucket, key: doc.s3Key });
    if (!s3Object || !s3Object.Body) {
      return res.status(404).json({ message: 'Document payload not found.' });
    }

    res.setHeader('Content-Type', s3Object.ContentType || doc.mimeType);
    if (s3Object.ContentLength) {
      res.setHeader('Content-Length', String(s3Object.ContentLength));
    }
    res.setHeader('Content-Disposition', `${dispositionType}; filename="${safeName}"`);
    return s3Object.Body.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    if (!validateObjectId(documentId)) {
      return res.status(400).json({ message: 'Invalid document ID.' });
    }

    const doc = await Document.findById(documentId);
    if (!doc) {
      return res.status(404).json({ message: 'Document not found.' });
    }

    const isAdmin = req.user?.role === 'admin';
    if (!isAdmin && String(doc.user) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to delete this document.' });
    }

    if (!isAdmin && doc.source !== 'client_uploads') {
      return res.status(403).json({ message: 'Only your uploaded documents can be deleted.' });
    }

    if (doc.taxFiling) {
      await TaxFiling.updateOne({ _id: doc.taxFiling }, { $pull: { documents: doc._id } });
    }

    if (doc.storageProvider === 's3' && doc.s3Bucket && doc.s3Key) {
      try {
        await deleteS3Object({ bucket: doc.s3Bucket, key: doc.s3Key });
      } catch (error) {
        console.error('Failed to delete S3 object:', error?.message || error);
      }
    }

    await Document.deleteOne({ _id: doc._id });

    res.json({ success: true, message: 'Document deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
