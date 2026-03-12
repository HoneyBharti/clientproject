const Settings = require('../models/Settings');

exports.getAllSettings = async (req, res) => {
  try {
    const { category } = req.query;
    const query = {};
    
    if (category) query.category = category;

    const settings = await Settings.find(query).sort('key');

    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPublicSettings = async (req, res) => {
  try {
    const settings = await Settings.find({ isPublic: true }).select('key value category');

    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSettingByKey = async (req, res) => {
  try {
    const setting = await Settings.findOne({ key: req.params.key });

    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }

    res.json({ success: true, setting });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrUpdateSetting = async (req, res) => {
  try {
    const setting = await Settings.findOneAndUpdate(
      { key: req.body.key },
      { ...req.body, updatedBy: req.user._id },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, setting });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSetting = async (req, res) => {
  try {
    const setting = await Settings.findOneAndDelete({ key: req.params.key });

    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }

    res.json({ success: true, message: 'Setting deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
