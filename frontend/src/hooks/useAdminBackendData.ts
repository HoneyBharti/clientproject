"use client";

import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '@/lib/api-base';

export function useAdminBackendData() {
  const [orders, setOrders] = useState<any[]>([]);
  const [formations, setFormations] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [emails, setEmails] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load Orders
  const loadOrders = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, { credentials: 'include' });
      const data = await res.json();
      if (data.success && data.orders) {
        const mapped = data.orders.map((o: any) => ({
          id: String(o._id),
          userId: String(o.user?._id || o.user),
          customerName: o.user?.name || 'Unknown',
          serviceType: o.serviceType || 'Service',
          country: o.metadata?.country || 'USA',
          status: o.status || 'pending',
          assignedStaff: o.assignedTo?.name || 'Unassigned',
          paymentStatus: o.payment?.status || 'pending',
          amount: o.amount || 0,
          documents: String(o.deliverables?.length || 0),
          createdAt: o.createdAt
        }));
        setOrders(mapped);
      }
    } catch (err) {
      console.error('Failed to load orders:', err);
    }
  }, []);

  // Load Formations
  const loadFormations = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/formations`, { credentials: 'include' });
      const data = await res.json();
      if (data.success && data.formations) {
        const mapped = data.formations.map((f: any) => ({
          id: String(f._id),
          companyName: f.companyName,
          country: f.country || 'USA',
          formationType: f.entityType || 'LLC',
          userId: String(f.user?._id || f.user),
          jurisdiction: f.state || 'Delaware',
          stage: f.status === 'pending' ? 'application_received' :
                 f.status === 'processing' ? 'documents_submitted' :
                 f.status === 'filed' ? 'filed_with_government' :
                 f.status === 'approved' ? 'approved' : 'documents_delivered',
          assignedAgent: f.assignedTo?.name || 'Unassigned'
        }));
        setFormations(mapped);
      }
    } catch (err) {
      console.error('Failed to load formations:', err);
    }
  }, []);

  // Load Tickets
  const loadTickets = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/tickets`, { credentials: 'include' });
      const data = await res.json();
      if (data.success && data.tickets) {
        const mapped = data.tickets.map((t: any) => ({
          id: String(t._id),
          userName: t.user?.name || 'Unknown',
          subject: t.subject,
          status: t.status,
          priority: t.priority,
          attachments: t.attachments?.length || 0,
          updatedAt: t.updatedAt
        }));
        setTickets(mapped);
      }
    } catch (err) {
      console.error('Failed to load tickets:', err);
    }
  }, []);

  // Load Services
  const loadServices = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/services`, { credentials: 'include' });
      const data = await res.json();
      if (data.success && data.services) {
        setServices(data.services);
      }
    } catch (err) {
      console.error('Failed to load services:', err);
    }
  }, []);

  // Load Emails
  const loadEmails = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/emails`, { credentials: 'include' });
      const data = await res.json();
      if (data.success && data.emails) {
        const mapped = data.emails.map((e: any) => ({
          id: String(e._id),
          type: e.template || 'General',
          user: e.user?.name || e.to,
          status: e.status,
          sentAt: e.sentAt || e.createdAt
        }));
        setEmails(mapped);
      }
    } catch (err) {
      console.error('Failed to load emails:', err);
    }
  }, []);

  // Load Blogs
  const loadBlogs = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs`, { credentials: 'include' });
      const data = await res.json();
      if (data.success && data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error('Failed to load blogs:', err);
    }
  }, []);

  // Load Activity Logs
  const loadActivityLogs = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/activity-logs?limit=100`, { credentials: 'include' });
      const data = await res.json();
      if (data.success && data.logs) {
        const mapped = data.logs.map((log: any) => ({
          id: String(log._id),
          action: log.action,
          actor: log.user?.name || 'System',
          createdAt: log.createdAt
        }));
        setActivityLogs(mapped);
      }
    } catch (err) {
      console.error('Failed to load activity logs:', err);
    }
  }, []);

  // Update Order
  const updateOrder = useCallback(async (orderId: string, updates: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success) {
        await loadOrders();
        return true;
      }
    } catch (err) {
      console.error('Failed to update order:', err);
    }
    return false;
  }, [loadOrders]);

  // Update Formation
  const updateFormation = useCallback(async (formationId: string, updates: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/formations/${formationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success) {
        await loadFormations();
        return true;
      }
    } catch (err) {
      console.error('Failed to update formation:', err);
    }
    return false;
  }, [loadFormations]);

  // Update Ticket
  const updateTicket = useCallback(async (ticketId: string, updates: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success) {
        await loadTickets();
        return true;
      }
    } catch (err) {
      console.error('Failed to update ticket:', err);
    }
    return false;
  }, [loadTickets]);

  // Create Service
  const createService = useCallback(async (serviceData: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(serviceData)
      });
      const data = await res.json();
      if (data.success) {
        await loadServices();
        return true;
      }
    } catch (err) {
      console.error('Failed to create service:', err);
    }
    return false;
  }, [loadServices]);

  // Update Service
  const updateService = useCallback(async (serviceId: string, updates: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/services/${serviceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success) {
        await loadServices();
        return true;
      }
    } catch (err) {
      console.error('Failed to update service:', err);
    }
    return false;
  }, [loadServices]);

  // Delete Service
  const deleteService = useCallback(async (serviceId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/services/${serviceId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        await loadServices();
        return true;
      }
    } catch (err) {
      console.error('Failed to delete service:', err);
    }
    return false;
  }, [loadServices]);

  // Load all data on mount
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([
        loadOrders(),
        loadFormations(),
        loadTickets(),
        loadServices(),
        loadEmails(),
        loadBlogs(),
        loadActivityLogs()
      ]);
      setLoading(false);
    };
    loadAll();
  }, [loadOrders, loadFormations, loadTickets, loadServices, loadEmails, loadBlogs, loadActivityLogs]);

  return {
    orders,
    formations,
    tickets,
    services,
    emails,
    blogs,
    activityLogs,
    loading,
    loadOrders,
    loadFormations,
    loadTickets,
    loadServices,
    loadEmails,
    loadBlogs,
    loadActivityLogs,
    updateOrder,
    updateFormation,
    updateTicket,
    createService,
    updateService,
    deleteService
  };
}
