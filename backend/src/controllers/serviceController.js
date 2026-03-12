const Service = require('../models/Service');

exports.getAllServices = async (req, res) => {
  try {
    const { category, country, isActive } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (country) query.countries = country;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const services = await Service.find(query).sort('name');

    res.json({ success: true, services });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
