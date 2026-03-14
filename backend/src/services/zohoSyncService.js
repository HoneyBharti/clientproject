const { fetchLeads } = require('./zohoService');
const Lead = require('../models/Lead');

let syncInterval = null;

const syncZohoLeadsBackground = async () => {
  try {
    console.log('[Zoho Sync] Starting background sync...');
    
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

    console.log(`[Zoho Sync] Completed: ${zohoLeads.length} total (${newCount} new, ${updatedCount} updated)`);
  } catch (error) {
    console.error('[Zoho Sync] Failed:', error?.message || error);
  }
};

const startZohoSync = (intervalMinutes = 30) => {
  if (syncInterval) {
    console.log('[Zoho Sync] Already running');
    return;
  }

  // Run immediately on start
  syncZohoLeadsBackground();

  // Then run every X minutes
  syncInterval = setInterval(syncZohoLeadsBackground, intervalMinutes * 60 * 1000);
  
  console.log(`[Zoho Sync] Started - will sync every ${intervalMinutes} minutes`);
};

const stopZohoSync = () => {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
    console.log('[Zoho Sync] Stopped');
  }
};

module.exports = {
  startZohoSync,
  stopZohoSync,
  syncZohoLeadsBackground
};
