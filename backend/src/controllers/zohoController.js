const { fetchLeads } = require('../services/zohoService');

exports.getZohoLeads = async (req, res) => {
  try {
    const leads = await fetchLeads();
    res.json({ success: true, leads });
  } catch (error) {
    console.error('Zoho leads fetch failed:', error?.message || error);
    res.status(error.statusCode || 500).json({
      message: error?.message || 'Failed to fetch Zoho leads',
    });
  }
};
