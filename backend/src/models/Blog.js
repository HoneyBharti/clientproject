const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  category: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  featuredImage: String,
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  publishedAt: Date,
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

blogSchema.index({ status: 1, publishedAt: -1 });

module.exports = mongoose.model('Blog', blogSchema);
