const ComplianceRule = require('../models/ComplianceRule');
const ComplianceEvent = require('../models/ComplianceEvent');
const ComplianceTask = require('../models/ComplianceTask');
const Formation = require('../models/Formation');
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
    const rules = await ComplianceRule.find({ isManual: { $ne: true } }).sort('-createdAt');
    res.json({ success: true, rules });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const normalizeManualStatus = (status, dueDate) => {
  if (status) return status;
  if (!dueDate) return 'upcoming';
  return dueDate < new Date() ? 'overdue' : 'upcoming';
};

exports.createManualEvent = async (req, res) => {
  try {
    const {
      companyId,
      userId,
      name,
      description,
      jurisdiction = 'federal',
      state,
      dueDate,
      status,
      notes,
      assignedAdmin,
    } = req.body || {};

    if (!companyId || !name || !dueDate) {
      return res.status(400).json({ message: 'Company, name, and due date are required.' });
    }

    const formation = await Formation.findById(companyId).populate('user', 'name email');
    if (!formation) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    const resolvedUserId = userId || formation.user?._id || formation.user;
    if (!resolvedUserId) {
      return res.status(400).json({ message: 'User is required to create a compliance event.' });
    }

    const parsedDueDate = new Date(dueDate);
    if (Number.isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({ message: 'Invalid due date.' });
    }

    const normalizedJurisdiction = jurisdiction === 'state' ? 'state' : 'federal';
    const resolvedState =
      normalizedJurisdiction === 'state'
        ? (state || formation.state || '').trim()
        : '';

    const validStatuses = new Set([
      'upcoming',
      'in_progress',
      'documents_requested',
      'filed',
      'completed',
      'overdue',
    ]);
    const normalizedStatus = normalizeManualStatus(status, parsedDueDate);
    if (!validStatuses.has(normalizedStatus)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    const rule = await ComplianceRule.create({
      name: String(name).trim(),
      description: description ? String(description).trim() : '',
      jurisdiction: normalizedJurisdiction,
      state: resolvedState,
      frequency: 'annual',
      dueRule: {
        type: 'fixed_date',
        month: parsedDueDate.getMonth() + 1,
        day: parsedDueDate.getDate(),
      },
      isActive: false,
      isManual: true,
    });

    const event = await ComplianceEvent.create({
      company: formation._id,
      user: resolvedUserId,
      rule: rule._id,
      dueDate: parsedDueDate,
      status: normalizedStatus,
      notes: notes ? String(notes).trim() : '',
      assignedAdmin: assignedAdmin || undefined,
    });

    await createComplianceNotification(
      resolvedUserId,
      'New compliance item added',
      `${rule.name} has been added with a due date of ${parsedDueDate.toLocaleDateString()}.`,
      { eventId: event._id }
    );

    const populated = await ComplianceEvent.findById(event._id)
      .populate('company', 'companyName state entityType')
      .populate('user', 'name email companyName')
      .populate('rule', 'name jurisdiction state frequency description')
      .populate('assignedAdmin', 'name email');

    res.status(201).json({ success: true, event: populated });
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
