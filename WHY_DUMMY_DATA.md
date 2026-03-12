# Why You're Seeing Dummy Data in Admin

## Current Status

### ✅ Already Using Real Data (Working)
1. **Dashboard Overview** - Real metrics from `/api/admin/stats`
2. **Users Page** - Real users from `/api/admin/users`
3. **Payments** - Real payments from `/api/payment/all`
4. **Documents** - Real documents from `/api/documents`
5. **Activity Logs** - Real logs from `/api/activity-logs` (newly integrated)

### ❌ Still Using Mock Data (Dummy Data)
6. **Orders** - Using `initialOrders` array (lines 440-480 in admin-flow.tsx)
7. **Formations** - Using `initialFormations` array (lines 482-510)
8. **Tickets** - Using `initialTickets` array (lines 520-524)
9. **Emails** - Using `initialEmailLogs` array (lines 526-530)
10. **Blogs/CMS** - Using `initialCmsRecords` array (lines 538-544)
11. **Plans/Subscriptions** - Using `initialPlans` array (lines 512-517)

## Why This Happens

The admin-flow.tsx file initializes state with mock data:

```typescript
// Line 700
const [orders, setOrders] = useState<OrderRecord[]>(initialOrders);

// Line 705
const [formations, setFormations] = useState<FormationRecord[]>(initialFormations);

// Line 710
const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);

// Line 717
const [emailLogs, setEmailLogs] = useState<EmailLog[]>(initialEmailLogs);
```

These never get replaced with real backend data because there's no `useEffect` to load them.

## Quick Fix

You need to add data loading for each entity. Here's the pattern:

### For Orders (add after line 850):
```typescript
useEffect(() => {
  const loadOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        const mapped = data.orders.map((o: any) => ({
          id: o._id,
          userId: o.user._id,
          customerName: o.user.name,
          serviceType: o.serviceType,
          country: o.metadata?.country || 'USA',
          status: o.status,
          assignedStaff: o.assignedTo?.name || 'Unassigned',
          paymentStatus: o.payment?.status || 'pending',
          amount: o.amount,
          documents: String(o.deliverables?.length || 0),
          createdAt: o.createdAt
        }));
        setOrders(mapped);
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };
  loadOrders();
}, []);
```

### For Formations (add after line 850):
```typescript
useEffect(() => {
  const loadFormations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/formations`, { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        const mapped = data.formations.map((f: any) => ({
          id: f._id,
          companyName: f.companyName,
          country: f.country,
          formationType: f.entityType,
          userId: f.user,
          jurisdiction: f.state,
          stage: f.status === 'pending' ? 'application_received' : 
                 f.status === 'processing' ? 'documents_submitted' :
                 f.status === 'filed' ? 'filed_with_government' :
                 f.status === 'approved' ? 'approved' : 'documents_delivered',
          assignedAgent: f.assignedTo?.name || 'Unassigned'
        }));
        setFormations(mapped);
      }
    } catch (error) {
      console.error('Failed to load formations:', error);
    }
  };
  loadFormations();
}, []);
```

### For Tickets (add after line 850):
```typescript
useEffect(() => {
  const loadTickets = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tickets`, { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        const mapped = data.tickets.map((t: any) => ({
          id: t._id,
          userName: t.user.name,
          subject: t.subject,
          status: t.status,
          priority: t.priority,
          attachments: t.attachments?.length || 0,
          updatedAt: t.updatedAt
        }));
        setTickets(mapped);
      }
    } catch (error) {
      console.error('Failed to load tickets:', error);
    }
  };
  loadTickets();
}, []);
```

### For Emails (add after line 850):
```typescript
useEffect(() => {
  const loadEmails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/emails`, { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        const mapped = data.emails.map((e: any) => ({
          id: e._id,
          type: e.template || 'General',
          user: e.user?.name || e.to,
          status: e.status,
          sentAt: e.sentAt || e.createdAt
        }));
        setEmailLogs(mapped);
      }
    } catch (error) {
      console.error('Failed to load emails:', error);
    }
  };
  loadEmails();
}, []);
```

## Where to Add These

In `admin-flow.tsx`, find line 850 (after `loadAdminUsersData()` useEffect) and add all the above useEffect hooks there.

## Alternative: Use the Hook I Created

Instead of adding individual useEffects, you can use the `useRealAdminData` hook I created:

1. At the top of AdminFlow component (line 690), add:
```typescript
const realAdminData = useRealAdminData();
```

2. Replace the mock data initialization:
```typescript
// Instead of:
const [orders, setOrders] = useState<OrderRecord[]>(initialOrders);

// Use:
const orders = useMemo(() => 
  realAdminData.orders.map(o => ({
    // mapping logic here
  })),
  [realAdminData.orders]
);
```

## Summary

- **Dashboard, Users, Payments, Documents, Activity Logs** = ✅ Real data
- **Orders, Formations, Tickets, Emails, Blogs, Plans** = ❌ Mock data (needs integration)

The backend APIs are 100% ready. You just need to add the `useEffect` hooks to load the data, or use the `useRealAdminData` hook I created.

**Estimated time to fix**: 30 minutes to add all useEffect hooks.
