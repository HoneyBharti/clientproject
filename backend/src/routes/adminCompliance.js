const express = require('express');
const {
  getRules,
  createRule,
  updateRule,
  deleteRule,
  getEvents,
  updateEventStatus,
  assignEvent,
  requestDocuments,
  getTasks,
  createTask,
  updateTaskStatus,
  seedDefaultRules,
} = require('../controllers/adminComplianceController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect, authorize('admin'));

// Rules
router.get('/rules', getRules);
router.post('/rules', createRule);
router.post('/rules/seed', seedDefaultRules);
router.put('/rules/:id', updateRule);
router.delete('/rules/:id', deleteRule);

// Events
router.get('/events', getEvents);
router.patch('/events/:id/status', updateEventStatus);
router.post('/events/:id/assign', assignEvent);
router.post('/events/:id/request-documents', requestDocuments);

// Tasks
router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.patch('/tasks/:id/status', updateTaskStatus);

module.exports = router;
