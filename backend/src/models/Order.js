const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['formation', 'accounting', 'bookkeeping', 'tax-compliance', 'payroll', 'virtual-cfo', 'annual-compliance', 'audit-support']
  },
  plan: {
    type: String,
    enum: ['Starter', 'Growth', 'Scale', 'Micro', 'Vitals', 'Elite', 'Formation', 'Compliance', 'AllInOne', 'Startup']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  amount: {
    type: Number,
    required: true
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  formation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Formation'
  },
  deliverables: [{
    name: String,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending'
    },
    completedAt: Date
  }],
  metadata: mongoose.Schema.Types.Mixed,
  notes: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
