const User = require('../models/User');
const Formation = require('../models/Formation');
const Document = require('../models/Document');
const ComplianceEvent = require('../models/ComplianceEvent');

exports.getComplianceOverview = async (req, res) => {
  try {
    const complianceRiskUsers = await User.find({ status: 'compliance_risk' })
      .select('name email companyName region status')
      .sort('-updatedAt');

    const awaitingDocsUsers = await User.find({ status: 'awaiting_docs' })
      .select('name email companyName region status')
      .sort('-updatedAt');

    const pendingDocuments = await Document.find({ status: 'pending' })
      .populate('user', 'name email companyName')
      .sort('-createdAt')
      .limit(50);

    const pendingFormations = await Formation.find({ 
      status: { $in: ['pending', 'documents_required'] }
    })
      .populate('user', 'name email companyName')
      .sort('-createdAt');

    res.json({
      success: true,
      complianceRiskUsers,
      awaitingDocsUsers,
      pendingDocuments,
      pendingFormations,
      summary: {
        totalRisks: complianceRiskUsers.length,
        awaitingDocs: awaitingDocsUsers.length,
        pendingDocs: pendingDocuments.length,
        pendingFormations: pendingFormations.length
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserCompliance = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('name email companyName region status servicePlan');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const documents = await Document.find({ user: req.params.userId })
      .select('-data')
      .sort('-createdAt');

    const formations = await Formation.find({ user: req.params.userId })
      .sort('-createdAt');

    res.json({
      success: true,
      user,
      documents,
      formations,
      complianceStatus: {
        hasRisk: user.status === 'compliance_risk',
        awaitingDocs: user.status === 'awaiting_docs',
        documentsCount: documents.length,
        pendingDocuments: documents.filter(d => d.status === 'pending').length,
        formationsCount: formations.length
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyComplianceEvents = async (req, res) => {
  try {
    const events = await ComplianceEvent.find({ user: req.user._id })
      .populate('company', 'companyName state entityType')
      .populate('rule', 'name description jurisdiction state frequency')
      .sort('dueDate');

    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
