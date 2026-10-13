import { CMSProject } from '@/types/cms';
import { apiRequest } from './api';
import { activityService } from './activityService';
import { safeStorage } from '@/lib/safeStorage';

const STORAGE_KEY = 'zansta_cms_projects';

export const defaultProjects: CMSProject[] = [
  {
    id: 'proj_caresprint',
    name: 'CareSprint Platform',
    slug: 'caresprint',
    shortDescription: 'On-Demand Healthcare Telemedicine & Prescription Platform',
    description:
      'Real-time doctor scheduling, WebRTC video consultations, encrypted patient records, and automated prescription generation. Engineered for high performance with sub-100ms video signaling latency.',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop',
    ],
    techStack: ['React 18', 'Node.js', 'Socket.IO', 'MongoDB', 'Razorpay'],
    category: 'SAAS',
    status: 'LIVE',
    githubUrl: 'https://github.com/zansta/caresprint',
    liveUrl: 'https://caresprint.example.com',
    clientName: 'CareSprint Health Inc.',
    clientRating: 5.0,
    clientReviewPreview: 'ZANSTA delivered our telemedicine video gateway with sub-100ms signaling latency.',
    isClientProject: true,
    isFeatured: true,
    isVisible: true,
    order: 1,
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-02-15T14:30:00.000Z',
  },
  {
    id: 'proj_neurostack',
    name: 'NeuroStack AI Engine',
    slug: 'neurostack',
    shortDescription: 'Autonomous AI Agent Workflow & Orchestration Engine',
    description:
      'Multi-agent coordination system with vector database search, tool execution, dynamic task graphs, and sub-second context retrieval for enterprise LLM automation.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
    ],
    techStack: ['TypeScript', 'FastAPI', 'Vector DB', 'Redis', 'Tailwind'],
    category: 'AI / ML',
    status: 'IN_PROGRESS',
    githubUrl: 'https://github.com/zansta/neurostack',
    liveUrl: 'https://neurostack.example.com',
    clientName: 'Internal Product',
    clientRating: 5.0,
    clientReviewPreview: 'Multi-agent orchestration engine that automated our operational workflows.',
    isClientProject: false,
    isFeatured: true,
    isVisible: true,
    order: 2,
    createdAt: '2026-01-20T11:15:00.000Z',
    updatedAt: '2026-02-28T09:20:00.000Z',
  },
  {
    id: 'proj_insightiq',
    name: 'Insight IQ Analytics',
    slug: 'insightiq',
    shortDescription: 'Real-time Financial Analytics & High-Frequency Streaming Hub',
    description:
      'High-frequency financial metrics dashboard with live WebSocket feeds, exportable PDF reports, automated custom alert rules, and interactive chart visualizations.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    ],
    techStack: ['Next.js', 'Express', 'Chart.js', 'PostgreSQL', 'Tailwind'],
    category: 'WEB APP',
    status: 'COMPLETED',
    githubUrl: 'https://github.com/zansta/insightiq',
    liveUrl: 'https://insightiq.example.com',
    clientName: 'Apex Capital Ltd',
    clientRating: 5.0,
    clientReviewPreview: 'The real-time streaming WebSocket hub handles millions of points seamlessly.',
    isClientProject: true,
    isFeatured: true,
    isVisible: true,
    order: 3,
    createdAt: '2026-02-01T08:45:00.000Z',
    updatedAt: '2026-03-02T16:10:00.000Z',
  },
];

export interface ProjectFilterOptions {
  status?: string;
  category?: string;
  isFeatured?: boolean;
  isVisible?: boolean;
  isClientProject?: boolean;
  search?: string;
}

export const projectService = {
  // Async fetch from MongoDB API
  fetchProjects: async (filters?: ProjectFilterOptions): Promise<CMSProject[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.status && filters.status !== 'ALL') params.append('status', filters.status);
      if (filters?.category && filters.category !== 'ALL') params.append('category', filters.category);
      if (filters?.isFeatured !== undefined) params.append('isFeatured', String(filters.isFeatured));
      if (filters?.isVisible !== undefined) params.append('isVisible', String(filters.isVisible));
      if (filters?.isClientProject !== undefined) params.append('isClientProject', String(filters.isClientProject));
      if (filters?.search) params.append('search', filters.search);

      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await apiRequest<{ success: boolean; data: CMSProject[] }>(`/cms/projects${queryString}`);
      if (response.success && Array.isArray(response.data)) {
        if (!filters || Object.keys(filters).length === 0 || (Object.keys(filters).length === 1 && filters.isVisible !== undefined)) {
          safeStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        }
        return response.data;
      }
    } catch {
      // Silently fall back to local cache
    }
    return projectService.getProjects(filters);
  },

  // Synchronous read with local cache
  getProjects: (filters?: ProjectFilterOptions): CMSProject[] => {
    let projects: CMSProject[] = [];
    try {
      const stored = safeStorage.getItem(STORAGE_KEY);
      if (stored) {
        projects = JSON.parse(stored);
      } else {
        safeStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
        projects = defaultProjects;
      }
    } catch (e) {
      console.error('Failed to parse projects from storage', e);
      projects = defaultProjects;
    }

    // Sort by order ascending
    projects.sort((a, b) => (a.order || 0) - (b.order || 0));

    if (!filters) return projects;

    return projects.filter((p) => {
      if (filters.status && filters.status !== 'ALL' && p.status !== filters.status) {
        if (filters.status === 'ACTIVE' && p.status !== 'IN_PROGRESS' && p.status !== 'LIVE') return false;
        if (filters.status !== 'ACTIVE' && p.status !== filters.status) return false;
      }
      if (filters.category && filters.category !== 'ALL' && p.category !== filters.category) return false;
      if (filters.isFeatured !== undefined && p.isFeatured !== filters.isFeatured) return false;
      if (filters.isVisible !== undefined && p.isVisible !== filters.isVisible) return false;
      if (filters.isClientProject !== undefined && p.isClientProject !== filters.isClientProject) return false;
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.shortDescription.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
        const matchesTech = p.techStack.some((t) => t.toLowerCase().includes(query));
        const matchesClient = p.clientName?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTech && !matchesClient) return false;
      }
      return true;
    });
  },

  getProjectById: (id: string): CMSProject | null => {
    const projects = projectService.getProjects();
    return projects.find((p) => p.id === id || p.slug === id) || null;
  },

  fetchProjectById: async (id: string): Promise<CMSProject | null> => {
    try {
      const res = await apiRequest<{ success: boolean; data: CMSProject }>(`/cms/projects/${id}`);
      if (res.success && res.data) {
        const projects = projectService.getProjects();
        const updated = projects.some((p) => p.id === id || p.slug === id)
          ? projects.map((p) => (p.id === id || p.slug === id ? res.data : p))
          : [...projects, res.data];
        safeStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return res.data;
      }
    } catch {
      // Gracefully fallback to local storage
    }
    return projectService.getProjectById(id);
  },

  getProjectBySlug: (slug: string): CMSProject | null => {
    const projects = projectService.getProjects();
    return projects.find((p) => p.slug === slug || p.id === slug) || null;
  },

  createProject: async (data: Omit<CMSProject, 'id' | 'createdAt' | 'updatedAt' | 'order'> & { order?: number }): Promise<CMSProject> => {
    const projects = projectService.getProjects();
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const id = `proj_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    const newProject: CMSProject = {
      ...data,
      id,
      slug: slug || `project-${Date.now()}`,
      order: data.order ?? (projects.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let resultProject = newProject;
    try {
      const res = await apiRequest<{ success: boolean; data: CMSProject }>('/cms/projects', {
        method: 'POST',
        body: JSON.stringify(newProject),
      });
      if (res.data) {
        resultProject = res.data;
      }
      activityService.logActivity('MD Zaved Akhtar', 'created project', resultProject.name, 'project');
    } catch (apiErr) {
      console.warn('Backend API create failed, saving to local cache:', apiErr);
      activityService.logActivity('MD Zaved Akhtar', 'created project (offline)', newProject.name, 'project');
    }

    try {
      const updatedProjects = [...projects.filter((p) => p.id !== id && p.id !== resultProject.id && p.slug !== resultProject.slug), resultProject];
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
    } catch (storageErr) {
      console.warn('safeStorage cache write skipped:', storageErr);
    }

    return resultProject;
  },

  updateProject: async (id: string, updates: Partial<CMSProject>): Promise<CMSProject | null> => {
    const projects = projectService.getProjects();
    const index = projects.findIndex((p) => p.id === id || p.slug === id);
    const existing = index !== -1 ? projects[index] : ({} as CMSProject);

    const updatedProject: CMSProject = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    let resultProject = updatedProject;
    try {
      const res = await apiRequest<{ success: boolean; data: CMSProject }>(`/cms/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      if (res.data) {
        resultProject = res.data;
      }
      activityService.logActivity('MD Zaved Akhtar', 'updated project', resultProject.name || 'Project', 'project');
    } catch (apiErr) {
      console.warn('Backend API update failed, saving to local cache:', apiErr);
      activityService.logActivity('MD Zaved Akhtar', 'updated project (offline)', updatedProject.name || 'Project', 'project');
    }

    try {
      const updatedList = projects.some((p) => p.id === id || p.slug === id)
        ? projects.map((p) => (p.id === id || p.slug === id ? resultProject : p))
        : [...projects, resultProject];
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (storageErr) {
      console.warn('safeStorage cache write skipped:', storageErr);
    }

    return resultProject;
  },

  deleteProject: async (id: string): Promise<boolean> => {
    const projects = projectService.getProjects();
    const target = projects.find((p) => p.id === id || p.slug === id);

    try {
      await apiRequest(`/cms/projects/${id}`, {
        method: 'DELETE',
      });
    } catch {
      // Local fallback
    }

    try {
      const filtered = projects.filter((p) => p.id !== id && p.slug !== id);
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      activityService.logActivity('MD Zaved Akhtar', 'deleted project', target?.name || id, 'project');
    } catch (storageErr) {
      console.warn('safeStorage delete cache skipped:', storageErr);
    }
    return true;
  },

  reorderProjects: async (reorderedProjects: CMSProject[]): Promise<void> => {
    const updated = reorderedProjects.map((p, idx) => ({
      ...p,
      order: idx + 1,
      updatedAt: new Date().toISOString(),
    }));

    try {
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      activityService.logActivity('MD Zaved Akhtar', 'reordered projects', 'Project Showcase Order', 'project');
    } catch (storageErr) {
      console.warn('safeStorage reorder cache skipped:', storageErr);
    }

    try {
      await apiRequest('/cms/projects/reorder', {
        method: 'PUT',
        body: JSON.stringify({ projects: updated }),
      });
    } catch {
      // Local fallback
    }
  },
};
