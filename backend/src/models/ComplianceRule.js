const mongoose = require('mongoose');

const complianceRuleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    jurisdiction: {
      type: String,
      enum: ['federal', 'state'],
      required: true,
    },
    state: {
      type: String,
      trim: true,
    },
    frequency: {
      type: String,
      enum: ['annual', 'quarterly', 'monthly'],
      required: true,
    },
    dueRule: {
      type: {
        type: String,
        enum: ['fixed_date', 'anniversary', 'quarterly_fixed', 'monthly_fixed'],
        default: 'fixed_date',
      },
      month: Number,
      day: Number,
      months: [Number],
    },
    entityTypes: {
      type: [String],
      default: [],
    },
    createTaxFiling: {
      type: Boolean,
      default: false,
    },
    filingName: {
      type: String,
      trim: true,
    },
    filingType: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

complianceRuleSchema.index({ jurisdiction: 1, state: 1, frequency: 1 });

module.exports = mongoose.model('ComplianceRule', complianceRuleSchema);
