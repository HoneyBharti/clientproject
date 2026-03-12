const mongoose = require('mongoose');

const onboardingSubmissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    plan: String,
    planState: String,
    planEntityType: String,
    planCountry: String,
    destination: String,
    entityType: String,
    formData: mongoose.Schema.Types.Mixed,
    formation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Formation'
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: Date,
    status: {
      type: String,
      enum: ['submitted', 'processing', 'completed'],
      default: 'submitted',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('OnboardingSubmission', onboardingSubmissionSchema);
