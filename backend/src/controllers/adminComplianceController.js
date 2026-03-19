const ComplianceRule = require('../models/ComplianceRule');
const ComplianceEvent = require('../models/ComplianceEvent');
const ComplianceTask = require('../models/ComplianceTask');
const { createComplianceNotification, generateComplianceEventsForAllFormations } = require('../utils/complianceService');

const parseDueDateFilter = (query) => {
  const filter = {};
  if (query.from) {
    filter.$gte = new Date(query.from);
  }
  if (query.to) {
    filter.$lte = new Date(query.to);
  }
  return Object.keys(filter).length ? filter : null;
};

exports.getRules = async (req, res) => {
  try {
    const rules = await ComplianceRule.find().sort('-createdAt');
    res.json({ success: true, rules });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.seedDefaultRules = async (req, res) => {
  try {
    const defaults = [
      {
        name: 'IRS Tax Filing',
        description: 'Annual federal tax return filing.',
        jurisdiction: 'federal',
        frequency: 'annual',
        dueRule: { type: 'fixed_date', month: 3, day: 15 },
        createTaxFiling: true,
        filingName: 'IRS Form 1120 / 1065',
        filingType: 'Tax Return',
      },
      {
        name: 'Estimated Quarterly Tax Payment',
        description: 'Quarterly estimated tax payments.',
        jurisdiction: 'federal',
        frequency: 'quarterly',
        dueRule: { type: 'quarterly_fixed', months: [1, 4, 6, 9], day: 15 },
      },
      {
        name: 'BOI Report (FinCEN)',
        description: 'Beneficial Ownership Information reporting.',
        jurisdiction: 'federal',
        frequency: 'annual',
        dueRule: { type: 'fixed_date', month: 1, day: 1 },
      },
      {
        name: 'Wyoming Annual Report',
        description: 'Annual report filing for Wyoming entities.',
        jurisdiction: 'state',
        state: 'Wyoming',
        frequency: 'annual',
        dueRule: { type: 'anniversary' },
      },
      {
        name: 'Delaware Annual Report',
        description: 'Annual report filing for Delaware entities.',
        jurisdiction: 'state',
        state: 'Delaware',
        frequency: 'annual',
        dueRule: { type: 'fixed_date', month: 3, day: 1 },
      },
    ];

    let createdCount = 0;
    for (const rule of defaults) {
      const existing = await ComplianceRule.findOne({
        name: rule.name,
        jurisdiction: rule.jurisdiction,
        state: rule.state || '',
        frequency: rule.frequency,
      });
      if (existing) continue;
      await ComplianceRule.create(rule);
      createdCount += 1;
    }

    if (req.body?.applyToExisting) {
      await generateComplianceEventsForAllFormations();
    }

    res.json({ success: true, created: createdCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRule = async (req, res) => {
  try {
    const rule = await ComplianceRule.create(req.body);
    if (req.body.applyToExisting) {
      await generateComplianceEventsForAllFormations();
    }
    res.status(201).json({ success: true, rule });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRule = async (req, res) => {
  try {
    const rule = await ComplianceRule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!rule) {
      return res.status(404).json({ message: 'Compliance rule not found' });
    }
    res.json({ success: true, rule });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRule = async (req, res) => {
  try {
    const rule = await ComplianceRule.findByIdAndDelete(req.params.id);
    if (!rule) {
      return res.status(404).json({ message: 'Compliance rule not found' });
    }
    res.json({ success: true, message: 'Compliance rule deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const query = {};
    if (req.query.companyId) query.company = req.query.companyId;
    if (req.query.userId) query.user = req.query.userId;
    if (req.query.ruleId) query.rule = req.query.ruleId;
    if (req.query.status) query.status = req.query.status;
    const dueDateFilter = parseDueDateFilter(req.query);
    if (dueDateFilter) query.dueDate = dueDateFilter;

    const events = await ComplianceEvent.find(query)
      .populate('company', 'companyName state entityType')
      .populate('user', 'name email companyName')
      .populate('rule', 'name jurisdiction state frequency')
      .populate('assignedAdmin', 'name email')
      .sort('dueDate');

    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const event = await ComplianceEvent.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('rule', 'name');

    if (!event) {
      return res.status(404).json({ message: 'Compliance event not found' });
    }

    if (['filed', 'completed'].includes(status)) {
      await createComplianceNotification(
        event.user,
        'Compliance filing updated',
        `${event.rule?.name || 'Compliance filing'} has been marked as ${status}.`,
        { eventId: event._id }
      );
    }

    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.assignEvent = async (req, res) => {
  try {
    const { adminId } = req.body;
    const event = await ComplianceEvent.findByIdAndUpdate(
      req.params.id,
      { assignedAdmin: adminId || null },
      { new: true }
    ).populate('assignedAdmin', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Compliance event not found' });
    }

    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await ComplianceEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Compliance event not found' });
    }

    await ComplianceTask.deleteMany({ event: event._id });
    await ComplianceEvent.deleteOne({ _id: event._id });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.requestDocuments = async (req, res) => {
  try {
    const { message } = req.body;
    const event = await ComplianceEvent.findById(req.params.id).populate('rule', 'name');
    if (!event) {
      return res.status(404).json({ message: 'Compliance event not found' });
    }

    event.status = 'documents_requested';
    event.documentRequests.push({
      message,
      requestedBy: req.user._id,
      requestedAt: new Date(),
    });
    await event.save();

    await createComplianceNotification(
      event.user,
      'Documents requested',
      message || `Documents requested for ${event.rule?.name || 'compliance filing'}.`,
      { eventId: event._id }
    );

    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const query = {};
    if (req.query.eventId) query.event = req.query.eventId;
    if (req.query.status) query.status = req.query.status;

    const tasks = await ComplianceTask.find(query)
      .populate('event', 'dueDate status')
      .populate('assignedTo', 'name email')
      .sort('-createdAt');

    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await ComplianceTask.create(req.body);
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await ComplianceTask.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    if (!task) {
      return res.status(404).json({ message: 'Compliance task not found' });
    }

    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
