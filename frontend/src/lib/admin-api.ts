import { API_BASE_URL } from './api-base';

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
};

// Activity Logs
export const activityLogsAPI = {
  getAll: (params?: { page?: number; limit?: number; entity?: string; userId?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchWithAuth(`${API_BASE_URL}/activity-logs?${query}`);
  },
  getMy: () => fetchWithAuth(`${API_BASE_URL}/activity-logs/me`),
};

// Blogs
export const blogsAPI = {
  getAll: (params?: { status?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchWithAuth(`${API_BASE_URL}/blogs?${query}`);
  },
  getBySlug: (slug: string) => fetchWithAuth(`${API_BASE_URL}/blogs/${slug}`),
  create: (data: any) => fetchWithAuth(`${API_BASE_URL}/blogs`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => fetchWithAuth(`${API_BASE_URL}/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchWithAuth(`${API_BASE_URL}/blogs/${id}`, { method: 'DELETE' }),
};

// Formations
export const formationsAPI = {
  getAll: (params?: { status?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchWithAuth(`${API_BASE_URL}/formations?${query}`);
  },
  getMy: () => fetchWithAuth(`${API_BASE_URL}/formations/me`),
  create: (data: any) => fetchWithAuth(`${API_BASE_URL}/formations`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => fetchWithAuth(`${API_BASE_URL}/formations/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchWithAuth(`${API_BASE_URL}/formations/${id}`, { method: 'DELETE' }),
};

// Orders
export const ordersAPI = {
  getAll: (params?: { status?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchWithAuth(`${API_BASE_URL}/orders?${query}`);
  },
  getMy: () => fetchWithAuth(`${API_BASE_URL}/orders/me`),
  getById: (id: string) => fetchWithAuth(`${API_BASE_URL}/orders/${id}`),
  create: (data: any) => fetchWithAuth(`${API_BASE_URL}/orders`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => fetchWithAuth(`${API_BASE_URL}/orders/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchWithAuth(`${API_BASE_URL}/orders/${id}`, { method: 'DELETE' }),
};

// Tickets
export const ticketsAPI = {
  getAll: (params?: { status?: string; priority?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchWithAuth(`${API_BASE_URL}/tickets?${query}`);
  },
  getMy: () => fetchWithAuth(`${API_BASE_URL}/tickets/me`),
  getById: (id: string) => fetchWithAuth(`${API_BASE_URL}/tickets/${id}`),
  create: (data: any) => fetchWithAuth(`${API_BASE_URL}/tickets`, { method: 'POST', body: JSON.stringify(data) }),
  addMessage: (id: string, data: { message: string; isInternal?: boolean }) =>
    fetchWithAuth(`${API_BASE_URL}/tickets/${id}/messages`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => fetchWithAuth(`${API_BASE_URL}/tickets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchWithAuth(`${API_BASE_URL}/tickets/${id}`, { method: 'DELETE' }),
};

// Services
export const servicesAPI = {
  getAll: (params?: { category?: string; country?: string; isActive?: boolean }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchWithAuth(`${API_BASE_URL}/services?${query}`);
  },
  getBySlug: (slug: string) => fetchWithAuth(`${API_BASE_URL}/services/${slug}`),
  create: (data: any) => fetchWithAuth(`${API_BASE_URL}/services`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => fetchWithAuth(`${API_BASE_URL}/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchWithAuth(`${API_BASE_URL}/services/${id}`, { method: 'DELETE' }),
};

// Settings
export const settingsAPI = {
  getAll: (params?: { category?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchWithAuth(`${API_BASE_URL}/settings?${query}`);
  },
  getPublic: () => fetchWithAuth(`${API_BASE_URL}/settings/public`),
  getByKey: (key: string) => fetchWithAuth(`${API_BASE_URL}/settings/${key}`),
  createOrUpdate: (data: any) => fetchWithAuth(`${API_BASE_URL}/settings`, { method: 'POST', body: JSON.stringify(data) }),
  delete: (key: string) => fetchWithAuth(`${API_BASE_URL}/settings/${key}`, { method: 'DELETE' }),
};

// Emails
export const emailsAPI = {
  getAll: (params?: { status?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchWithAuth(`${API_BASE_URL}/emails?${query}`);
  },
  getMy: () => fetchWithAuth(`${API_BASE_URL}/emails/me`),
  getById: (id: string) => fetchWithAuth(`${API_BASE_URL}/emails/${id}`),
  send: (data: { to: string; subject: string; body: string; template?: string; userId?: string }) =>
    fetchWithAuth(`${API_BASE_URL}/emails/send`, { method: 'POST', body: JSON.stringify(data) }),
};

// Notifications
export const notificationsAPI = {
  getMy: (params?: { isRead?: boolean; limit?: number }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchWithAuth(`${API_BASE_URL}/notifications/me?${query}`);
  },
  markAsRead: (id: string) => fetchWithAuth(`${API_BASE_URL}/notifications/${id}/read`, { method: 'PUT' }),
  markAllAsRead: () => fetchWithAuth(`${API_BASE_URL}/notifications/read-all`, { method: 'PUT' }),
  delete: (id: string) => fetchWithAuth(`${API_BASE_URL}/notifications/${id}`, { method: 'DELETE' }),
};

// Compliance
export const complianceAPI = {
  getOverview: () => fetchWithAuth(`${API_BASE_URL}/compliance/overview`),
  getUserCompliance: (userId: string) => fetchWithAuth(`${API_BASE_URL}/compliance/user/${userId}`),
};

// Admin (existing)
export const adminAPI = {
  getUsers: () => fetchWithAuth(`${API_BASE_URL}/admin/users`),
  updateUserStatus: (userId: string, status: string) =>
    fetchWithAuth(`${API_BASE_URL}/admin/users/status`, { method: 'PUT', body: JSON.stringify({ userId, status }) }),
  getStats: () => fetchWithAuth(`${API_BASE_URL}/admin/stats`),
};

// Payments (existing)
export const paymentsAPI = {
  getAll: () => fetchWithAuth(`${API_BASE_URL}/payment/all`),
  getMy: () => fetchWithAuth(`${API_BASE_URL}/payment/my-payments`),
};

// Documents (existing)
export const documentsAPI = {
  getMy: () => fetchWithAuth(`${API_BASE_URL}/documents/me`),
  getUserDocuments: (userId: string) => fetchWithAuth(`${API_BASE_URL}/documents/admin/user/${userId}`),
  uploadOfficial: (userId: string, data: { fileName: string; mimeType: string; fileDataBase64: string }) =>
    fetchWithAuth(`${API_BASE_URL}/documents/admin/user/${userId}/upload-official`, { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (documentId: string, status: string) =>
    fetchWithAuth(`${API_BASE_URL}/documents/admin/${documentId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  download: (documentId: string) => `${API_BASE_URL}/documents/${documentId}/download`,
};

// Onboarding (admin)
export const onboardingAPI = {
  getAll: (params?: { status?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchWithAuth(`${API_BASE_URL}/onboarding/admin?${query}`);
  },
  createFormation: (submissionId: string) =>
    fetchWithAuth(`${API_BASE_URL}/onboarding/admin/${submissionId}/create-formation`, { method: 'POST' }),
};
