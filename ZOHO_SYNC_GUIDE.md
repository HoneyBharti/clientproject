# Zoho Lead Sync - Complete Guide

## ✅ What Was Implemented

### **Option 2: Auto-Sync with Manual Refresh (Best Practice)**

Your Zoho integration now has:
1. ✅ **Database Storage** - Leads stored in MongoDB
2. ✅ **Auto Background Sync** - Syncs every 30 minutes
3. ✅ **Manual Sync Button** - Force refresh anytime
4. ✅ **Search & Filter** - Find leads quickly
5. ✅ **Stats Dashboard** - See lead metrics
6. ✅ **Status Tracking** - Track lead progress

---

## 🚀 How to Enable Auto-Sync

### Step 1: Add Environment Variable

In your `backend/.env` file, add:

```env
# Zoho Auto-Sync (set to 'true' to enable)
ZOHO_AUTO_SYNC=true

# Existing Zoho credentials (keep these)
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_client_secret
ZOHO_REFRESH_TOKEN=your_refresh_token
```

### Step 2: Restart Backend

```bash
cd backend
npm run dev
```

You'll see in console:
```
Server running on port 5000
[Zoho Sync] Starting background sync...
[Zoho Sync] Completed: 25 total (5 new, 20 updated)
[Zoho Sync] Started - will sync every 30 minutes
```

---

## 📊 How It Works

### **Automatic Sync Flow:**

```
Server Starts → Immediate Sync → Store in DB → 
Wait 30 min → Sync Again → Update DB → Repeat Forever
```

### **Manual Sync Flow:**

```
Admin clicks "Sync Now" → Fetch from Zoho → 
Update DB → Refresh UI → Show stats
```

### **What Gets Synced:**
- Lead Name
- Email
- Phone
- Company
- Lead Source
- Created Time
- Status (new/contacted/qualified/converted/lost)

---

## 🎯 Admin Features

### **Stats Dashboard**
- Total Leads
- New Leads
- Contacted Leads
- Qualified Leads
- Converted Leads

### **Search**
- Search by name, email, company, or phone
- Real-time filtering

### **Filter by Status**
- All Status
- New
- Contacted
- Qualified
- Converted
- Lost

### **Manual Sync**
- Click "Sync Now" button
- Shows "Syncing..." with spinner
- Updates all leads from Zoho
- Displays sync stats

---

## 📍 Access Zoho Leads

**URL:** `/admin/zoho-leads`

**Navigation:** 
- Currently accessible via direct URL
- To add to admin menu, update `admin-flow.tsx` navItems

---

## 🔧 API Endpoints

### 1. Get Stored Leads (Fast - from DB)
```
GET /api/zoho/stored-leads?status=new&search=john
```

### 2. Sync from Zoho (Manual trigger)
```
POST /api/zoho/sync
```

### 3. Get Direct from Zoho (Slow - real-time)
```
GET /api/zoho/leads
```

---

## 🗄️ Database Schema

**Collection:** `leads`

```javascript
{
  zohoId: "123456789",           // Unique Zoho ID
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  company: "Acme Inc",
  leadSource: "Website",
  zohoCreatedTime: "2024-01-15",
  lastSyncedAt: "2024-01-20",    // Last sync timestamp
  status: "new",                  // new/contacted/qualified/converted/lost
  notes: "",
  convertedToUser: null,          // Reference to User if converted
  createdAt: "2024-01-20",
  updatedAt: "2024-01-20"
}
```

---

## ⚙️ Configuration Options

### Change Sync Interval

In `backend/src/server.js`:

```javascript
// Sync every 15 minutes
startZohoSync(15);

// Sync every 60 minutes
startZohoSync(60);

// Default is 30 minutes
startZohoSync(30);
```

### Disable Auto-Sync

In `.env`:
```env
ZOHO_AUTO_SYNC=false
```

Or remove the line entirely.

---

## 🎨 UI Features

### Stats Cards
- Shows total, new, contacted, qualified, converted counts
- Color-coded for quick visual reference

### Search Bar
- Searches across name, email, company, phone
- Debounced (500ms delay) for performance

### Status Filter Dropdown
- Filter by lead status
- Updates results instantly

### Sync Button
- Shows "Syncing..." with spinner animation
- Disabled during sync to prevent double-clicks

### Status Badges
- Color-coded status badges
- Blue (new), Yellow (contacted), Green (qualified), Emerald (converted), Gray (lost)

---

## 🔄 Sync Behavior

### On Server Start:
1. Connects to database
2. Immediately syncs all leads from Zoho
3. Stores/updates in database
4. Starts 30-minute interval timer

### Every 30 Minutes:
1. Fetches all leads from Zoho CRM
2. Checks each lead against database
3. Creates new leads if not exists
4. Updates existing leads with latest data
5. Logs sync results to console

### On Manual Sync:
1. Admin clicks "Sync Now"
2. Triggers immediate sync
3. Shows loading state
4. Updates UI with fresh data
5. Displays sync stats

---

## 📝 Console Logs

You'll see these logs:

```
[Zoho Sync] Starting background sync...
[Zoho Sync] Completed: 50 total (10 new, 40 updated)
[Zoho Sync] Started - will sync every 30 minutes
```

If sync fails:
```
[Zoho Sync] Failed: Unable to refresh Zoho access token
```

---

## 🚨 Troubleshooting

### Sync Not Working?

1. **Check Environment Variables**
   ```bash
   echo $ZOHO_AUTO_SYNC
   echo $ZOHO_CLIENT_ID
   ```

2. **Check Console Logs**
   - Look for `[Zoho Sync]` messages
   - Check for error messages

3. **Test Manual Sync**
   - Go to `/admin/zoho-leads`
   - Click "Sync Now"
   - Check browser console for errors

4. **Verify Zoho Credentials**
   - Test with: `GET /api/zoho/leads`
   - Should return leads if credentials valid

### No Leads Showing?

1. Click "Sync Now" button
2. Check if Zoho CRM has leads
3. Verify Zoho API permissions
4. Check backend console for errors

---

## 🎉 Benefits

### For Admins:
- ✅ Instant load times (cached in DB)
- ✅ Search and filter capabilities
- ✅ Always up-to-date (auto-sync)
- ✅ Manual refresh when needed
- ✅ Lead statistics at a glance

### For System:
- ✅ Reduced API calls to Zoho
- ✅ Better performance
- ✅ Data persistence
- ✅ Offline access to leads
- ✅ Scalable architecture

---

## 📈 Next Steps (Optional Enhancements)

1. **Add to Admin Navigation**
   - Update `admin-flow.tsx` navItems
   - Add Zoho icon

2. **Lead Status Updates**
   - Allow admin to change lead status
   - Sync back to Zoho

3. **Convert Lead to User**
   - Button to create user account from lead
   - Link lead to user record

4. **Export Leads**
   - Export to CSV/Excel
   - Download filtered results

5. **Lead Notes**
   - Add notes to leads
   - Track communication history

---

## ✅ Summary

**Current Status:** ✅ Fully Implemented

**Auto-Sync:** Enable with `ZOHO_AUTO_SYNC=true`

**Access:** `/admin/zoho-leads`

**Sync Interval:** Every 30 minutes (configurable)

**Manual Sync:** Click "Sync Now" button

**Features:** Search, Filter, Stats, Status Tracking

**Storage:** MongoDB (leads collection)

Everything is ready to use! Just enable auto-sync in your `.env` file and restart the backend.
