const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
    trim: true
  },
  from: {
    type: String,
    default: 'noreply@yourlegal.com'
  },
  subject: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  template: String,
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed', 'bounced'],
    default: 'pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  metadata: mongoose.Schema.Types.Mixed,
  sentAt: Date,
  error: String
}, {
  timestamps: true
});

emailSchema.index({ status: 1, createdAt: -1 });
emailSchema.index({ user: 1 });

module.exports = mongoose.model('Email', emailSchema);
