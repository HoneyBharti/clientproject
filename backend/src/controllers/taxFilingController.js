const Formation = require('../models/Formation');
const TaxFiling = require('../models/TaxFiling');
const Document = require('../models/Document');
const Notification = require('../models/Notification');
const mongoose = require('mongoose');

const MAX_FILE_BYTES = 10 * 1024 * 1024;

const createNotification = async (userId, title, message, metadata = {}) => {
  if (!userId) return;
  await Notification.create({
    user: userId,
    title,
    message,
    type: 'info',
    category: 'compliance',
    metadata,
  });
};

const addTimelineEntry = (filing, label, message, userId) => {
  filing.timeline = filing.timeline || [];
  filing.timeline.push({
    label,
    message,
    createdBy: userId,
    createdAt: new Date(),
  });
};

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

exports.getAllTaxFilings = async (req, res) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.companyId && mongoose.Types.ObjectId.isValid(req.query.companyId)) {
      query.company = req.query.companyId;
    }
    if (req.query.taxYear) query.taxYear = req.query.taxYear;

    const filings = await TaxFiling.find(query)
      .populate('company', 'companyName state entityType')
      .populate('user', 'name email companyName')
      .populate('assignedAdmin', 'name email')
      .sort('dueDate');

    res.json({ success: true, filings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTaxFilingById = async (req, res) => {
  try {
    const filing = await TaxFiling.findById(req.params.id)
      .populate('company', 'companyName state entityType')
      .populate('user', 'name email companyName')
      .populate('assignedAdmin', 'name email')
      .populate('documents');

    if (!filing) {
      return res.status(404).json({ message: 'Tax filing not found.' });
    }

    res.json({ success: true, filing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTaxFiling = async (req, res) => {
  try {
    const { companyId, filingName, filingType, taxYear, jurisdiction, dueDate, assignedAdmin, notes } = req.body;

    if (!companyId || !mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: 'Valid companyId is required.' });
    }

    const company = await Formation.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    const filing = await TaxFiling.create({
      company: company._id,
      user: company.user,
      filingName,
      filingType,
      taxYear,
      jurisdiction,
      dueDate,
      assignedAdmin: assignedAdmin || null,
      notes,
      timeline: [{ label: 'Filing Created', message: 'Tax filing created.', createdBy: req.user._id }],
    });

    await createNotification(
      company.user,
      'New tax filing created',
      `${filingName} has been created and assigned for your company.`,
      { taxFilingId: filing._id }
    );

    res.status(201).json({ success: true, filing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTaxFiling = async (req, res) => {
  try {
    const filing = await TaxFiling.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!filing) {
      return res.status(404).json({ message: 'Tax filing not found.' });
    }
    res.json({ success: true, filing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTaxFilingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const filing = await TaxFiling.findById(req.params.id);
    if (!filing) {
      return res.status(404).json({ message: 'Tax filing not found.' });
    }
    filing.status = status;
    addTimelineEntry(filing, 'Status Updated', `Status changed to ${status}.`, req.user._id);
    await filing.save();

    if (status === 'filed') {
      await createNotification(
        filing.user,
        'Tax filing completed',
        `${filing.filingName} has been filed.`,
        { taxFilingId: filing._id }
      );
    }

    res.json({ success: true, filing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.assignTaxFiling = async (req, res) => {
  try {
    const { adminId } = req.body;
    const filing = await TaxFiling.findByIdAndUpdate(
      req.params.id,
      { assignedAdmin: adminId || null },
      { new: true }
    ).populate('assignedAdmin', 'name email');

    if (!filing) {
      return res.status(404).json({ message: 'Tax filing not found.' });
    }

    res.json({ success: true, filing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.requestTaxFilingDocuments = async (req, res) => {
  try {
    const { message } = req.body;
    const filing = await TaxFiling.findById(req.params.id);
    if (!filing) {
      return res.status(404).json({ message: 'Tax filing not found.' });
    }

    filing.status = 'waiting_for_documents';
    filing.requestedDocuments = filing.requestedDocuments || [];
    filing.requestedDocuments.push({
      message,
      requestedBy: req.user._id,
      requestedAt: new Date(),
    });
    addTimelineEntry(filing, 'Documents Requested', message || 'Documents requested from client.', req.user._id);
    await filing.save();

    await createNotification(
      filing.user,
      'Documents requested',
      message || `Documents requested for ${filing.filingName}.`,
      { taxFilingId: filing._id }
    );

    res.json({ success: true, filing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyTaxFilings = async (req, res) => {
  try {
    const filings = await TaxFiling.find({ user: req.user._id })
      .populate('company', 'companyName state entityType')
      .populate('documents')
      .sort('dueDate');

    res.json({ success: true, filings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyTaxFilingById = async (req, res) => {
  try {
    const filing = await TaxFiling.findById(req.params.id)
      .populate('company', 'companyName state entityType')
      .populate('documents');
    if (!filing) {
      return res.status(404).json({ message: 'Tax filing not found.' });
    }
    if (filing.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this filing.' });
    }
    res.json({ success: true, filing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadTaxFilingDocument = async (req, res) => {
  try {
    const { fileName, mimeType, fileDataBase64 } = req.body;
    if (!fileName || !mimeType || !fileDataBase64) {
      return res.status(400).json({ message: 'fileName, mimeType, and fileDataBase64 are required.' });
    }

    const filing = await TaxFiling.findById(req.params.id);
    if (!filing) {
      return res.status(404).json({ message: 'Tax filing not found.' });
    }
    if (filing.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to upload documents for this filing.' });
    }

    const buffer = parseFileBuffer(fileDataBase64);
    if (!buffer || buffer.length === 0) {
      return res.status(400).json({ message: 'Invalid file payload.' });
    }
    if (buffer.length > MAX_FILE_BYTES) {
      return res.status(413).json({ message: 'File exceeds 10 MB limit.' });
    }

    const doc = await Document.create({
      user: req.user._id,
      originalName: fileName,
      mimeType,
      size: buffer.length,
      source: 'client_uploads',
      status: 'pending',
      data: buffer,
      uploadedBy: req.user._id,
      taxFiling: filing._id,
    });

    filing.documents = filing.documents || [];
    filing.documents.push(doc._id);
    if (filing.status === 'waiting_for_documents') {
      filing.status = 'ready_to_file';
      addTimelineEntry(filing, 'Documents Uploaded', 'Client uploaded documents.', req.user._id);
    } else {
      addTimelineEntry(filing, 'Documents Uploaded', 'Client uploaded documents.', req.user._id);
    }
    await filing.save();

    if (filing.assignedAdmin) {
      await createNotification(
        filing.assignedAdmin,
        'Documents uploaded',
        `${filing.filingName} has new uploaded documents.`,
        { taxFilingId: filing._id }
      );
    }

    res.status(201).json({ success: true, documentId: doc._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
