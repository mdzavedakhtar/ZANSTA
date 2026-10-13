import { DemoRequest, DemoRequestStatus } from '@/types/cms';
import { apiRequest } from './api';
import { activityService } from './activityService';
import { safeStorage } from '@/lib/safeStorage';

const STORAGE_KEY = 'zansta_cms_demo_requests';

export const defaultRequests: DemoRequest[] = [];

export const demoRequestService = {
  // Async fetch from MongoDB API
  fetchRequests: async (): Promise<DemoRequest[]> => {
    try {
      const response = await apiRequest<{ success: boolean; data: DemoRequest[] }>('/cms/demo-requests');
      if (response.success && Array.isArray(response.data)) {
        safeStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
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
      const stored = safeStorage.getItem(STORAGE_KEY);
      if (stored) {
        requests = JSON.parse(stored);
      } else {
        safeStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRequests));
        requests = defaultRequests;
      }
    } catch (e) {
      console.error('Failed to parse demo requests from storage', e);
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

    let resultRequest = newRequest;
    try {
      const res = await apiRequest<{ success: boolean; data: DemoRequest }>('/cms/demo-requests', {
        method: 'POST',
        body: JSON.stringify(newRequest),
      });
      if (res.success && res.data) resultRequest = res.data;
      activityService.logActivity(resultRequest.name, 'submitted demo request', resultRequest.company || resultRequest.email, 'request');
    } catch (err) {
      console.warn('[demoRequestService] Failed to submit demo request to MongoDB, saved locally:', err);
      activityService.logActivity(newRequest.name, 'submitted demo request (offline)', newRequest.company || newRequest.email, 'request');
    }

    try {
      const updated = [resultRequest, ...requests];
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (storageErr) {
      console.warn('safeStorage cache write skipped:', storageErr);
    }

    return resultRequest;
  },

  updateStatus: async (id: string, status: DemoRequestStatus): Promise<DemoRequest | null> => {
    const requests = demoRequestService.getRequests();
    const index = requests.findIndex((r) => r.id === id);
    if (index === -1) return null;

    requests[index].status = status;
    try {
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
      activityService.logActivity('MD Zaved Akhtar', `updated demo request status to ${status}`, requests[index].name, 'request');
    } catch (storageErr) {
      console.warn('safeStorage cache write skipped:', storageErr);
    }

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

    try {
      const filtered = requests.filter((r) => r.id !== id);
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      activityService.logActivity('MD Zaved Akhtar', 'deleted demo request', target.name, 'request');
    } catch (storageErr) {
      console.warn('safeStorage delete skipped:', storageErr);
    }

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
