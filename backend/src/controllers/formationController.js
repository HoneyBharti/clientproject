const Formation = require('../models/Formation');
const Order = require('../models/Order');
const { generateComplianceEventsForFormation } = require('../utils/complianceService');

exports.getAllFormations = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    
    if (status) query.status = status;

    const formations = await Formation.find(query)
      .populate('user', 'name email companyName')
      .populate('assignedTo', 'name email')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Formation.countDocuments(query);

    res.json({
      success: true,
      formations,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyFormations = async (req, res) => {
  try {
    const formations = await Formation.find({ user: req.user._id })
      .populate('documents')
      .sort('-createdAt');

    res.json({ success: true, formations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFormation = async (req, res) => {
  try {
    const formation = await Formation.create({
      ...req.body,
      user: req.user._id
    });

    await generateComplianceEventsForFormation(formation);

    res.status(201).json({ success: true, formation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFormation = async (req, res) => {
  try {
    const formation = await Formation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!formation) {
      return res.status(404).json({ message: 'Formation not found' });
    }

    res.json({ success: true, formation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFormation = async (req, res) => {
  try {
    const formation = await Formation.findByIdAndDelete(req.params.id);

    if (!formation) {
      return res.status(404).json({ message: 'Formation not found' });
    }

    res.json({ success: true, message: 'Formation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
