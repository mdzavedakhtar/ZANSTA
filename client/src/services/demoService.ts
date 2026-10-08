import { CMSClientDemo } from '@/types/cms';
import { apiRequest } from './api';
import { activityService } from './activityService';

const STORAGE_KEY = 'zansta_cms_demos';

export const defaultDemos: CMSClientDemo[] = [
  {
    id: 'demo_caresprint',
    projectId: 'proj_caresprint',
    projectName: 'CareSprint Platform',
    token: 'caresprint-live-demo-2026',
    title: 'CareSprint Healthcare Portal Staging',
    description: 'Live interactive client demonstration environment featuring WebRTC tele-consultation and online doctor booking.',
    demoUrl: 'https://caresprint.example.com',
    previewImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    clientName: 'CareSprint Health Inc.',
    passcode: '123456',
    visibility: 'PRIVATE',
    status: 'LIVE',
    isFeatured: true,
    viewCount: 42,
    createdAt: '2026-01-15T12:00:00.000Z',
    updatedAt: '2026-02-20T16:00:00.000Z',
  },
  {
    id: 'demo_insightiq',
    projectId: 'proj_insightiq',
    projectName: 'Insight IQ Analytics',
    token: 'insightiq-analytics-preview',
    title: 'Insight IQ Financial Streaming Hub',
    description: 'High-frequency market metrics dashboard preview for executive client review.',
    demoUrl: 'https://insightiq.example.com',
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    clientName: 'Apex Capital Ltd',
    passcode: '',
    visibility: 'PUBLIC',
    status: 'LIVE',
    isFeatured: false,
    viewCount: 18,
    createdAt: '2026-02-05T10:30:00.000Z',
    updatedAt: '2026-02-25T11:45:00.000Z',
  },
];

export interface DemoFilterOptions {
  status?: string;
  visibility?: string;
  search?: string;
}

export const demoService = {
  // Async fetch from MongoDB API
  fetchDemos: async (filters?: DemoFilterOptions): Promise<CMSClientDemo[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.status && filters.status !== 'ALL') params.append('status', filters.status);
      if (filters?.visibility && filters.visibility !== 'ALL') params.append('visibility', filters.visibility);
      if (filters?.search) params.append('search', filters.search);

      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await apiRequest<{ success: boolean; data: CMSClientDemo[] }>(`/cms/demos${queryString}`);
      if (response.success && Array.isArray(response.data)) {
        if (!filters || Object.keys(filters).length === 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        }
        return response.data;
      }
    } catch (err) {
      console.warn('[demoService] Backend API offline, using local cache:', err);
    }
    return demoService.getDemos(filters);
  },

  // Synchronous read with local cache
  getDemos: (filters?: DemoFilterOptions): CMSClientDemo[] => {
    let demos: CMSClientDemo[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        demos = JSON.parse(stored);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDemos));
        demos = defaultDemos;
      }
    } catch (e) {
      console.error('Failed to parse client demos from localStorage', e);
      demos = defaultDemos;
    }

    demos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (!filters) return demos;

    return demos.filter((d) => {
      if (filters.status && filters.status !== 'ALL' && d.status !== filters.status) return false;
      if (filters.visibility && filters.visibility !== 'ALL' && d.visibility !== filters.visibility) return false;
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = d.title.toLowerCase().includes(query);
        const matchesClient = d.clientName.toLowerCase().includes(query);
        const matchesProject = d.projectName?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesClient && !matchesProject) return false;
      }
      return true;
    });
  },

  getDemoById: (id: string): CMSClientDemo | null => {
    const demos = demoService.getDemos();
    return demos.find((d) => d.id === id || d.token === id) || null;
  },

  getDemoByToken: (token: string): CMSClientDemo | null => {
    const demos = demoService.getDemos();
    return demos.find((d) => d.token === token || d.id === token) || null;
  },

  fetchDemoByToken: async (token: string): Promise<CMSClientDemo | null> => {
    try {
      const res = await apiRequest<{ success: boolean; data: CMSClientDemo }>(`/cms/demos/${token}`);
      if (res.success && res.data) return res.data;
    } catch (err) {
      console.warn('[demoService] Failed to fetch demo by token from server:', err);
    }
    return demoService.getDemoByToken(token);
  },

  verifyPasscode: (token: string, passcodeEntered: string): boolean => {
    const demo = demoService.getDemoByToken(token);
    if (!demo) return false;
    if (!demo.passcode || demo.passcode.trim() === '') return true;
    return demo.passcode === passcodeEntered;
  },

  incrementViewCount: (token: string): void => {
    const demos = demoService.getDemos();
    const index = demos.findIndex((d) => d.token === token || d.id === token);
    if (index !== -1) {
      demos[index].viewCount = (demos[index].viewCount || 0) + 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demos));
    }
    apiRequest(`/cms/demos/${token}/view`, { method: 'POST' }).catch(() => {});
  },

  createDemo: async (data: Omit<CMSClientDemo, 'id' | 'createdAt' | 'updatedAt' | 'token' | 'viewCount'> & { token?: string }): Promise<CMSClientDemo> => {
    const demos = demoService.getDemos();
    const generatedToken = data.token || `${data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`;
    const id = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    const newDemo: CMSClientDemo = {
      ...data,
      id,
      token: generatedToken,
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newDemo, ...demos];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    activityService.logActivity('MD Zaved Akhtar', 'created client demo', newDemo.title, 'demo');

    try {
      const res = await apiRequest<{ success: boolean; data: CMSClientDemo }>('/cms/demos', {
        method: 'POST',
        body: JSON.stringify(newDemo),
      });
      if (res.success && res.data) return res.data;
    } catch (err) {
      console.warn('[demoService] Failed to save demo in MongoDB, saved locally:', err);
    }

    return newDemo;
  },

  updateDemo: async (id: string, updates: Partial<CMSClientDemo>): Promise<CMSClientDemo | null> => {
    const demos = demoService.getDemos();
    const index = demos.findIndex((d) => d.id === id || d.token === id);
    if (index === -1) return null;

    const existing = demos[index];
    const updatedDemo: CMSClientDemo = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    demos[index] = updatedDemo;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demos));
    activityService.logActivity('MD Zaved Akhtar', 'updated client demo', updatedDemo.title, 'demo');

    try {
      await apiRequest(`/cms/demos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.warn('[demoService] Failed to update demo in MongoDB, updated locally:', err);
    }

    return updatedDemo;
  },

  regenerateToken: async (id: string): Promise<string | null> => {
    const demos = demoService.getDemos();
    const index = demos.findIndex((d) => d.id === id || d.token === id);
    if (index === -1) return null;

    const newToken = `${demos[index].title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-6)}`;
    demos[index].token = newToken;
    demos[index].updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demos));
    activityService.logActivity('MD Zaved Akhtar', 'regenerated demo security token', demos[index].title, 'demo');

    try {
      const res = await apiRequest<{ success: boolean; token: string }>(`/cms/demos/${id}/regenerate-token`, {
        method: 'POST',
      });
      if (res.success && res.token) return res.token;
    } catch (err) {
      console.warn('[demoService] Failed to regenerate token on server:', err);
    }

    return newToken;
  },

  deleteDemo: async (id: string): Promise<boolean> => {
    const demos = demoService.getDemos();
    const target = demos.find((d) => d.id === id || d.token === id);
    if (!target) return false;

    const filtered = demos.filter((d) => d.id !== id && d.token !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    activityService.logActivity('MD Zaved Akhtar', 'deleted client demo', target.title, 'demo');

    try {
      await apiRequest(`/cms/demos/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.warn('[demoService] Failed to delete demo on server, deleted locally:', err);
    }

    return true;
  },
};
