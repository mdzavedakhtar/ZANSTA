import { ActivityLogItem } from '@/types/cms';
import { apiRequest } from './api';

const STORAGE_KEY = 'zansta_activity_log';

export const defaultActivities: ActivityLogItem[] = [];

export const activityService = {
  // Async fetch from MongoDB API
  fetchActivities: async (): Promise<ActivityLogItem[]> => {
    try {
      const response = await apiRequest<{ success: boolean; data: ActivityLogItem[] }>('/cms/activities');
      if (response.success && Array.isArray(response.data)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        return response.data;
      }
    } catch (err) {
      console.warn('[activityService] Backend API offline, using local cache:', err);
    }
    return activityService.getActivities();
  },

  // Synchronous read with local cache
  getActivities: (): ActivityLogItem[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse activity log from localStorage', e);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultActivities));
    return defaultActivities;
  },

  logActivity: (user: string, action: string, target: string, type: ActivityLogItem['type']): ActivityLogItem => {
    const activities = activityService.getActivities();
    const newItem: ActivityLogItem = {
      id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      user,
      action,
      target,
      type,
    };
    const updated = [newItem, ...activities].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    apiRequest('/cms/activities', {
      method: 'POST',
      body: JSON.stringify(newItem),
    }).catch(() => {});

    return newItem;
  },

  clearActivities: async (): Promise<void> => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    try {
      await apiRequest('/cms/activities', { method: 'DELETE' });
    } catch (err) {
      console.warn('[activityService] Failed to clear activities on server:', err);
    }
  },
};
