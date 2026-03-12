const ComplianceRule = require('../models/ComplianceRule');
const ComplianceEvent = require('../models/ComplianceEvent');
const Formation = require('../models/Formation');
const Notification = require('../models/Notification');
const TaxFiling = require('../models/TaxFiling');

const DEFAULT_QUARTER_MONTHS = [1, 4, 6, 9];

const normalizeEntityType = (value) => (value ? String(value).toLowerCase() : '');

const buildDate = (year, month, day) => new Date(year, month - 1, day, 12, 0, 0);

const getNextAnnualDate = (rule, formation) => {
  const now = new Date();
  const incDate = formation.incorporationDate ? new Date(formation.incorporationDate) : null;
  const month = rule?.dueRule?.month || (incDate ? incDate.getMonth() + 1 : now.getMonth() + 1);
  const day = rule?.dueRule?.day || (incDate ? incDate.getDate() : 1);

  let date = buildDate(now.getFullYear(), month, day);
  if (date < now) {
    date = buildDate(now.getFullYear() + 1, month, day);
  }
  return [date];
};

const getNextAnniversaryDate = (rule, formation) => {
  const now = new Date();
  const incDate = formation.incorporationDate ? new Date(formation.incorporationDate) : null;
  const month = incDate ? incDate.getMonth() + 1 : rule?.dueRule?.month || now.getMonth() + 1;
  const day = incDate ? incDate.getDate() : rule?.dueRule?.day || 1;

  let date = buildDate(now.getFullYear(), month, day);
  if (date < now) {
    date = buildDate(now.getFullYear() + 1, month, day);
  }
  return [date];
};

const getNextQuarterlyDates = (rule) => {
  const now = new Date();
  const months = (rule?.dueRule?.months && rule.dueRule.months.length)
    ? rule.dueRule.months
    : DEFAULT_QUARTER_MONTHS;
  const day = rule?.dueRule?.day || 15;
  const dates = [];

  for (let yearOffset = 0; yearOffset <= 1; yearOffset += 1) {
    const year = now.getFullYear() + yearOffset;
    months.forEach((month) => {
      const date = buildDate(year, month, day);
      if (date >= now && dates.length < 4) {
        dates.push(date);
      }
    });
  }

  return dates.slice(0, 4);
};

const getNextMonthlyDates = (rule) => {
  const now = new Date();
  const day = rule?.dueRule?.day || 1;
  const dates = [];
  let current = new Date(now.getFullYear(), now.getMonth(), 1);

  for (let i = 0; i < 12; i += 1) {
    const date = buildDate(current.getFullYear(), current.getMonth() + 1, day);
    if (date >= now) {
      dates.push(date);
    }
    current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
  }

  return dates.slice(0, 12);
};

const matchesRule = (rule, formation) => {
  if (rule.jurisdiction === 'state' && rule.state && rule.state !== formation.state) {
    return false;
  }
  const entityTypes = (rule.entityTypes || []).map(normalizeEntityType);
  if (entityTypes.length === 0) {
    return true;
  }
  return entityTypes.includes(normalizeEntityType(formation.entityType));
};

const getDueDatesForRule = (rule, formation) => {
  if (rule.frequency === 'quarterly') {
    return getNextQuarterlyDates(rule);
  }
  if (rule.frequency === 'monthly') {
    return getNextMonthlyDates(rule);
  }
  if (rule.dueRule?.type === 'anniversary') {
    return getNextAnniversaryDate(rule, formation);
  }
  return getNextAnnualDate(rule, formation);
};

const toDateKey = (value) => {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().slice(0, 10);
};

const getRuleDedupeKey = (rule, dueDate) => {
  const name = rule?.name || '';
  const jurisdiction = rule?.jurisdiction || '';
  const state = rule?.state || '';
  return `${name}|${jurisdiction}|${state}|${toDateKey(dueDate)}`;
};

const createComplianceNotification = async (userId, title, message, metadata = {}) => {
  if (!userId) return;
  await Notification.create({
    user: userId,
    title,
    message,
    type: 'warning',
    category: 'compliance',
    metadata,
  });
};

const generateComplianceEventsForFormation = async (formation) => {
  if (!formation) return [];

  const rules = await ComplianceRule.find({ isActive: true });
  const now = new Date();
  const createdEvents = [];
  const existingEvents = await ComplianceEvent.find({ company: formation._id })
    .populate('rule', 'name jurisdiction state')
    .select('rule dueDate')
    .lean();
  const existingKeys = new Set(
    existingEvents.map((event) => getRuleDedupeKey(event.rule, event.dueDate))
  );

  for (const rule of rules) {
    if (!matchesRule(rule, formation)) continue;
    const dueDates = getDueDatesForRule(rule, formation);

    for (const dueDate of dueDates) {
      const dedupeKey = getRuleDedupeKey(rule, dueDate);
      if (existingKeys.has(dedupeKey)) continue;
      const existing = await ComplianceEvent.findOne({
        company: formation._id,
        rule: rule._id,
        dueDate,
      });
      if (existing) continue;

      const status = dueDate < now ? 'overdue' : 'upcoming';
      const event = await ComplianceEvent.create({
        company: formation._id,
        user: formation.user,
        rule: rule._id,
        dueDate,
        status,
      });
      createdEvents.push(event);
      existingKeys.add(dedupeKey);

      if (rule.createTaxFiling) {
        const taxYear = String(dueDate.getFullYear());
        const existingFiling = await TaxFiling.findOne({ complianceEvent: event._id });
        if (!existingFiling) {
          await TaxFiling.create({
            company: formation._id,
            user: formation.user,
            filingName: rule.filingName || rule.name,
            filingType: rule.filingType || rule.name,
            taxYear,
            jurisdiction: rule.jurisdiction === 'state' ? rule.state || 'State' : 'Federal',
            dueDate,
            complianceEvent: event._id,
            timeline: [{ label: 'Filing Created', message: 'Generated from compliance rule.', createdBy: null }],
          });
        }
      }
    }
  }

  return createdEvents;
};

const generateComplianceEventsForAllFormations = async () => {
  const formations = await Formation.find();
  for (const formation of formations) {
    await generateComplianceEventsForFormation(formation);
  }
};

const checkComplianceDeadlines = async () => {
  const now = new Date();
  const events = await ComplianceEvent.find({
    status: { $in: ['upcoming', 'in_progress', 'documents_requested'] },
  }).populate('rule', 'name');

  for (const event of events) {
    const dueDate = new Date(event.dueDate);
    if (dueDate < now && event.status !== 'overdue') {
      event.status = 'overdue';
      await event.save();
      await createComplianceNotification(
        event.user,
        'Compliance deadline overdue',
        `${event.rule?.name || 'Compliance item'} is now overdue.`,
        { eventId: event._id }
      );
      continue;
    }

    const diffDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays <= 7) {
      const lastReminder = event.lastReminderAt ? new Date(event.lastReminderAt) : null;
      const shouldRemind = !lastReminder || (now - lastReminder) > 3 * 24 * 60 * 60 * 1000;
      if (shouldRemind) {
        await createComplianceNotification(
          event.user,
          'Compliance deadline approaching',
          `${event.rule?.name || 'Compliance item'} is due in ${diffDays} day${diffDays === 1 ? '' : 's'}.`,
          { eventId: event._id }
        );
        event.lastReminderAt = now;
        await event.save();
      }
    }
  }
};

const initComplianceScheduler = () => {
  checkComplianceDeadlines().catch((error) => console.error('Compliance check failed:', error));
  setInterval(() => {
    checkComplianceDeadlines().catch((error) => console.error('Compliance check failed:', error));
  }, 24 * 60 * 60 * 1000);
};

module.exports = {
  generateComplianceEventsForFormation,
  generateComplianceEventsForAllFormations,
  checkComplianceDeadlines,
  initComplianceScheduler,
  createComplianceNotification,
};
