const mongoose = require('mongoose');

const complianceTaskSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ComplianceEvent',
      required: true,
      index: true,
    },
    taskName: {
      type: String,
      required: true,
      trim: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
    },
    dueDate: Date,
    notes: String,
  },
  { timestamps: true }
);

complianceTaskSchema.index({ event: 1, status: 1 });

module.exports = mongoose.model('ComplianceTask', complianceTaskSchema);
