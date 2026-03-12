const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  value: mongoose.Schema.Types.Mixed,
  category: {
    type: String,
    enum: ['general', 'payment', 'email', 'notification', 'integration', 'security'],
    default: 'general'
  },
  description: String,
  isPublic: {
    type: Boolean,
    default: false
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

settingsSchema.index({ key: 1 });
settingsSchema.index({ category: 1 });

module.exports = mongoose.model('Settings', settingsSchema);
