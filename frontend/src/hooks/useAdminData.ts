import { useState, useEffect, useCallback } from 'react';
import {
  activityLogsAPI,
  blogsAPI,
  formationsAPI,
  ordersAPI,
  ticketsAPI,
  servicesAPI,
  settingsAPI,
  emailsAPI,
  complianceAPI,
  adminAPI,
  paymentsAPI,
  documentsAPI,
  onboardingAPI,
  companyProgressAPI,
  zohoAPI,
} from '@/lib/admin-api';

export function useAdminData() {
  // Activity Logs
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [activityLoading, setActivityLoading] = useState(false);

  // Blogs
  const [blogs, setBlogs] = useState<any[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(false);

  // Formations
  const [formations, setFormations] = useState<any[]>([]);
  const [formationsLoading, setFormationsLoading] = useState(false);

  // Orders
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Tickets
  const [tickets, setTickets] = useState<any[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);

  // Services
  const [services, setServices] = useState<any[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);

  // Settings
  const [settings, setSettings] = useState<any[]>([]);
  const [settingsLoading, setSettingsLoading] = useState(false);

  // Emails
  const [emails, setEmails] = useState<any[]>([]);
  const [emailsLoading, setEmailsLoading] = useState(false);

  // Compliance
  const [complianceData, setComplianceData] = useState<any>(null);
  const [complianceLoading, setComplianceLoading] = useState(false);

  // Onboarding
  const [onboardingSubmissions, setOnboardingSubmissions] = useState<any[]>([]);
  const [onboardingLoading, setOnboardingLoading] = useState(false);

  // Zoho Leads
  const [zohoLeads, setZohoLeads] = useState<any[]>([]);
  const [zohoLeadsLoading, setZohoLeadsLoading] = useState(false);
  const [zohoLeadsError, setZohoLeadsError] = useState<string | null>(null);

  // Load Activity Logs
  const loadActivityLogs = useCallback(async () => {
    setActivityLoading(true);
    try {
      const data = await activityLogsAPI.getAll({ limit: 100 });
      setActivityLogs(data.logs || []);
    } catch (error) {
      console.error('Failed to load activity logs:', error);
      setActivityLogs([]);
    } finally {
      setActivityLoading(false);
    }
  }, []);

  // Load Blogs
  const loadBlogs = useCallback(async () => {
    setBlogsLoading(true);
    try {
      const data = await blogsAPI.getAll({ limit: 100 });
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error('Failed to load blogs:', error);
      setBlogs([]);
    } finally {
      setBlogsLoading(false);
    }
  }, []);

  // Load Formations
  const loadFormations = useCallback(async () => {
    setFormationsLoading(true);
    try {
      const data = await formationsAPI.getAll({ limit: 100 });
      setFormations(data.formations || []);
    } catch (error) {
      console.error('Failed to load formations:', error);
      setFormations([]);
    } finally {
      setFormationsLoading(false);
    }
  }, []);

  // Load Orders
  const loadOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const data = await ordersAPI.getAll({ limit: 100 });
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Failed to load orders:', error);
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  // Load Tickets
  const loadTickets = useCallback(async () => {
    setTicketsLoading(true);
    try {
      const data = await ticketsAPI.getAll({ limit: 100 });
      setTickets(data.tickets || []);
    } catch (error) {
      console.error('Failed to load tickets:', error);
      setTickets([]);
    } finally {
      setTicketsLoading(false);
    }
  }, []);

  // Load Services
  const loadServices = useCallback(async () => {
    setServicesLoading(true);
    try {
      const data = await servicesAPI.getAll();
      setServices(data.services || []);
    } catch (error) {
      console.error('Failed to load services:', error);
      setServices([]);
    } finally {
      setServicesLoading(false);
    }
  }, []);

  // Load Settings
  const loadSettings = useCallback(async () => {
    setSettingsLoading(true);
    try {
      const data = await settingsAPI.getAll();
      setSettings(data.settings || []);
    } catch (error) {
      console.error('Failed to load settings:', error);
      setSettings([]);
    } finally {
      setSettingsLoading(false);
    }
  }, []);

  // Load Emails
  const loadEmails = useCallback(async () => {
    setEmailsLoading(true);
    try {
      const data = await emailsAPI.getAll({ limit: 100 });
      setEmails(data.emails || []);
    } catch (error) {
      console.error('Failed to load emails:', error);
      setEmails([]);
    } finally {
      setEmailsLoading(false);
    }
  }, []);

  // Load Compliance
  const loadCompliance = useCallback(async () => {
    setComplianceLoading(true);
    try {
      const data = await complianceAPI.getOverview();
      setComplianceData(data);
    } catch (error) {
      console.error('Failed to load compliance data:', error);
      setComplianceData(null);
    } finally {
      setComplianceLoading(false);
    }
  }, []);

  const loadOnboardingSubmissions = useCallback(async () => {
    setOnboardingLoading(true);
    try {
      const data = await onboardingAPI.getAll();
      setOnboardingSubmissions(data.submissions || []);
    } catch (error) {
      console.error('Failed to load onboarding submissions:', error);
      setOnboardingSubmissions([]);
    } finally {
      setOnboardingLoading(false);
    }
  }, []);

  const loadZohoLeads = useCallback(async () => {
    setZohoLeadsLoading(true);
    setZohoLeadsError(null);
    try {
      const data = await zohoAPI.getLeads();
      setZohoLeads(data.leads || []);
    } catch (error) {
      console.error('Failed to load Zoho leads:', error);
      setZohoLeads([]);
      setZohoLeadsError(error instanceof Error ? error.message : 'Unable to load Zoho leads.');
    } finally {
      setZohoLeadsLoading(false);
    }
  }, []);

  // CRUD Operations
  const createBlog = useCallback(async (blogData: any) => {
    try {
      await blogsAPI.create(blogData);
      await loadBlogs();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [loadBlogs]);

  const updateBlog = useCallback(async (id: string, blogData: any) => {
    try {
      await blogsAPI.update(id, blogData);
      await loadBlogs();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [loadBlogs]);

  const deleteBlog = useCallback(async (id: string) => {
    try {
      await blogsAPI.delete(id);
      await loadBlogs();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [loadBlogs]);

  const updateFormation = useCallback(async (id: string, formationData: any) => {
    try {
      await formationsAPI.update(id, formationData);
      await loadFormations();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [loadFormations]);

  const updateFormationProgress = useCallback(async (id: string, progressData: any) => {
    try {
      await companyProgressAPI.updateProgress(id, progressData);
      await loadFormations();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [loadFormations]);

  const updateFormationEinNumber = useCallback(async (id: string, einData: any) => {
    try {
      await companyProgressAPI.updateEin(id, einData);
      await loadFormations();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [loadFormations]);

  const updateOrder = useCallback(async (id: string, orderData: any) => {
    try {
      await ordersAPI.update(id, orderData);
      await loadOrders();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [loadOrders]);

  const updateTicket = useCallback(async (id: string, ticketData: any) => {
    try {
      await ticketsAPI.update(id, ticketData);
      await loadTickets();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [loadTickets]);

  const addTicketMessage = useCallback(async (id: string, message: string, isInternal = false) => {
    try {
      await ticketsAPI.addMessage(id, { message, isInternal });
      await loadTickets();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [loadTickets]);

  const createService = useCallback(async (serviceData: any) => {
    try {
      await servicesAPI.create(serviceData);
      await loadServices();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [loadServices]);

  const updateService = useCallback(async (id: string, serviceData: any) => {
    try {
      await servicesAPI.update(id, serviceData);
      await loadServices();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [loadServices]);

  const deleteService = useCallback(async (id: string) => {
    try {
      await servicesAPI.delete(id);
      await loadServices();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [loadServices]);

  const updateSetting = useCallback(async (settingData: any) => {
    try {
      await settingsAPI.createOrUpdate(settingData);
      await loadSettings();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [loadSettings]);

  const sendEmail = useCallback(async (emailData: any) => {
    try {
      await emailsAPI.send(emailData);
      await loadEmails();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [loadEmails]);

  const createFormationFromOnboarding = useCallback(async (submissionId: string) => {
    try {
      await onboardingAPI.createFormation(submissionId);
      await Promise.all([loadOnboardingSubmissions(), loadFormations()]);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [loadOnboardingSubmissions, loadFormations]);

  return {
    // Data
    activityLogs,
    blogs,
    formations,
    orders,
    tickets,
    services,
    settings,
    emails,
    complianceData,
    onboardingSubmissions,
    zohoLeads,
    zohoLeadsError,

    // Loading states
    activityLoading,
    blogsLoading,
    formationsLoading,
    ordersLoading,
    ticketsLoading,
    servicesLoading,
    settingsLoading,
    emailsLoading,
    complianceLoading,
    onboardingLoading,
    zohoLeadsLoading,

    // Load functions
    loadActivityLogs,
    loadBlogs,
    loadFormations,
    loadOrders,
    loadTickets,
    loadServices,
    loadSettings,
    loadEmails,
    loadCompliance,
    loadOnboardingSubmissions,
    loadZohoLeads,

    // CRUD operations
    createBlog,
    updateBlog,
    deleteBlog,
    updateFormation,
    updateFormationProgress,
    updateFormationEinNumber,
    updateOrder,
    updateTicket,
    addTicketMessage,
    createService,
    updateService,
    deleteService,
    updateSetting,
    sendEmail,
    createFormationFromOnboarding,
  };
}
