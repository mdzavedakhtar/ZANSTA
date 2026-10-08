import { ContactEnquiry, EnquiryStatus } from '@/types/cms';
import { apiRequest } from './api';
import { activityService } from './activityService';

const STORAGE_KEY = 'zansta_cms_enquiries';

export const defaultEnquiries: ContactEnquiry[] = [];

export const enquiryService = {
  // Async fetch from MongoDB API
  fetchEnquiries: async (): Promise<ContactEnquiry[]> => {
    try {
      const response = await apiRequest<{ success: boolean; data: ContactEnquiry[] }>('/cms/enquiries');
      if (response.success && Array.isArray(response.data)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        return response.data;
      }
    } catch (err) {
      console.warn('[enquiryService] Backend API offline, using local cache:', err);
    }
    return enquiryService.getEnquiries();
  },

  // Synchronous read with local cache
  getEnquiries: (): ContactEnquiry[] => {
    let enquiries: ContactEnquiry[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        enquiries = JSON.parse(stored);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEnquiries));
        enquiries = defaultEnquiries;
      }
    } catch (e) {
      console.error('Failed to parse contact enquiries from localStorage', e);
      enquiries = defaultEnquiries;
    }
    enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return enquiries;
  },

  createEnquiry: async (data: Omit<ContactEnquiry, 'id' | 'createdAt' | 'status'>): Promise<ContactEnquiry> => {
    const enquiries = enquiryService.getEnquiries();
    const id = `enq_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newEnquiry: ContactEnquiry = {
      ...data,
      id,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    const updated = [newEnquiry, ...enquiries];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    activityService.logActivity(newEnquiry.name, 'submitted project contact enquiry', newEnquiry.company || newEnquiry.email, 'enquiry');

    try {
      const res = await apiRequest<{ success: boolean; data: ContactEnquiry }>('/cms/enquiries', {
        method: 'POST',
        body: JSON.stringify(newEnquiry),
      });
      if (res.success && res.data) return res.data;
    } catch (err) {
      console.warn('[enquiryService] Failed to submit enquiry to MongoDB, saved locally:', err);
    }

    return newEnquiry;
  },

  updateStatus: async (id: string, status: EnquiryStatus): Promise<ContactEnquiry | null> => {
    const enquiries = enquiryService.getEnquiries();
    const index = enquiries.findIndex((e) => e.id === id);
    if (index === -1) return null;

    enquiries[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
    activityService.logActivity('MD Zaved Akhtar', `updated enquiry status to ${status}`, enquiries[index].name, 'enquiry');

    try {
      await apiRequest(`/cms/enquiries/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      console.warn('[enquiryService] Failed to update enquiry status in MongoDB:', err);
    }

    return enquiries[index];
  },

  deleteEnquiry: async (id: string): Promise<boolean> => {
    const enquiries = enquiryService.getEnquiries();
    const target = enquiries.find((e) => e.id === id);
    if (!target) return false;

    const filtered = enquiries.filter((e) => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    activityService.logActivity('MD Zaved Akhtar', 'deleted contact enquiry', target.name, 'enquiry');

    try {
      await apiRequest(`/cms/enquiries/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.warn('[enquiryService] Failed to delete enquiry on server:', err);
    }

    return true;
  },
};
