const mongoose = require('mongoose');

const progressStepSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
    },
    completedAt: Date
  },
  { _id: false }
);

const formationProgressSchema = new mongoose.Schema(
  {
    nameCheck: { type: progressStepSchema, default: () => ({}) },
    filingPrep: { type: progressStepSchema, default: () => ({}) },
    stateFiling: { type: progressStepSchema, default: () => ({}) },
    approved: { type: progressStepSchema, default: () => ({}) }
  },
  { _id: false }
);

const einProgressSchema = new mongoose.Schema(
  {
    ss4Application: { type: progressStepSchema, default: () => ({}) },
    irsSubmission: { type: progressStepSchema, default: () => ({}) },
    processing: { type: progressStepSchema, default: () => ({}) },
    allotment: { type: progressStepSchema, default: () => ({}) },
    einNumber: String
  },
  { _id: false }
);

const initialComplianceSchema = new mongoose.Schema(
  {
    operatingAgreement: { type: progressStepSchema, default: () => ({}) },
    initialResolutions: { type: progressStepSchema, default: () => ({}) },
    boiReport: { type: progressStepSchema, default: () => ({}) },
    goodStanding: { type: progressStepSchema, default: () => ({}) }
  },
  { _id: false }
);

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
  formationProgress: {
    type: formationProgressSchema,
    default: () => ({})
  },
  einProgress: {
    type: einProgressSchema,
    default: () => ({})
  },
  initialCompliance: {
    type: initialComplianceSchema,
    default: () => ({})
  },
  plan: {
    type: String,
    enum: ['Starter', 'Growth', 'Scale', 'Micro', 'Vitals', 'Elite', 'Formation', 'Compliance', 'AllInOne', 'Startup']
  },
  incorporationDate: Date,
  ein: String,
  filingNumber: String,
  goodStandingStatus: {
    type: String,
    default: ''
  },
  registeredAgent: {
    type: String,
    default: ''
  },
  mailingAddress: {
    type: String,
    default: ''
  },
  authorizedMembers: {
    type: [String],
    default: []
  },
  internalId: {
    type: String,
    default: ''
  },
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
