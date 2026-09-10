import { CMSService } from '@/types/cms';
import { activityService } from './activityService';

const STORAGE_KEY = 'zansta_cms_services';

const defaultServices: CMSService[] = [
  {
    id: 'svc_fullstack',
    name: 'Full-Stack Development',
    shortDescription: 'Enterprise Node.js, React, and MongoDB application architectures.',
    fullDescription: 'Custom web application engineering with real-time WebSocket communication, microservices infrastructure, and responsive modern user interfaces.',
    iconName: 'Code2',
    techStack: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Express'],
    isFeatured: true,
    isVisible: true,
    order: 1,
    createdAt: '2026-01-01T10:00:00.000Z',
    updatedAt: '2026-01-01T10:00:00.000Z',
  },
  {
    id: 'svc_ai',
    name: 'AI & Generative AI',
    shortDescription: 'Autonomous AI agent workflows, vector search, and LLM integrations.',
    fullDescription: 'Production-ready AI agent pipelines, custom RAG architecture, vector database indexing, and automated multi-modal task execution systems.',
    iconName: 'Sparkles',
    techStack: ['Python', 'FastAPI', 'Pinecone', 'LangChain', 'OpenAI'],
    isFeatured: true,
    isVisible: true,
    order: 2,
    createdAt: '2026-01-02T10:00:00.000Z',
    updatedAt: '2026-01-02T10:00:00.000Z',
  },
  {
    id: 'svc_uiux',
    name: 'UI/UX Engineering',
    shortDescription: 'Dark-mode aesthetics, custom motion micro-interactions, and 3D web design.',
    fullDescription: 'Premium agency UI design with Framer Motion transitions, GSAP animations, custom design token libraries, and high-performance WebGL visuals.',
    iconName: 'Layout',
    techStack: ['Framer Motion', 'Tailwind CSS', 'Three.js', 'Figma'],
    isFeatured: true,
    isVisible: true,
    order: 3,
    createdAt: '2026-01-03T10:00:00.000Z',
    updatedAt: '2026-01-03T10:00:00.000Z',
  },
  {
    id: 'svc_saas',
    name: 'SaaS Development',
    shortDescription: 'Multi-tenant SaaS products with auth, subscription billing, and telemetry.',
    fullDescription: 'End-to-end SaaS architecture with RBAC permissions, Stripe/Razorpay billing, usage analytics, and automated deployment pipelines.',
    iconName: 'Layers',
    techStack: ['Next.js', 'PostgreSQL', 'Stripe', 'Docker'],
    isFeatured: true,
    isVisible: true,
    order: 4,
    createdAt: '2026-01-04T10:00:00.000Z',
    updatedAt: '2026-01-04T10:00:00.000Z',
  },
];

export const serviceService = {
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

  getServiceById: (id: string): CMSService | null => {
    const services = serviceService.getServices();
    return services.find((s) => s.id === id) || null;
  },

  createService: (data: Omit<CMSService, 'id' | 'createdAt' | 'updatedAt' | 'order'> & { order?: number }): CMSService => {
    const services = serviceService.getServices();
    const newService: CMSService = {
      ...data,
      id: `svc_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      order: data.order ?? (services.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...services, newService];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    activityService.logActivity('MD Zaved Akhtar', 'created agency service', newService.name, 'service');
    return newService;
  },

  updateService: (id: string, updates: Partial<CMSService>): CMSService | null => {
    const services = serviceService.getServices();
    const index = services.findIndex((s) => s.id === id);
    if (index === -1) return null;

    const existing = services[index];
    const updatedService: CMSService = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    services[index] = updatedService;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    activityService.logActivity('MD Zaved Akhtar', 'updated agency service', updatedService.name, 'service');
    return updatedService;
  },

  deleteService: (id: string): boolean => {
    const services = serviceService.getServices();
    const target = services.find((s) => s.id === id);
    if (!target) return false;

    const filtered = services.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    activityService.logActivity('MD Zaved Akhtar', 'deleted agency service', target.name, 'service');
    return true;
  },
};
