const Formation = require('../models/Formation');

const resolveSection = (formation, section) => {
  if (section === 'formationProgress') {
    if (!formation.formationProgress) formation.formationProgress = {};
    return formation.formationProgress;
  }
  if (section === 'einProgress') {
    if (!formation.einProgress) formation.einProgress = {};
    return formation.einProgress;
  }
  if (section === 'initialCompliance') {
    if (!formation.initialCompliance) formation.initialCompliance = {};
    return formation.initialCompliance;
  }
  return null;
};

const isAdmin = (req) => req.user && req.user.role === 'admin';

exports.getCompanyProgress = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    if (!isAdmin(req) && String(formation.user) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to view this company.' });
    }

    res.json({
      success: true,
      formationProgress: formation.formationProgress,
      einProgress: formation.einProgress,
      initialCompliance: formation.initialCompliance,
      einNumber: formation.einProgress?.einNumber || formation.ein || ''
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCompanyProgress = async (req, res) => {
  try {
    if (!isAdmin(req)) {
      return res.status(403).json({ message: 'Admin access required.' });
    }

    const { section, step, status } = req.body || {};
    if (!section || !step || !status) {
      return res.status(400).json({ message: 'section, step, and status are required.' });
    }

    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    const progressSection = resolveSection(formation, section);
    if (!progressSection || typeof progressSection !== 'object') {
      return res.status(400).json({ message: 'Invalid section.' });
    }

    if (!progressSection[step]) {
      return res.status(400).json({ message: 'Invalid step.' });
    }

    if (status === 'completed') {
      progressSection[step].status = 'completed';
      progressSection[step].completedAt = new Date();
    } else if (status === 'pending') {
      progressSection[step].status = 'pending';
      progressSection[step].completedAt = null;
    } else {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    formation.markModified(section);
    await formation.save();

    res.json({
      success: true,
      formationProgress: formation.formationProgress,
      einProgress: formation.einProgress,
      initialCompliance: formation.initialCompliance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCompanyEin = async (req, res) => {
  try {
    if (!isAdmin(req)) {
      return res.status(403).json({ message: 'Admin access required.' });
    }

    const { einNumber } = req.body || {};
    if (!einNumber) {
      return res.status(400).json({ message: 'einNumber is required.' });
    }

    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    formation.ein = einNumber;
    if (!formation.einProgress) {
      formation.einProgress = {};
    }
    formation.einProgress.einNumber = einNumber;
    formation.einProgress.allotment = formation.einProgress.allotment || {};
    formation.einProgress.allotment.status = 'completed';
    formation.einProgress.allotment.completedAt = new Date();

    formation.markModified('einProgress');
    await formation.save();

    res.json({
      success: true,
      einNumber: formation.ein,
      einProgress: formation.einProgress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
