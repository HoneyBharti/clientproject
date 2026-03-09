// src/lib/api.ts
import { API_BASE_URL } from '@/lib/api-base';

export const api = {
  // Auth endpoints
  register: async (data: { name: string; email: string; password: string; companyName?: string; region?: string }) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    return res.json();
  },

  login: async (data: { email: string; password: string }) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    return res.json();
  },

  logout: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    return res.json();
  },

  getMe: async (token: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    return res.json();
  },

  // Payment endpoints
  createPaymentIntent: async (token: string, data: { amount: number; plan: string }) => {
    const res = await fetch(`${API_BASE_URL}/payment/create-intent`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    return res.json();
  },

  getMyPayments: async (token: string) => {
    const res = await fetch(`${API_BASE_URL}/payment/my-payments`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    return res.json();
  },

  // QuickBooks endpoints
  getQBAuthUrl: async (token: string) => {
    const res = await fetch(`${API_BASE_URL}/quickbooks/auth-url`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    return res.json();
  },

  disconnectQB: async (token: string) => {
    const res = await fetch(`${API_BASE_URL}/quickbooks/disconnect`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    return res.json();
  },

  getQBCompanyInfo: async (token: string) => {
    const res = await fetch(`${API_BASE_URL}/quickbooks/company-info`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    return res.json();
  }
};
