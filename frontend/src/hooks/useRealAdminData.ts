import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/api-base';

export function useRealAdminData() {
  const [realData, setRealData] = useState({
    orders: [],
    formations: [],
    tickets: [],
    blogs: [],
    services: [],
    emails: [],
    activityLogs: [],
    settings: [],
    compliance: null,
    loading: true,
  });

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [
          ordersRes,
          formationsRes,
          ticketsRes,
          blogsRes,
          servicesRes,
          emailsRes,
          activityRes,
          settingsRes,
          complianceRes,
        ] = await Promise.allSettled([
          fetch(`${API_BASE_URL}/orders`, { credentials: 'include' }),
          fetch(`${API_BASE_URL}/formations`, { credentials: 'include' }),
          fetch(`${API_BASE_URL}/tickets`, { credentials: 'include' }),
          fetch(`${API_BASE_URL}/blogs`, { credentials: 'include' }),
          fetch(`${API_BASE_URL}/services`, { credentials: 'include' }),
          fetch(`${API_BASE_URL}/emails`, { credentials: 'include' }),
          fetch(`${API_BASE_URL}/activity-logs`, { credentials: 'include' }),
          fetch(`${API_BASE_URL}/settings`, { credentials: 'include' }),
          fetch(`${API_BASE_URL}/compliance/overview`, { credentials: 'include' }),
        ]);

        const parseResult = async (result: any) => {
          if (result.status === 'fulfilled' && result.value.ok) {
            const data = await result.value.json();
            return data;
          }
          return null;
        };

        const [
          orders,
          formations,
          tickets,
          blogs,
          services,
          emails,
          activity,
          settings,
          compliance,
        ] = await Promise.all([
          parseResult(ordersRes),
          parseResult(formationsRes),
          parseResult(ticketsRes),
          parseResult(blogsRes),
          parseResult(servicesRes),
          parseResult(emailsRes),
          parseResult(activityRes),
          parseResult(settingsRes),
          parseResult(complianceRes),
        ]);

        setRealData({
          orders: orders?.orders || [],
          formations: formations?.formations || [],
          tickets: tickets?.tickets || [],
          blogs: blogs?.blogs || [],
          services: services?.services || [],
          emails: emails?.emails || [],
          activityLogs: activity?.logs || [],
          settings: settings?.settings || [],
          compliance: compliance || null,
          loading: false,
        });
      } catch (error) {
        console.error('Failed to load admin data:', error);
        setRealData(prev => ({ ...prev, loading: false }));
      }
    };

    loadAllData();
  }, []);

  const refreshData = async (entity: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${entity}`, { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setRealData(prev => ({
          ...prev,
          [entity]: data[entity] || data[Object.keys(data)[1]] || [],
        }));
      }
    } catch (error) {
      console.error(`Failed to refresh ${entity}:`, error);
    }
  };

  return { ...realData, refreshData };
}
