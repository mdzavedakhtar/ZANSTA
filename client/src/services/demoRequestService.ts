import { DemoRequest, DemoRequestStatus } from '@/types/cms';
import { activityService } from './activityService';

const STORAGE_KEY = 'zansta_cms_demo_requests';

const defaultRequests: DemoRequest[] = [
  {
    id: 'req_1',
    name: 'Alexander Wright',
    email: 'alexander@horizontech.com',
    company: 'Horizon Technologies',
    projectInterest: 'AI & Generative AI Tools',
    message: 'We are looking to build a multi-agent workflow platform similar to NeuroStack.',
    contactMethod: 'email',
    status: 'NEW',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: 'req_2',
    name: 'Sophia Martinez',
    email: 'sophia@valenciamedical.com',
    company: 'Valencia Medical Group',
    projectInterest: 'Full Stack Telemedicine Web App',
    message: 'Interested in a custom WebRTC platform for patient consultations.',
    contactMethod: 'linkedin',
    status: 'CONTACTED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

export const demoRequestService = {
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

  createRequest: (data: Omit<DemoRequest, 'id' | 'createdAt' | 'status'>): DemoRequest => {
    const requests = demoRequestService.getRequests();
    const newRequest: DemoRequest = {
      ...data,
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    const updated = [newRequest, ...requests];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    activityService.logActivity(newRequest.name, 'submitted demo request', newRequest.company || newRequest.email, 'request');
    return newRequest;
  },

  updateStatus: (id: string, status: DemoRequestStatus): DemoRequest | null => {
    const requests = demoRequestService.getRequests();
    const index = requests.findIndex((r) => r.id === id);
    if (index === -1) return null;

    requests[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    activityService.logActivity('MD Zaved Akhtar', `updated demo request status to ${status}`, requests[index].name, 'request');
    return requests[index];
  },

  deleteRequest: (id: string): boolean => {
    const requests = demoRequestService.getRequests();
    const target = requests.find((r) => r.id === id);
    if (!target) return false;

    const filtered = requests.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    activityService.logActivity('MD Zaved Akhtar', 'deleted demo request', target.name, 'request');
    return true;
  },
};
