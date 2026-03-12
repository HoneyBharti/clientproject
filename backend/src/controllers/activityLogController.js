const ActivityLog = require('../models/ActivityLog');

exports.createLog = async (userId, action, entity, entityId, details, req) => {
  try {
    await ActivityLog.create({
      user: userId,
      action,
      entity,
      entityId,
      details,
      ipAddress: req?.ip || req?.connection?.remoteAddress,
      userAgent: req?.headers?.['user-agent']
    });
  } catch (error) {
    console.error('Activity log error:', error);
  }
};

exports.getLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50, entity, userId } = req.query;
    const query = {};
    
    if (entity) query.entity = entity;
    if (userId) query.user = userId;

    const logs = await ActivityLog.find(query)
      .populate('user', 'name email')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await ActivityLog.countDocuments(query);

    res.json({
      success: true,
      logs,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ user: req.user._id })
      .sort('-createdAt')
      .limit(100);

    res.json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAdminLog = async (req, res) => {
  try {
    const { action, entity, entityId, details } = req.body || {};
    if (!action || !String(action).trim()) {
      return res.status(400).json({ message: 'Action is required' });
    }

    const allowedEntities = ['user', 'payment', 'document', 'order', 'ticket', 'formation', 'service', 'blog', 'settings'];
    const safeEntity = allowedEntities.includes(entity) ? entity : 'settings';

    const log = await ActivityLog.create({
      user: req.user._id,
      action: String(action).trim(),
      entity: safeEntity,
      entityId: entityId || undefined,
      details,
      ipAddress: req?.ip || req?.connection?.remoteAddress,
      userAgent: req?.headers?.['user-agent'],
    });

    res.status(201).json({ success: true, log });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
