const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  entityType: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    default: 'USA'
  },
  state: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'documents_required', 'filed', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  plan: {
    type: String,
    enum: ['Starter', 'Growth', 'Scale', 'Micro', 'Vitals', 'Elite', 'Formation', 'Compliance', 'AllInOne', 'Startup']
  },
  incorporationDate: Date,
  ein: String,
  filingNumber: String,
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }],
  notes: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

formationSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Formation', formationSchema);
