const User = require('../models/User');
const Payment = require('../models/Payment');
const OnboardingSubmission = require('../models/OnboardingSubmission');

const MONTH_LABEL = new Intl.DateTimeFormat('en-US', { month: 'short' });

const buildMonthBuckets = () => {
  const now = new Date();
  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    return {
      key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
      label: MONTH_LABEL.format(date),
      date,
    };
  });
};

const toMonthKey = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

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

const resolveSubmissionRegion = (submission) => {
  const form = submission?.formData || {};
  return normalizeRegion(
    submission?.planCountry ||
      submission?.destination ||
      form.existingCompany?.country ||
      form.state ||
      form.freeZone
  );
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt');
    const missingRegionUsers = users.filter((user) => !user.region);

    if (missingRegionUsers.length) {
      const userIds = missingRegionUsers.map((user) => user._id);
      const submissions = await OnboardingSubmission.find({ user: { $in: userIds } })
        .select('user planCountry destination formData createdAt')
        .sort('-createdAt')
        .lean();

      const latestByUser = new Map();
      submissions.forEach((submission) => {
        const userId = String(submission.user);
        if (!latestByUser.has(userId)) {
          latestByUser.set(userId, submission);
        }
      });

      const updates = [];
      missingRegionUsers.forEach((user) => {
        const submission = latestByUser.get(String(user._id));
        const resolvedRegion = resolveSubmissionRegion(submission);
        if (resolvedRegion) {
          user.region = resolvedRegion;
          updates.push({
            updateOne: {
              filter: { _id: user._id },
              update: { region: resolvedRegion },
            },
          });
        }
      });

      if (updates.length) {
        await User.bulkWrite(updates);
      }
    }

    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdminStats = async (req, res) => {
  try {
    const [users, payments] = await Promise.all([
      User.find()
        .select('name email status region quickBooksConnected subscriptionStatus createdAt')
        .sort('-createdAt')
        .lean(),
      Payment.find()
        .populate('user', 'name email region')
        .sort('-createdAt')
        .lean(),
    ]);

    const now = new Date();
    const recentSignupCutoff = new Date(now);
    recentSignupCutoff.setDate(recentSignupCutoff.getDate() - 30);

    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === 'active').length;
    const qbConnected = users.filter((user) => user.quickBooksConnected).length;
    const qbPercentage = totalUsers > 0 ? Math.round((qbConnected / totalUsers) * 100) : 0;

    const totalRevenue = payments
      .filter((payment) => payment.status === 'succeeded')
      .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

    const totalOrders = payments.length;
    const activeSubscriptions = users.filter((user) => ['active', 'trialing'].includes(user.subscriptionStatus)).length;
    const pendingRequests = payments.filter((payment) => payment.status === 'pending').length;
    const recentSignups = users.filter((user) => new Date(user.createdAt) >= recentSignupCutoff).length;
    const complianceRisk = users.filter((user) => user.status === 'compliance_risk').length;
    const awaitingDocs = users.filter((user) => user.status === 'awaiting_docs').length;

    const recentSignupUsers = users.slice(0, 6).map((user) => ({
      id: String(user._id),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }));

    const pendingRequestItems = payments
      .filter((payment) => payment.status === 'pending')
      .slice(0, 5)
      .map((payment) => ({
        id: String(payment._id),
        customerName: payment.user?.name || 'Unknown user',
        serviceType: payment.plan || payment.metadata?.serviceId || payment.metadata?.entityType || 'Service request',
        status: 'pending',
        createdAt: payment.createdAt,
      }));

    const monthBuckets = buildMonthBuckets();
    const revenueByMonth = new Map(monthBuckets.map((bucket) => [bucket.key, 0]));
    const ordersByCountry = new Map();

    payments.forEach((payment) => {
      const monthKey = toMonthKey(payment.createdAt);
      if (revenueByMonth.has(monthKey) && payment.status === 'succeeded') {
        revenueByMonth.set(monthKey, revenueByMonth.get(monthKey) + Number(payment.amount || 0));
      }

      const country = payment.metadata?.country || payment.user?.region || 'Unknown';
      ordersByCountry.set(country, (ordersByCountry.get(country) || 0) + 1);
    });

    const monthlyRevenueData = monthBuckets.map((bucket) => ({
      month: bucket.label,
      revenue: revenueByMonth.get(bucket.key) || 0,
    }));

    const userGrowthData = monthBuckets.map((bucket) => {
      const bucketEnd = new Date(bucket.date.getFullYear(), bucket.date.getMonth() + 1, 0, 23, 59, 59, 999);
      return {
        month: bucket.label,
        users: users.filter((user) => new Date(user.createdAt) <= bucketEnd).length,
      };
    });

    const ordersByCountryData = Array.from(ordersByCountry.entries()).map(([country, count]) => ({
      country,
      count,
    }));

    res.json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        totalOrders,
        activeSubscriptions,
        pendingRequests,
        recentSignups,
        qbConnected,
        qbPercentage,
        totalRevenue,
        complianceRisk,
        awaitingDocs,
        activeIssues: complianceRisk + awaitingDocs
      },
      recentSignupUsers,
      pendingRequestItems,
      monthlyRevenueData,
      ordersByCountryData,
      userGrowthData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
