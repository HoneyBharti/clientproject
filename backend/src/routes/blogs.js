const express = require('express');
const { 
  getAllBlogs, 
  getBlogBySlug, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', protect, authorize('admin'), createBlog);
router.put('/:id', protect, authorize('admin'), updateBlog);
router.delete('/:id', protect, authorize('admin'), deleteBlog);

module.exports = router;
