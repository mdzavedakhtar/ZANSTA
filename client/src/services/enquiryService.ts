import { ContactEnquiry, EnquiryStatus } from '@/types/cms';
import { activityService } from './activityService';

const STORAGE_KEY = 'zansta_cms_enquiries';

const defaultEnquiries: ContactEnquiry[] = [
  {
    id: 'enq_1',
    name: 'Vikram Malhotra',
    email: 'vikram@fintechglobal.io',
    phone: '+91 98765 43210',
    company: 'Fintech Global Labs',
    serviceInterested: 'Full Stack Website Development',
    budget: '$25,000 - $50,000',
    message: 'We want to re-architect our trading dashboard with high-frequency WebSocket feeds and custom dark mode UI.',
    status: 'NEW',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: 'enq_2',
    name: 'Emily Watson',
    email: 'emily@nexagen.ai',
    phone: '+1 555 019 2831',
    company: 'NexaGen AI',
    serviceInterested: 'Generative AI Tools Development',
    budget: '$50,000+',
    message: 'Looking for a specialized agency team to build dynamic vector DB agents and custom LLM interfaces.',
    status: 'IN_DISCUSSION',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

export const enquiryService = {
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

  createEnquiry: (data: Omit<ContactEnquiry, 'id' | 'createdAt' | 'status'>): ContactEnquiry => {
    const enquiries = enquiryService.getEnquiries();
    const newEnquiry: ContactEnquiry = {
      ...data,
      id: `enq_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    const updated = [newEnquiry, ...enquiries];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    activityService.logActivity(newEnquiry.name, 'submitted project contact enquiry', newEnquiry.company || newEnquiry.email, 'enquiry');
    return newEnquiry;
  },

  updateStatus: (id: string, status: EnquiryStatus): ContactEnquiry | null => {
    const enquiries = enquiryService.getEnquiries();
    const index = enquiries.findIndex((e) => e.id === id);
    if (index === -1) return null;

    enquiries[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
    activityService.logActivity('MD Zaved Akhtar', `updated enquiry status to ${status}`, enquiries[index].name, 'enquiry');
    return enquiries[index];
  },

  deleteEnquiry: (id: string): boolean => {
    const enquiries = enquiryService.getEnquiries();
    const target = enquiries.find((e) => e.id === id);
    if (!target) return false;

    const filtered = enquiries.filter((e) => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    activityService.logActivity('MD Zaved Akhtar', 'deleted contact enquiry', target.name, 'enquiry');
    return true;
  },
};
