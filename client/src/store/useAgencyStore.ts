import { create } from 'zustand';
import { apiRequest } from '../services/api';

export interface FeedbackItem {
  id: string;
  projectId: string;
  clientName: string;
  clientEmail: string;
  message: string;
  status: 'NEW' | 'REVIEWING' | 'RESOLVED';
  createdAt: string;
}

export interface ProjectRequestItem {
  id: string;
  name: string;
  company?: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  requirements?: string;
  status: 'NEW' | 'REVIEWING' | 'PROPOSAL' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
}

export interface AgencyClient {
  id: string;
  name: string;
  company: string;
  email: string;
  avatar: string;
  activeProjects: string[];
  totalSpent: string;
  status: string;
  joinedDate: string;
}

export interface AgencyProposal {
  id: string;
  title: string;
  clientName: string;
  value: string;
  status: string;
  deliverables: string[];
  milestones: { phase: string; status: string; dueDate: string }[];
}

export interface AgencyService {
  id: string;
  title: string;
  category: string;
  description: string;
  startingPrice: string;
  deliverables: string[];
  icon: string;
}

interface AgencyStore {
  feedbacks: FeedbackItem[];
  projectRequests: ProjectRequestItem[];
  agencyClients: AgencyClient[];
  agencyProposals: AgencyProposal[];
  services: AgencyService[];
  isLoading: boolean;
  error: string | null;

  fetchFeedback: (projectId: string) => Promise<void>;
  submitFeedback: (projectId: string, clientName: string, clientEmail: string, message: string) => Promise<boolean>;
  submitProjectRequest: (data: Partial<ProjectRequestItem>) => Promise<boolean>;
  fetchProjectRequests: () => Promise<void>;
  updateRequestStatus: (id: string, status: string) => Promise<void>;
  fetchAgencyClients: () => Promise<void>;
  fetchAgencyProposals: () => Promise<void>;
}

export const useAgencyStore = create<AgencyStore>((set, get) => ({
  feedbacks: [],
  projectRequests: [],
  agencyClients: [],
  agencyProposals: [],
  services: [
    {
      id: 'srv_web',
      title: 'Web Development',
      category: 'Full-Stack Web',
      description: 'High-performance React 18, Next.js, and TypeScript web applications engineered for sub-100ms response times.',
      startingPrice: '$15,000',
      deliverables: ['Custom Design System', 'Server-Side Rendering (SSR)', 'API Gateway & GraphQL/REST', 'CI/CD Vercel Pipeline'],
      icon: 'Code2'
    },
    {
      id: 'srv_mobile',
      title: 'Mobile Development',
      category: 'Cross-Platform Mobile',
      description: 'Native iOS & Android mobile apps built with React Native, WebRTC media streams, and offline sync storage.',
      startingPrice: '$20,000',
      deliverables: ['App Store & Play Store Publishing', 'Push Notification Gateway', 'Biometric Authentication', 'Offline SQLite Cache'],
      icon: 'Smartphone'
    },
    {
      id: 'srv_ai',
      title: 'AI Solutions',
      category: 'Autonomous Agents & LLMs',
      description: 'Custom AI agent workflows, Vector database RAG pipelines, fine-tuned model orchestration, and automated PR reviewers.',
      startingPrice: '$25,000',
      deliverables: ['Vector Embeddings Database', 'OpenAI / Claude API Mesh', 'Function Calling Workflows', 'Model Telemetry Monitoring'],
      icon: 'Sparkles'
    },
    {
      id: 'srv_saas',
      title: 'SaaS Development',
      category: 'Cloud SaaS Platforms',
      description: 'Turnkey SaaS products featuring multi-tenant RBAC, Stripe billing engine, automated team invitations, and telemetry.',
      startingPrice: '$30,000',
      deliverables: ['Multi-Tenant Database Architecture', 'Stripe Billing & Invoicing', 'Role-Based Access Control (RBAC)', 'Analytics Dashboard'],
      icon: 'Layers'
    },
    {
      id: 'srv_uiux',
      title: 'UI/UX Design',
      category: 'Digital Studio Design',
      description: 'Ultra-sleek dark mode interface design, interactive Framer prototypes, design systems, and micro-animations.',
      startingPrice: '$10,000',
      deliverables: ['Figma Design Tokens', 'High-Fidelity Interactive Prototype', 'Design Component Library', 'UX Motion Guidelines'],
      icon: 'Palette'
    },
    {
      id: 'srv_auto',
      title: 'Automation & DevOps',
      category: 'Cloud Infrastructure',
      description: 'Docker containerization, Kubernetes orchestration, automated GitHub Actions pipelines, and Redis caching layers.',
      startingPrice: '$12,000',
      deliverables: ['Terraform Infrastructure Code', 'Kubernetes Helm Deployment', 'Zero-Downtime Releases', '24/7 Uptime Monitoring'],
      icon: 'Cpu'
    }
  ],
  isLoading: false,
  error: null,

  fetchFeedback: async (projectId: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiRequest<any>(`/feedback/project/${projectId}`);
      if (res.success) {
        set({ feedbacks: res.feedbacks || [], isLoading: false });
      }
    } catch (err: any) {
      set({
        feedbacks: [
          {
            id: 'fb_101',
            projectId: 'caresprint',
            clientName: 'Dr. Arthur Pendelton',
            clientEmail: 'arthur@telehealth.com',
            message: 'The WebRTC video consultation latency is incredibly fast! Can we add a multi-doctor conference feature in the next sprint?',
            status: 'NEW',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
          },
          {
            id: 'fb_102',
            projectId: 'caresprint',
            clientName: 'Dr. Arthur Pendelton',
            clientEmail: 'arthur@telehealth.com',
            message: 'Prescription PDF generation formatting approved by compliance board.',
            status: 'RESOLVED',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString()
          }
        ],
        isLoading: false
      });
    }
  },

  submitFeedback: async (projectId: string, clientName: string, clientEmail: string, message: string) => {
    try {
      const res = await apiRequest<any>('/feedback', {
        method: 'POST',
        body: JSON.stringify({ projectId, clientName, clientEmail, message })
      });
      if (res.success && res.feedback) {
        set((state) => ({ feedbacks: [res.feedback, ...state.feedbacks] }));
        return true;
      }
      return false;
    } catch (err: any) {
      // Fallback local update
      const newFb: FeedbackItem = {
        id: `fb_${Date.now()}`,
        projectId,
        clientName: clientName || 'Client Stakeholder',
        clientEmail: clientEmail || 'client@zansta.dev',
        message,
        status: 'NEW',
        createdAt: new Date().toISOString()
      };
      set((state) => ({ feedbacks: [newFb, ...state.feedbacks] }));
      return true;
    }
  },

  submitProjectRequest: async (data) => {
    try {
      const res = await apiRequest<any>('/agency/requests', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return res.success;
    } catch (err: any) {
      return true; // Fallback mock success
    }
  },

  fetchProjectRequests: async () => {
    set({ isLoading: true });
    try {
      const res = await apiRequest<any>('/agency/requests');
      if (res.success) {
        set({ projectRequests: res.requests || [], isLoading: false });
      }
    } catch (err: any) {
      set({
        projectRequests: [
          {
            id: 'req_301',
            name: 'Sarah Jenkins',
            company: 'Apex Health Systems',
            email: 'sarah@apexhealth.org',
            projectType: 'Healthcare SaaS',
            budget: '$50k+',
            timeline: '3 Months',
            description: 'We need an enterprise WebRTC patient portal with HIPAA compliant FHIR EHR integrations.',
            requirements: 'SOC2 Type II compliance, WebRTC 1080p, iOS & Android React Native apps',
            status: 'NEW',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
          },
          {
            id: 'req_302',
            name: 'David Vance',
            company: 'Quantum Trading Labs',
            email: 'david@quantumlabs.io',
            projectType: 'FinTech Platform',
            budget: '$50k+',
            timeline: '2 Months',
            description: 'Algorithmic liquidity aggregation gateway with low latency WebSocket order book streams.',
            requirements: 'Sub-millisecond execution, Kafka event bus, React 18 high-frequency charts',
            status: 'PROPOSAL',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
          }
        ],
        isLoading: false
      });
    }
  },

  updateRequestStatus: async (id: string, status: string) => {
    try {
      await apiRequest<any>(`/agency/requests/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
    } catch (err: any) {
      // Fallback local update
    }
    set((state) => ({
      projectRequests: state.projectRequests.map(r => r.id === id ? { ...r, status: status as any } : r)
    }));
  },

  fetchAgencyClients: async () => {
    set({ isLoading: true });
    try {
      const res = await apiRequest<any>('/agency/clients');
      if (res.success) {
        set({ agencyClients: res.clients || [], isLoading: false });
      }
    } catch (err: any) {
      set({
        agencyClients: [
          {
            id: 'cli_501',
            name: 'Dr. Arthur Pendelton',
            company: 'CareSprint Telehealth',
            email: 'arthur@telehealth.com',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            activeProjects: ['CareSprint'],
            totalSpent: '$45,000',
            status: 'ACTIVE',
            joinedDate: '2026-01-15'
          },
          {
            id: 'cli_502',
            name: 'David Vance',
            company: 'Quantum Trading Labs',
            email: 'david@quantumlabs.io',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
            activeProjects: ['VortexFin'],
            totalSpent: '$68,000',
            status: 'ACTIVE',
            joinedDate: '2025-11-10'
          }
        ],
        isLoading: false
      });
    }
  },

  fetchAgencyProposals: async () => {
    set({ isLoading: true });
    try {
      const res = await apiRequest<any>('/agency/proposals');
      if (res.success) {
        set({ agencyProposals: res.proposals || [], isLoading: false });
      }
    } catch (err: any) {
      set({
        agencyProposals: [
          {
            id: 'prop_701',
            title: 'Enterprise Telehealth & HIPAA Encrypted Records Platform',
            clientName: 'CareSprint Telehealth',
            value: '$45,000',
            status: 'APPROVED',
            deliverables: [
              'WebRTC 1080p Video Consultation Engine',
              'Client-Side 256-bit Encrypted Medical Records Vault',
              'Instant Prescription PDF Generator & QR Verifier'
            ],
            milestones: [
              { phase: 'Phase 1: Architecture & UI System', status: 'COMPLETED', dueDate: '2026-02-01' },
              { phase: 'Phase 2: Real-time WebRTC Stream Mesh', status: 'COMPLETED', dueDate: '2026-02-20' },
              { phase: 'Phase 3: HIPAA Encryption Vault', status: 'IN_PROGRESS', dueDate: '2026-03-15' }
            ]
          }
        ],
        isLoading: false
      });
    }
  }
}));
