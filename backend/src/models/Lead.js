const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  zohoId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  fullName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: String,
  company: String,
  leadSource: String,
  zohoCreatedTime: Date,
  lastSyncedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'converted', 'lost'],
    default: 'new'
  },
  notes: String,
  convertedToUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

leadSchema.index({ email: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ zohoCreatedTime: -1 });

module.exports = mongoose.model('Lead', leadSchema);
