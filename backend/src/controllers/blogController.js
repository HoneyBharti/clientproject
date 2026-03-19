const mongoose = require('mongoose');
const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    
    if (status) query.status = status;

    const blogs = await Blog.find(query)
      .populate('author', 'name email')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Blog.countDocuments(query);

    res.json({
      success: true,
      blogs,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate('author', 'name email');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.views += 1;
    await blog.save();

    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const rawAuthorName =
      typeof req.body.authorName === 'string'
        ? req.body.authorName
        : typeof req.body.author === 'string'
        ? req.body.author
        : '';
    const authorName = String(rawAuthorName || '').trim() || undefined;

    const payload = {
      ...req.body,
      author: req.user._id,
      authorName,
    };

    if (payload.status === 'published' && !payload.publishedAt) {
      payload.publishedAt = new Date();
    }

    const blog = await Blog.create({
      ...payload,
    });

    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.author && !mongoose.Types.ObjectId.isValid(updateData.author)) {
      updateData.authorName = String(updateData.author || '').trim() || updateData.authorName;
      delete updateData.author;
    }
    if (updateData.authorName !== undefined) {
      updateData.authorName = String(updateData.authorName || '').trim() || undefined;
    }
    if (updateData.status === 'published' && !updateData.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
