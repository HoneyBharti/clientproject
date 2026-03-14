const path = require('path');
const mongoose = require('mongoose');
const ComplianceEvent = require('../src/models/ComplianceEvent');
require('../src/models/ComplianceRule');

const envPath = path.resolve(__dirname, '../.env');
require('dotenv').config({ path: envPath });

const toDateKey = (value) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
};

const buildKey = (event) => {
  const companyId = event.company ? String(event.company) : '';
  const ruleName = event.rule?.name || '';
  const jurisdiction = event.rule?.jurisdiction || '';
  const state = event.rule?.state || '';
  const dueKey = toDateKey(event.dueDate);
  return `${companyId}|${ruleName}|${jurisdiction}|${state}|${dueKey}`;
};

const run = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI is not set.');
    process.exit(1);
  }

  const apply = process.argv.includes('--apply');
  const dryRun = !apply;

  await mongoose.connect(mongoUri);

  const events = await ComplianceEvent.find()
    .populate('rule', 'name jurisdiction state')
    .select('company rule dueDate createdAt')
    .sort({ createdAt: 1 })
    .lean();

  const seen = new Map();
  const duplicates = [];

  for (const event of events) {
    const key = buildKey(event);
    if (!key) continue;
    if (seen.has(key)) {
      duplicates.push({ id: event._id, key });
    } else {
      seen.set(key, event._id);
    }
  }

  const duplicateIds = duplicates.map((d) => d.id);

  console.log(`Total events: ${events.length}`);
  console.log(`Duplicate groups: ${duplicates.length}`);
  console.log(`Dry run: ${dryRun}`);

  if (duplicates.length) {
    console.log('Sample duplicates (up to 10):');
    duplicates.slice(0, 10).forEach((dup) => {
      console.log(`- ${dup.id} | ${dup.key}`);
    });
  }

  if (!dryRun && duplicateIds.length) {
    const result = await ComplianceEvent.deleteMany({ _id: { $in: duplicateIds } });
    console.log(`Deleted duplicates: ${result.deletedCount}`);
  } else if (!duplicateIds.length) {
    console.log('No duplicates found.');
  } else {
    console.log('Run with --apply to delete duplicates.');
  }

  await mongoose.disconnect();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
