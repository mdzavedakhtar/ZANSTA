import { CMSService } from '@/types/cms';
import { apiRequest } from './api';
import { activityService } from './activityService';

const STORAGE_KEY = 'zansta_cms_services';

export const defaultServices: CMSService[] = [
  {
    id: 'svc_frontend_design',
    name: 'Frontend Design',
    shortDescription: 'Pixel-perfect 2026 dark UI/UX design systems with fluid Framer Motion animations and magnetic interactions.',
    fullDescription: 'Custom UI/UX component architectures, high-precision motion choreography, and high-converting modern dark interfaces tailored for modern platforms.',
    iconName: 'Layout',
    tag: 'UI / UX',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    techStack: ['Framer Motion', 'TailwindCSS', 'React 18', 'Figma'],
    isFeatured: true,
    isVisible: true,
    order: 1,
    createdAt: '2026-01-01T10:00:00.000Z',
    updatedAt: '2026-01-01T10:00:00.000Z',
  },
  {
    id: 'svc_fullstack_dev',
    name: 'Full Stack Website Development',
    shortDescription: 'Scalable MERN/Next.js web applications engineered with clean microservices and real-time WebSockets.',
    fullDescription: 'Complete end-to-end full stack platforms featuring low-latency WebSocket signaling, MongoDB Atlas architectures, and robust RESTful API gateways.',
    iconName: 'Code2',
    tag: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    techStack: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Express'],
    isFeatured: true,
    isVisible: true,
    order: 2,
    createdAt: '2026-01-02T10:00:00.000Z',
    updatedAt: '2026-01-02T10:00:00.000Z',
  },
  {
    id: 'svc_seo_opt',
    name: 'SEO Design & Optimization',
    shortDescription: 'High-speed technical SEO architecture, structured metadata schema, and performance optimizations.',
    fullDescription: 'Core Web Vitals scoring optimization, SSR/SSG rendering, OpenGraph tags, and semantic search indexing to drive top Google rankings.',
    iconName: 'Search',
    tag: 'Growth',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    techStack: ['Technical SEO', 'Next.js SSR', 'Schema.org', 'Lighthouse 100'],
    isFeatured: true,
    isVisible: true,
    order: 3,
    createdAt: '2026-01-03T10:00:00.000Z',
    updatedAt: '2026-01-03T10:00:00.000Z',
  },
  {
    id: 'svc_ai_engine',
    name: 'Generative AI Tools Development',
    shortDescription: 'Autonomous multi-agent engines, RAG vector database pipelines, and custom AI workflow automation.',
    fullDescription: 'Custom vector database architectures (Pinecone/Chroma), Gemini/OpenAI tool integrations, and dynamic multi-agent task execution.',
    iconName: 'Bot',
    tag: 'AI / ML',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    techStack: ['Python', 'Pinecone', 'LangChain', 'OpenAI', 'Gemini'],
    isFeatured: true,
    isVisible: true,
    order: 4,
    createdAt: '2026-01-04T10:00:00.000Z',
    updatedAt: '2026-01-04T10:00:00.000Z',
  },
  {
    id: 'svc_analytics_ai',
    name: 'Data Analytics with Generative AI',
    shortDescription: 'Real-time telemetry dashboards integrated with custom LLMs for automated business intelligence.',
    fullDescription: 'Power BI dashboards, automated SQL analytics pipelines, and natural language query interfaces for enterprise decision making.',
    iconName: 'BarChart3',
    tag: 'Analytics',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    techStack: ['Power BI', 'Python', 'SQL', 'Pandas', 'DAX'],
    isFeatured: true,
    isVisible: true,
    order: 5,
    createdAt: '2026-01-05T10:00:00.000Z',
    updatedAt: '2026-01-05T10:00:00.000Z',
  },
  {
    id: 'svc_app_dev',
    name: 'App Development',
    shortDescription: 'Cross-platform iOS & Android mobile applications built with React Native and native module performance.',
    fullDescription: 'Smooth 60fps mobile architectures, offline storage, push notifications, and biometric authentication for consumer and business apps.',
    iconName: 'Smartphone',
    tag: 'Mobile',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    techStack: ['React Native', 'Expo', 'iOS', 'Android', 'Redux'],
    isFeatured: true,
    isVisible: true,
    order: 6,
    createdAt: '2026-01-06T10:00:00.000Z',
    updatedAt: '2026-01-06T10:00:00.000Z',
  },
];

export const serviceService = {
  // Async fetch from MongoDB API
  fetchServices: async (): Promise<CMSService[]> => {
    try {
      const response = await apiRequest<{ success: boolean; data: CMSService[] }>('/cms/services');
      if (response.success && Array.isArray(response.data)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        return response.data;
      }
    } catch (err) {
      console.warn('[serviceService] Backend API offline or unreachable, using local cache:', err);
    }
    return serviceService.getServices();
  },

  // Synchronous read with local cache
  getServices: (): CMSService[] => {
    let services: CMSService[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        services = JSON.parse(stored);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultServices));
        services = defaultServices;
      }
    } catch (e) {
      console.error('Failed to parse services from localStorage', e);
      services = defaultServices;
    }
    services.sort((a, b) => (a.order || 0) - (b.order || 0));
    return services;
  },

  getServiceById: (id: string): CMSService | undefined => {
    const services = serviceService.getServices();
    return services.find((s) => s.id === id);
  },

  fetchServiceById: async (id: string): Promise<CMSService | null> => {
    try {
      const res = await apiRequest<{ success: boolean; data: CMSService }>(`/cms/services/${id}`);
      if (res.success && res.data) {
        const services = serviceService.getServices();
        const updated = services.some((s) => s.id === id)
          ? services.map((s) => (s.id === id ? res.data : s))
          : [...services, res.data];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return res.data;
      }
    } catch (err) {
      console.warn('[serviceService] Could not fetch service by ID from server:', err);
    }
    return serviceService.getServiceById(id) || null;
  },

  createService: async (data: Omit<CMSService, 'id' | 'createdAt' | 'updatedAt' | 'order'> & { id?: string; order?: number }): Promise<CMSService> => {
    const services = serviceService.getServices();
    const id = data.id || `svc_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newService: CMSService = {
      ...data,
      id,
      order: data.order ?? (services.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await apiRequest<{ success: boolean; data: CMSService }>('/cms/services', {
        method: 'POST',
        body: JSON.stringify(newService),
      });
      const saved = res.data || newService;
      const updated = [...services.filter((s) => s.id !== id && s.id !== saved.id), saved];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      activityService.logActivity('MD Zaved Akhtar', 'created agency service', saved.name, 'service');
      return saved;
    } catch (err) {
      console.warn('[serviceService] Failed to save service to MongoDB, saved locally:', err);
      const updated = [...services, newService];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      activityService.logActivity('MD Zaved Akhtar', 'created agency service (offline)', newService.name, 'service');
      return newService;
    }
  },

  updateService: async (id: string, updates: Partial<CMSService>): Promise<CMSService | null> => {
    const services = serviceService.getServices();
    const index = services.findIndex((s) => s.id === id);
    const existing = index !== -1 ? services[index] : ({} as CMSService);

    const updatedService: CMSService = {
      ...existing,
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await apiRequest<{ success: boolean; data: CMSService }>(`/cms/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      const saved = res.data || updatedService;
      const updatedList = services.some((s) => s.id === id)
        ? services.map((s) => (s.id === id ? saved : s))
        : [...services, saved];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      activityService.logActivity('MD Zaved Akhtar', 'updated agency service', saved.name || 'Service', 'service');
      return saved;
    } catch (err) {
      console.warn('[serviceService] Failed to update service in MongoDB, updated locally:', err);
      if (index !== -1) {
        services[index] = updatedService;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
      }
      activityService.logActivity('MD Zaved Akhtar', 'updated agency service (offline)', updatedService.name || 'Service', 'service');
      return updatedService;
    }
  },

  deleteService: async (id: string): Promise<boolean> => {
    const services = serviceService.getServices();
    const target = services.find((s) => s.id === id);

    try {
      await apiRequest(`/cms/services/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.warn('[serviceService] Failed to delete service from MongoDB, deleted locally:', err);
    }

    const filtered = services.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    activityService.logActivity('MD Zaved Akhtar', 'deleted agency service', target?.name || id, 'service');
    return true;
  },
};
