const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['formation', 'accounting', 'bookkeeping', 'tax-compliance', 'payroll', 'virtual-cfo', 'annual-compliance', 'audit-support']
  },
  countries: [{
    type: String,
    enum: ['USA', 'UK', 'UAE', 'Singapore', 'India', 'Australia', 'Netherlands', 'Saudi Arabia']
  }],
  pricing: {
    starter: Number,
    growth: Number,
    scale: Number
  },
  uiType: {
    type: String,
    enum: ['core', 'addon'],
    default: 'core'
  },
  uiCategory: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    trim: true
  },
  features: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  deliveryTime: String,
  requirements: [String]
}, {
  timestamps: true
});

serviceSchema.index({ slug: 1 });
serviceSchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model('Service', serviceSchema);
