import { ContactEnquiry, EnquiryStatus } from '@/types/cms';
import { apiRequest } from './api';
import { activityService } from './activityService';
import { safeStorage } from '@/lib/safeStorage';

const STORAGE_KEY = 'zansta_cms_enquiries';

export const defaultEnquiries: ContactEnquiry[] = [];

export const enquiryService = {
  // Async fetch from MongoDB API
  fetchEnquiries: async (): Promise<ContactEnquiry[]> => {
    try {
      const response = await apiRequest<{ success: boolean; data: ContactEnquiry[] }>('/cms/enquiries');
      if (response.success && Array.isArray(response.data)) {
        safeStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        return response.data;
      }
    } catch {
      // Silently fall back to local cache
    }
    return enquiryService.getEnquiries();
  },

  // Synchronous read with local cache
  getEnquiries: (): ContactEnquiry[] => {
    let enquiries: ContactEnquiry[] = [];
    try {
      const stored = safeStorage.getItem(STORAGE_KEY);
      if (stored) {
        enquiries = JSON.parse(stored);
      } else {
        safeStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEnquiries));
        enquiries = defaultEnquiries;
      }
    } catch {
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

    let resultEnquiry = newEnquiry;
    try {
      const res = await apiRequest<{ success: boolean; data: ContactEnquiry }>('/cms/enquiries', {
        method: 'POST',
        body: JSON.stringify(newEnquiry),
      });
      if (res.success && res.data) resultEnquiry = res.data;
      activityService.logActivity(resultEnquiry.name, 'submitted project contact enquiry', resultEnquiry.company || resultEnquiry.email, 'enquiry');
    } catch {
      activityService.logActivity(newEnquiry.name, 'submitted project contact enquiry (offline)', newEnquiry.company || newEnquiry.email, 'enquiry');
    }

    try {
      const updated = [resultEnquiry, ...enquiries];
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (storageErr) {
      console.warn('safeStorage cache write skipped:', storageErr);
    }

    return resultEnquiry;
  },

  updateStatus: async (id: string, status: EnquiryStatus): Promise<ContactEnquiry | null> => {
    const enquiries = enquiryService.getEnquiries();
    const index = enquiries.findIndex((e) => e.id === id);
    if (index === -1) return null;

    enquiries[index].status = status;
    try {
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
      activityService.logActivity('MD Zaved Akhtar', `updated enquiry status to ${status}`, enquiries[index].name, 'enquiry');
    } catch (storageErr) {
      console.warn('safeStorage cache write skipped:', storageErr);
    }

    try {
      await apiRequest(`/cms/enquiries/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
    } catch {
      // Local fallback
    }

    return enquiries[index];
  },

  deleteEnquiry: async (id: string): Promise<boolean> => {
    const enquiries = enquiryService.getEnquiries();
    const target = enquiries.find((e) => e.id === id);
    if (!target) return false;

    try {
      const filtered = enquiries.filter((e) => e.id !== id);
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      activityService.logActivity('MD Zaved Akhtar', 'deleted contact enquiry', target.name, 'enquiry');
    } catch (storageErr) {
      console.warn('safeStorage delete skipped:', storageErr);
    }

    try {
      await apiRequest(`/cms/enquiries/${id}`, {
        method: 'DELETE',
      });
    } catch {
      // Local fallback
    }

    return true;
  },
};
