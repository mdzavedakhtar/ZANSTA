import { ActivityLogItem } from '@/types/cms';

const STORAGE_KEY = 'zansta_activity_log';

const defaultActivities: ActivityLogItem[] = [
  {
    id: 'act_1',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    user: 'MD Zaved Akhtar',
    action: 'published client demo',
    target: 'CareSprint Live Demo Portal',
    type: 'demo',
  },
  {
    id: 'act_2',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    user: 'MD Zaved Akhtar',
    action: 'updated team profile & tech stack',
    target: 'Rahul Sharma',
    type: 'team',
  },
  {
    id: 'act_3',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    user: 'MD Zaved Akhtar',
    action: 'updated project status to Live',
    target: 'Insight IQ Analytics',
    type: 'project',
  },
  {
    id: 'act_4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    user: 'MD Zaved Akhtar',
    action: 'edited landing page CTA copy',
    target: 'Landing Page CMS',
    type: 'landing',
  },
];

export const activityService = {
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
    const updated = [newItem, ...activities].slice(0, 50); // Keep last 50
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newItem;
  },

  clearActivities: (): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  },
};
