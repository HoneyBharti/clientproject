const mongoose = require('mongoose');

const complianceEventSchema = new mongoose.Schema(
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
    rule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ComplianceRule',
      required: true,
      index: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['upcoming', 'in_progress', 'documents_requested', 'filed', 'completed', 'overdue'],
      default: 'upcoming',
    },
    assignedAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    notes: {
      type: String,
    },
    documentRequests: [
      {
        message: String,
        requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        requestedAt: Date,
        status: {
          type: String,
          enum: ['requested', 'received'],
          default: 'requested',
        },
      },
    ],
    lastReminderAt: Date,
  },
  { timestamps: true }
);

complianceEventSchema.index({ company: 1, rule: 1, dueDate: 1 }, { unique: true });
complianceEventSchema.index({ status: 1, dueDate: 1 });

module.exports = mongoose.model('ComplianceEvent', complianceEventSchema);
