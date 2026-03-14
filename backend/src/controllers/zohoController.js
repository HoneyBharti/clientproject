const { fetchLeads } = require('../services/zohoService');
const Lead = require('../models/Lead');

exports.syncZohoLeads = async (req, res) => {
  try {
    const zohoLeads = await fetchLeads();
    
    let newCount = 0;
    let updatedCount = 0;

    for (const lead of zohoLeads) {
      const existingLead = await Lead.findOne({ zohoId: lead.id });
      
      if (existingLead) {
        await Lead.findByIdAndUpdate(existingLead._id, {
          fullName: lead.Full_Name,
          email: lead.Email,
          phone: lead.Phone,
          company: lead.Company,
          leadSource: lead.Lead_Source,
          zohoCreatedTime: lead.Created_Time,
          lastSyncedAt: new Date()
        });
        updatedCount++;
      } else {
        await Lead.create({
          zohoId: lead.id,
          fullName: lead.Full_Name,
          email: lead.Email,
          phone: lead.Phone,
          company: lead.Company,
          leadSource: lead.Lead_Source,
          zohoCreatedTime: lead.Created_Time,
          lastSyncedAt: new Date()
        });
        newCount++;
      }
    }

    res.json({ 
      success: true, 
      message: `Synced ${zohoLeads.length} leads (${newCount} new, ${updatedCount} updated)`,
      stats: { total: zohoLeads.length, new: newCount, updated: updatedCount }
    });
  } catch (error) {
    console.error('Zoho leads sync failed:', error?.message || error);
    res.status(error.statusCode || 500).json({
      message: error?.message || 'Failed to sync Zoho leads',
    });
  }
};

exports.getStoredLeads = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const leads = await Lead.find(query)
      .sort('-zohoCreatedTime')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const count = await Lead.countDocuments(query);

    res.json({ 
      success: true, 
      leads,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get stored leads failed:', error?.message || error);
    res.status(500).json({
      message: error?.message || 'Failed to get stored leads',
    });
  }
};

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
