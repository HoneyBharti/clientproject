const mongoose = require('mongoose');
const Document = require('../models/Document');
const User = require('../models/User');

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

const parseFileBuffer = (rawValue) => {
  if (!rawValue || typeof rawValue !== 'string') {
    return null;
  }

  const dataUrlMatch = rawValue.match(/^data:.*;base64,(.*)$/);
  const base64 = dataUrlMatch ? dataUrlMatch[1] : rawValue;
  try {
    return Buffer.from(base64, 'base64');
  } catch (error) {
    return null;
  }
};

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
    uploadedAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    reviewedAt: doc.reviewedAt,
    taxFilingId: doc.taxFiling || null,
    downloadUrl: `${baseUrl}/api/documents/${doc._id}/download`,
  };
};

const validateObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const createDocument = async ({ userId, source, status, fileName, mimeType, buffer, uploadedBy, taxFilingId }) =>
  Document.create({
    user: userId,
    originalName: fileName,
    mimeType,
    size: buffer.length,
    source,
    status,
    data: buffer,
    uploadedBy,
    taxFiling: taxFilingId || null,
  });

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
    const { fileName, mimeType, fileDataBase64 } = req.body;

    if (!fileName || !mimeType || !fileDataBase64) {
      return res.status(400).json({ message: 'fileName, mimeType, and fileDataBase64 are required.' });
    }

    const buffer = parseFileBuffer(fileDataBase64);
    if (!buffer || buffer.length === 0) {
      return res.status(400).json({ message: 'Invalid file payload.' });
    }
    if (buffer.length > MAX_FILE_BYTES) {
      return res.status(413).json({ message: 'File exceeds 10 MB limit.' });
    }

    const doc = await createDocument({
      userId: req.user._id,
      source: 'client_uploads',
      status: 'pending',
      fileName,
      mimeType,
      buffer,
      uploadedBy: req.user._id,
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
    const { fileName, mimeType, fileDataBase64 } = req.body;

    if (!validateObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }
    if (!fileName || !mimeType || !fileDataBase64) {
      return res.status(400).json({ message: 'fileName, mimeType, and fileDataBase64 are required.' });
    }

    const targetUser = await User.findById(userId).select('_id');
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const buffer = parseFileBuffer(fileDataBase64);
    if (!buffer || buffer.length === 0) {
      return res.status(400).json({ message: 'Invalid file payload.' });
    }
    if (buffer.length > MAX_FILE_BYTES) {
      return res.status(413).json({ message: 'File exceeds 10 MB limit.' });
    }

    const doc = await createDocument({
      userId,
      source: 'legal_docs',
      status: 'verified',
      fileName,
      mimeType,
      buffer,
      uploadedBy: req.user._id,
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
    res.setHeader('Content-Type', doc.mimeType);
    res.setHeader('Content-Length', doc.size.toString());
    res.setHeader('Content-Disposition', `inline; filename="${safeName}"`);
    return res.send(doc.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
