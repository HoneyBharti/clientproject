const express = require('express');
const { 
  getAllFormations, 
  getMyFormations, 
  createFormation, 
  updateFormation, 
  deleteFormation 
} = require('../controllers/formationController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('admin'), getAllFormations);
router.get('/me', protect, getMyFormations);
router.post('/', protect, createFormation);
router.put('/:id', protect, authorize('admin'), updateFormation);
router.delete('/:id', protect, authorize('admin'), deleteFormation);

module.exports = router;
