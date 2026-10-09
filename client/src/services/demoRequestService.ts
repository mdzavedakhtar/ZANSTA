import { DemoRequest, DemoRequestStatus } from '@/types/cms';
import { apiRequest } from './api';
import { activityService } from './activityService';

const STORAGE_KEY = 'zansta_cms_demo_requests';

export const defaultRequests: DemoRequest[] = [];

export const demoRequestService = {
  // Async fetch from MongoDB API
  fetchRequests: async (): Promise<DemoRequest[]> => {
    try {
      const response = await apiRequest<{ success: boolean; data: DemoRequest[] }>('/cms/demo-requests');
      if (response.success && Array.isArray(response.data)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        return response.data;
      }
    } catch {
      // Silently fall back to local cache
    }
    return demoRequestService.getRequests();
  },

  // Synchronous read with local cache
  getRequests: (): DemoRequest[] => {
    let requests: DemoRequest[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        requests = JSON.parse(stored);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRequests));
        requests = defaultRequests;
      }
    } catch (e) {
      console.error('Failed to parse demo requests from localStorage', e);
      requests = defaultRequests;
    }
    requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return requests;
  },

  createRequest: async (data: Omit<DemoRequest, 'id' | 'createdAt' | 'status'>): Promise<DemoRequest> => {
    const requests = demoRequestService.getRequests();
    const id = `req_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newRequest: DemoRequest = {
      ...data,
      id,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    const updated = [newRequest, ...requests];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    activityService.logActivity(newRequest.name, 'submitted demo request', newRequest.company || newRequest.email, 'request');

    try {
      const res = await apiRequest<{ success: boolean; data: DemoRequest }>('/cms/demo-requests', {
        method: 'POST',
        body: JSON.stringify(newRequest),
      });
      if (res.success && res.data) return res.data;
    } catch (err) {
      console.warn('[demoRequestService] Failed to submit demo request to MongoDB, saved locally:', err);
    }

    return newRequest;
  },

  updateStatus: async (id: string, status: DemoRequestStatus): Promise<DemoRequest | null> => {
    const requests = demoRequestService.getRequests();
    const index = requests.findIndex((r) => r.id === id);
    if (index === -1) return null;

    requests[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    activityService.logActivity('MD Zaved Akhtar', `updated demo request status to ${status}`, requests[index].name, 'request');

    try {
      await apiRequest(`/cms/demo-requests/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      console.warn('[demoRequestService] Failed to update demo request status in MongoDB:', err);
    }

    return requests[index];
  },

  deleteRequest: async (id: string): Promise<boolean> => {
    const requests = demoRequestService.getRequests();
    const target = requests.find((r) => r.id === id);
    if (!target) return false;

    const filtered = requests.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    activityService.logActivity('MD Zaved Akhtar', 'deleted demo request', target.name, 'request');

    try {
      await apiRequest(`/cms/demo-requests/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.warn('[demoRequestService] Failed to delete demo request on server:', err);
    }

    return true;
  },
};
