const OnboardingSubmission = require('../models/OnboardingSubmission');
const Formation = require('../models/Formation');
const User = require('../models/User');
const { generateComplianceEventsForFormation } = require('../utils/complianceService');

const normalizeRegion = (value) => {
  if (!value) return null;
  const normalized = String(value).trim();
  if (!normalized) return null;
  if (normalized === 'ExistingCompliance') return null;
  const map = {
    US: 'USA',
    USA: 'USA',
    'United States': 'USA',
    UK: 'UK',
    'U.K.': 'UK',
    'United Kingdom': 'UK',
    UAE: 'UAE',
    Dubai: 'UAE',
    'United Arab Emirates': 'UAE',
    India: 'India',
    Singapore: 'Singapore',
    Australia: 'Australia',
    Netherlands: 'Netherlands',
    SaudiArabia: 'SaudiArabia',
    'Saudi Arabia': 'SaudiArabia',
  };
  return map[normalized] || normalized;
};

const resolveSubmissionRegion = ({ planCountry, destination, formData }) => {
  const form = formData || {};
  return normalizeRegion(
    planCountry ||
      destination ||
      form.existingCompany?.country ||
      form.state ||
      form.freeZone
  );
};

exports.createOnboardingSubmission = async (req, res) => {
  try {
    const { plan, planState, planEntityType, planCountry, destination, entityType, formData } = req.body;

    const submission = await OnboardingSubmission.create({
      user: req.user._id,
      plan,
      planState,
      planEntityType,
      planCountry,
      destination,
      entityType,
      formData,
    });

    const resolvedRegion = resolveSubmissionRegion({ planCountry, destination, formData });
    if (resolvedRegion) {
      await User.findByIdAndUpdate(req.user._id, { region: resolvedRegion });
    }

    res.status(201).json({ success: true, submissionId: submission._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOnboardingSubmissions = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) query.status = status;

    const submissions = await OnboardingSubmission.find(query)
      .populate('user', 'name email companyName')
      .populate('formation', 'companyName status')
      .sort('-createdAt');

    res.json({ success: true, submissions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resolveCompanyName = (submission) => {
  const form = submission.formData || {};
  return (
    form.existingCompany?.name ||
    form.nameChoice1 ||
    form.nameChoice2 ||
    form.nameChoice3 ||
    submission.planState ||
    'New Company'
  );
};

const resolveEntityType = (submission) => {
  const form = submission.formData || {};
  return (
    submission.entityType ||
    submission.planEntityType ||
    form.existingCompany?.entityType ||
    'LLC'
  );
};

const resolveCountry = (submission) => {
  const form = submission.formData || {};
  return (
    submission.planCountry ||
    submission.destination ||
    form.existingCompany?.country ||
    'USA'
  );
};

const resolveState = (submission) => {
  const form = submission.formData || {};
  return (
    submission.planState ||
    form.state ||
    form.freeZone ||
    form.existingCompany?.country ||
    'Unknown'
  );
};

exports.createFormationFromOnboarding = async (req, res) => {
  try {
    const submission = await OnboardingSubmission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Onboarding submission not found' });
    }

    if (submission.formation) {
      return res.status(400).json({ message: 'Formation already created for this submission.' });
    }

    const formation = await Formation.create({
      user: submission.user,
      companyName: resolveCompanyName(submission),
      entityType: resolveEntityType(submission),
      country: resolveCountry(submission),
      state: resolveState(submission),
      plan: submission.plan,
      status: 'pending',
      notes: submission.destination === 'ExistingCompliance' ? 'Created from onboarding (existing company).' : 'Created from onboarding.',
    });

    const resolvedRegion = resolveSubmissionRegion({
      planCountry: submission.planCountry,
      destination: submission.destination,
      formData: submission.formData,
    });
    if (resolvedRegion) {
      await User.findByIdAndUpdate(submission.user, { region: resolvedRegion });
    }

    await generateComplianceEventsForFormation(formation);

    submission.status = 'completed';
    submission.formation = formation._id;
    submission.reviewedBy = req.user._id;
    submission.reviewedAt = new Date();
    await submission.save();

    res.status(201).json({ success: true, formationId: formation._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
