import { create } from 'zustand';
import { apiRequest } from '../services/api';

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  time: string;
}

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  addNotification: (item: NotificationItem) => void;
}

const defaultNotifications: NotificationItem[] = [
  { id: '1', type: 'TASK_ASSIGNMENT', title: 'Task Assigned', message: 'Rahul assigned you to "Implement Auth Middleware"', read: false, time: '10m ago' },
  { id: '2', type: 'MENTION', title: 'Mentioned in Comment', message: 'Aman mentioned you: "@Zaved please check WebRTC signaling"', read: false, time: '1h ago' },
  { id: '3', type: 'CLIENT_FEEDBACK', title: 'Client Feedback Received', message: 'Acme Corp left feedback on CareSprint demo link', read: true, time: '3h ago' },
];

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: defaultNotifications,
  unreadCount: 2,

  fetchNotifications: async () => {
    try {
      const res = await apiRequest('/notifications');
      if (res.success && res.notifications) {
        set({
          notifications: res.notifications,
          unreadCount: res.unreadCount ?? res.notifications.filter((n: any) => !n.read).length,
        });
      }
    } catch {
      set({ notifications: defaultNotifications, unreadCount: 2 });
    }
  },

  markAsRead: async (id) => {
    const updated = get().notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    set({
      notifications: updated,
      unreadCount: updated.filter((n) => !n.read).length,
    });
    try {
      await apiRequest(`/notifications/${id}/read`, { method: 'PUT' });
    } catch {
      // Retain optimistic state
    }
  },

  markAllAsRead: async () => {
    const updated = get().notifications.map((n) => ({ ...n, read: true }));
    set({ notifications: updated, unreadCount: 0 });
    try {
      await apiRequest('/notifications/read-all', { method: 'PUT' });
    } catch {
      // Retain optimistic state
    }
  },

  addNotification: (item) => {
    const updated = [item, ...get().notifications];
    set({
      notifications: updated,
      unreadCount: updated.filter((n) => !n.read).length,
    });
  },
}));
