const Email = require('../models/Email');

exports.getAllEmails = async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const query = {};
    
    if (status) query.status = status;

    const emails = await Email.find(query)
      .populate('user', 'name email')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Email.countDocuments(query);

    res.json({
      success: true,
      emails,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyEmails = async (req, res) => {
  try {
    const emails = await Email.find({ user: req.user._id })
      .sort('-createdAt')
      .limit(100);

    res.json({ success: true, emails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendEmail = async (req, res) => {
  try {
    const { to, subject, body, template } = req.body;

    const email = await Email.create({
      to,
      subject,
      body,
      template,
      user: req.body.userId || req.user._id,
      status: 'pending'
    });

    // TODO: Integrate with email service (SendGrid, AWS SES, etc.)
    // For now, mark as sent
    email.status = 'sent';
    email.sentAt = new Date();
    await email.save();

    res.status(201).json({ success: true, email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmailById = async (req, res) => {
  try {
    const email = await Email.findById(req.params.id).populate('user', 'name email');

    if (!email) {
      return res.status(404).json({ message: 'Email not found' });
    }

    res.json({ success: true, email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
