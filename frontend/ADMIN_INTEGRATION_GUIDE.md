# Admin Frontend Integration - Complete Guide

## ✅ What Was Created

### 1. API Service Layer (`/frontend/src/lib/admin-api.ts`)
Centralized API functions for all admin endpoints:
- Activity Logs API
- Blogs API
- Formations API
- Orders API
- Tickets API
- Services API
- Settings API
- Emails API
- Notifications API
- Compliance API
- Admin API (users, stats)
- Payments API
- Documents API

### 2. Admin Data Hook (`/frontend/src/hooks/useAdminData.ts`)
React hook that provides:
- State management for all admin data
- Loading states
- CRUD operations
- Auto-refresh capabilities

## 🔄 Integration Status

### Already Integrated (Working with Real Data)
✅ **Dashboard Overview** - Uses `adminAPI.getStats()`
✅ **Users Management** - Uses `adminAPI.getUsers()` and `adminAPI.updateUserStatus()`
✅ **Payments** - Uses `paymentsAPI.getAll()`
✅ **Documents** - Uses `documentsAPI` for all operations

### Needs Integration (Currently Using Mock Data)

#### 1. Activity Logs (`/admin/activity-logs`)
**Current**: Mock data in `admin-flow.tsx`
**Integration**:
```typescript
// In admin-flow.tsx, add:
const { activityLogs, loadActivityLogs } = useAdminData();

useEffect(() => {
  loadActivityLogs();
}, []);

// Pass to ActivityView:
<ActivityView ctx={{ ...viewCtx, activityLogs }} />
```

#### 2. Blogs (`/admin/blogs`)
**Current**: Mock CMS records
**Integration**:
```typescript
const { blogs, loadBlogs, createBlog, updateBlog, deleteBlog } = useAdminData();

useEffect(() => {
  loadBlogs();
}, []);

// Update BlogsView to use real blogs data
```

#### 3. Formations (`/admin/formations`)
**Current**: Mock formation records
**Integration**:
```typescript
const { formations, loadFormations, updateFormation } = useAdminData();

useEffect(() => {
  loadFormations();
}, []);

// Map formations to match existing structure:
const mappedFormations = formations.map(f => ({
  id: f._id,
  companyName: f.companyName,
  country: f.country,
  formationType: f.entityType,
  userId: f.user,
  jurisdiction: f.state,
  stage: f.status, // Map status to stage
  assignedAgent: f.assignedTo?.name || 'Unassigned'
}));
```

#### 4. Orders (`/admin/orders`)
**Current**: Mock order records
**Integration**:
```typescript
const { orders, loadOrders, updateOrder } = useAdminData();

useEffect(() => {
  loadOrders();
}, []);

// Map orders to match existing structure:
const mappedOrders = orders.map(o => ({
  id: o._id,
  userId: o.user._id,
  customerName: o.user.name,
  serviceType: o.serviceType,
  country: o.metadata?.country || 'USA',
  status: o.status,
  assignedStaff: o.assignedTo?.name || 'Unassigned',
  paymentStatus: o.payment?.status || 'pending',
  amount: o.amount,
  documents: o.deliverables?.length || 0,
  createdAt: o.createdAt
}));
```

#### 5. Tickets (`/admin/tickets`)
**Current**: Mock ticket records
**Integration**:
```typescript
const { tickets, loadTickets, updateTicket, addTicketMessage } = useAdminData();

useEffect(() => {
  loadTickets();
}, []);

// Map tickets to match existing structure:
const mappedTickets = tickets.map(t => ({
  id: t._id,
  userName: t.user.name,
  subject: t.subject,
  status: t.status,
  priority: t.priority,
  attachments: t.attachments?.length || 0,
  updatedAt: t.updatedAt
}));
```

#### 6. Services (`/admin/services`)
**Current**: Mock service records
**Integration**:
```typescript
const { services, loadServices, createService, updateService, deleteService } = useAdminData();

useEffect(() => {
  loadServices();
}, []);
```

#### 7. Settings (`/admin/settings`)
**Current**: Local state object
**Integration**:
```typescript
const { settings, loadSettings, updateSetting } = useAdminData();

useEffect(() => {
  loadSettings();
}, []);

// Convert settings array to object:
const settingsObj = settings.reduce((acc, s) => ({
  ...acc,
  [s.key]: s.value
}), {});
```

#### 8. Emails (`/admin/emails`)
**Current**: Mock email logs
**Integration**:
```typescript
const { emails, loadEmails, sendEmail } = useAdminData();

useEffect(() => {
  loadEmails();
}, []);

// Map emails to match existing structure:
const mappedEmails = emails.map(e => ({
  id: e._id,
  type: e.template || 'General',
  user: e.user?.name || e.to,
  status: e.status,
  sentAt: e.sentAt || e.createdAt
}));
```

#### 9. Compliance (`/admin/compliance`)
**Current**: Calculated from user records
**Integration**:
```typescript
const { complianceData, loadCompliance } = useAdminData();

useEffect(() => {
  loadCompliance();
}, []);

// Use complianceData.complianceRiskUsers, awaitingDocsUsers, etc.
```

## 📝 Step-by-Step Integration Plan

### Phase 1: Update admin-flow.tsx (Main Component)

1. **Import the hook**:
```typescript
import { useAdminData } from '@/hooks/useAdminData';
```

2. **Initialize the hook**:
```typescript
const adminData = useAdminData();
```

3. **Load data on mount**:
```typescript
useEffect(() => {
  adminData.loadActivityLogs();
  adminData.loadBlogs();
  adminData.loadFormations();
  adminData.loadOrders();
  adminData.loadTickets();
  adminData.loadServices();
  adminData.loadSettings();
  adminData.loadEmails();
  adminData.loadCompliance();
}, []);
```

4. **Replace mock data with real data**:
```typescript
// Replace:
const [orders, setOrders] = useState<OrderRecord[]>(initialOrders);

// With:
const orders = useMemo(() => 
  adminData.orders.map(o => ({
    id: String(o._id),
    userId: String(o.user?._id || o.user),
    customerName: o.user?.name || 'Unknown',
    serviceType: o.serviceType,
    country: o.metadata?.country || 'USA',
    status: o.status,
    assignedStaff: o.assignedTo?.name || 'Unassigned',
    paymentStatus: o.payment?.status || 'pending',
    amount: o.amount,
    documents: String(o.deliverables?.length || 0),
    createdAt: o.createdAt
  })),
  [adminData.orders]
);
```

5. **Update CRUD operations**:
```typescript
// Replace:
const updateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
  setOrders((prev) => prev.map((order) => 
    (order.id === orderId ? { ...order, status: nextStatus } : order)
  ));
};

// With:
const updateOrderStatus = async (orderId: string, nextStatus: OrderStatus) => {
  const result = await adminData.updateOrder(orderId, { status: nextStatus });
  if (result.success) {
    addActivity(`Order ${orderId} moved to ${nextStatus}`);
  }
};
```

### Phase 2: Update Individual View Components

Each view component needs minimal changes since they receive data through `ctx` prop.

**Example for ActivityView**:
```typescript
// No changes needed! Just ensure activityLogs is passed in ctx
```

**Example for BlogsView**:
```typescript
// Update to use real blog operations
const handleCreateBlog = async (blogData: any) => {
  const result = await ctx.createBlog(blogData);
  if (result.success) {
    // Show success message
  }
};
```

### Phase 3: Update View Context

Update the `viewCtx` object to include all admin data operations:

```typescript
const viewCtx = {
  // ... existing properties
  
  // Add admin data operations
  ...adminData,
  
  // Mapped data
  activityLogs: adminData.activityLogs,
  blogs: adminData.blogs,
  formations: mappedFormations,
  orders: mappedOrders,
  tickets: mappedTickets,
  services: adminData.services,
  emails: mappedEmails,
  complianceData: adminData.complianceData,
};
```

## 🎯 Quick Integration (Minimal Changes)

If you want to integrate quickly without major refactoring:

1. **Keep existing UI/UX exactly as is**
2. **Only replace data sources**:

```typescript
// In admin-flow.tsx, add at the top of component:
const adminData = useAdminData();

useEffect(() => {
  // Load all data on mount
  adminData.loadActivityLogs();
  adminData.loadBlogs();
  adminData.loadFormations();
  adminData.loadOrders();
  adminData.loadTickets();
  adminData.loadServices();
  adminData.loadSettings();
  adminData.loadEmails();
  adminData.loadCompliance();
}, []);

// Then replace each mock data array with real data:
const activityLogs = adminData.activityLogs;
const blogs = adminData.blogs;
// ... etc
```

3. **Update CRUD operations to call API**:

```typescript
const updateOrderStatus = async (orderId: string, nextStatus: string) => {
  await adminData.updateOrder(orderId, { status: nextStatus });
  addActivity(`Order ${orderId} updated`);
};
```

## 🚀 Testing Checklist

After integration, test each admin page:

- [ ] Dashboard shows real metrics
- [ ] Users page shows real users
- [ ] Activity logs show real logs
- [ ] Blogs page shows real blogs (CRUD works)
- [ ] Formations page shows real formations
- [ ] Orders page shows real orders
- [ ] Tickets page shows real tickets
- [ ] Services page shows real services
- [ ] Settings page shows real settings
- [ ] Emails page shows real emails
- [ ] Compliance page shows real compliance data
- [ ] Payments page shows real payments
- [ ] Documents page shows real documents

## 📊 Data Mapping Reference

### Backend → Frontend Field Mapping

**Formation**:
- `_id` → `id`
- `entityType` → `formationType`
- `state` → `jurisdiction`
- `status` → `stage`

**Order**:
- `_id` → `id`
- `user._id` → `userId`
- `user.name` → `customerName`
- `metadata.country` → `country`

**Ticket**:
- `_id` → `id`
- `user.name` → `userName`
- `attachments.length` → `attachments`

**Email**:
- `_id` → `id`
- `template` → `type`
- `user.name` or `to` → `user`

## 🎉 Result

After integration:
- All admin pages will show **real data from backend**
- All CRUD operations will **persist to database**
- Admin can **fully manage** the platform
- **No breaking changes** to existing UI/UX

## 📝 Notes

- The existing admin UI is well-designed and doesn't need changes
- Only data sources and operations need to be swapped
- All backend endpoints are ready and tested
- Integration can be done incrementally (page by page)
- Existing mock data can remain as fallback during development
