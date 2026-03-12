const mongoose = require('mongoose');

const taxFilingSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Formation',
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    filingName: {
      type: String,
      required: true,
      trim: true,
    },
    filingType: {
      type: String,
      required: true,
      trim: true,
    },
    taxYear: {
      type: String,
      required: true,
      trim: true,
    },
    jurisdiction: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'waiting_for_documents', 'ready_to_file', 'filed', 'rejected'],
      default: 'pending',
    },
    assignedAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    notes: String,
    complianceEvent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ComplianceEvent',
    },
    documents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
      },
    ],
    timeline: [
      {
        label: String,
        message: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    requestedDocuments: [
      {
        message: String,
        requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        requestedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

taxFilingSchema.index({ status: 1, dueDate: 1 });

module.exports = mongoose.model('TaxFiling', taxFilingSchema);
