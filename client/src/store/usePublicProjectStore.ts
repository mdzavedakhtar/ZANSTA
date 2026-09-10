import { create } from 'zustand';
import { apiRequest } from '../services/api';

export interface PublicProject {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  techStack: string[];
  status: string;
  visibility: string;
  repoUrl?: string;
  demoUrl?: string;
  progress: number;
  coverUrl: string;
  screenshots: string[];
  team: { name: string; avatar: string; role?: string }[];
}

export interface CaseStudy extends PublicProject {
  overview: string;
  problem: string;
  solution: string;
  features: { title: string; desc: string }[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    infrastructure: string;
  };
  seo: {
    title: string;
    description: string;
    openGraphImage: string;
    canonicalUrl: string;
  };
}

interface PublicProjectStore {
  publicProjects: PublicProject[];
  activeCaseStudy: CaseStudy | null;
  clientLinkData: {
    requiresPasscode: boolean;
    viewCount?: number;
    project?: PublicProject & { overview?: string; features?: (string | { title: string; desc: string })[] };
  } | null;
  isPasscodeVerified: boolean;
  isLoading: boolean;
  error: string | null;

  fetchPublicProjects: () => Promise<void>;
  fetchCaseStudyBySlug: (slug: string) => Promise<void>;
  fetchClientLink: (token: string) => Promise<void>;
  verifyPasscode: (token: string, passcode: string) => Promise<boolean>;
  generateClientLink: (projectId: string, passcode?: string, expiresInDays?: number) => Promise<{ url: string; token: string } | null>;
}

export const usePublicProjectStore = create<PublicProjectStore>((set) => ({
  publicProjects: [],
  activeCaseStudy: null,
  clientLinkData: null,
  isPasscodeVerified: false,
  isLoading: false,
  error: null,

  fetchPublicProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiRequest<any>('/projects/public');
      if (res.success) {
        set({ publicProjects: res.projects || [], isLoading: false });
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      // Fallback rich portfolio list for offline standalone mode
      set({
        publicProjects: [
          {
            id: 'proj_caresprint',
            slug: 'caresprint',
            name: 'CareSprint',
            tagline: 'Instant Telehealth & Encrypted Medical Vault',
            description: 'On-demand healthcare platform providing real-time doctor appointments, WebRTC video consultations, encrypted patient records, and instant prescription downloads.',
            category: 'Healthcare SaaS',
            techStack: ['React 18', 'Node.js', 'Socket.IO', 'MongoDB', 'Razorpay', 'WebRTC'],
            status: 'DEVELOPMENT',
            visibility: 'PUBLIC',
            repoUrl: 'https://github.com/nexora/caresprint',
            demoUrl: 'https://caresprint.example.com',
            progress: 85,
            coverUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
            screenshots: [
              'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
              'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200',
              'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200'
            ],
            team: [
              { name: 'MD Zaved Akhtar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
              { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
              { name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
            ]
          },
          {
            id: 'proj_neurostack',
            slug: 'neurostack',
            name: 'NeuroStack AI',
            tagline: 'Autonomous LLM Code Review & Infrastructure Telemetry Engine',
            description: 'Autonomous AI agent platform performing automated Pull Request inspection, security vulnerability scanning, and cloud performance telemetry analysis.',
            category: 'Developer Tool / AI',
            techStack: ['TypeScript', 'Python', 'FastAPI', 'Redis', 'Docker', 'OpenAI'],
            status: 'DEVELOPMENT',
            visibility: 'PUBLIC',
            repoUrl: 'https://github.com/nexora/neurostack-ai',
            demoUrl: 'https://neurostack.example.com',
            progress: 60,
            coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200',
            screenshots: [
              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200',
              'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200'
            ],
            team: [
              { name: 'MD Zaved Akhtar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
              { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }
            ]
          },
          {
            id: 'proj_vortexfin',
            slug: 'vortexfin',
            name: 'VortexFin',
            tagline: 'Institutional Crypto Clearing & Algorithmic Liquidity Hub',
            description: 'Institutional financial trading gateway delivering sub-millisecond crypto order routing, multi-exchange liquidity aggregation, and automated risk compliance reporting.',
            category: 'FinTech Platform',
            techStack: ['Go', 'React 18', 'Kafka', 'PostgreSQL', 'Tailwind CSS'],
            status: 'COMPLETED',
            visibility: 'PUBLIC',
            repoUrl: 'https://github.com/nexora/vortexfin',
            demoUrl: 'https://vortexfin.example.com',
            progress: 100,
            coverUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1200',
            screenshots: [
              'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1200',
              'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200'
            ],
            team: [
              { name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
              { name: 'Aman Deep', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }
            ]
          }
        ],
        isLoading: false
      });
    }
  },

  fetchCaseStudyBySlug: async (slug: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiRequest<any>(`/projects/public/slug/${slug}`);
      if (res.success && res.project) {
        set({ activeCaseStudy: res.project, isLoading: false });
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      // Fallback case study payload
      set({
        activeCaseStudy: {
          id: 'proj_caresprint',
          slug: 'caresprint',
          name: 'CareSprint',
          tagline: 'Instant Telehealth & Encrypted Medical Records Platform',
          description: 'On-demand healthcare platform providing real-time doctor appointments, WebRTC video consultations, encrypted patient records, and instant prescription downloads.',
          category: 'Healthcare SaaS',
          techStack: ['React 18', 'Node.js', 'Socket.IO', 'MongoDB', 'Razorpay', 'WebRTC'],
          status: 'DEVELOPMENT',
          visibility: 'PUBLIC',
          repoUrl: 'https://github.com/nexora/caresprint',
          demoUrl: 'https://caresprint.example.com',
          progress: 85,
          coverUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
          screenshots: [
            'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
            'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200',
            'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200'
          ],
          overview: 'CareSprint is a flagship healthcare SaaS designed and engineered by ZANSTA for modern tele-clinics. It unifies patient onboarding, HD video consultations, HIPAA-compliant medical vault storage, and instant pharmacy prescription dispatching into a seamless glassmorphic interface.',
          problem: 'Legacy healthcare web apps suffer from fragmented user flows, 10+ second video connection latencies, insecure record transfers over unencrypted email, and non-responsive mobile views that cause patient dropoff.',
          solution: 'ZANSTA engineered a zero-latency WebRTC media stream pipeline backed by MongoDB client-side field-level encryption, dynamic appointment scheduling via Socket.IO, and a 60fps responsive React 18 frontend with sub-100ms API response times.',
          features: [
            { title: 'Sub-100ms WebRTC Video Consultations', desc: 'Custom peer-to-peer WebRTC mesh with automated fallback ICE servers ensuring 1080p HD stream stability.' },
            { title: 'HIPAA 256-Bit Encrypted Vault', desc: 'Client-side encrypted file uploads for lab diagnostics, blood work PDFs, and MRI scans.' },
            { title: 'Automated Prescription Dispatch', desc: '1-click digital signature doctor prescriptions with instant QR code verification for pharmacies.' },
            { title: 'Linear-Style Appointment Board', desc: 'Real-time kanban drag & drop dashboard for clinic triage and nurse shift coordination.' }
          ],
          architecture: {
            frontend: 'React 18, TypeScript, Tailwind CSS, Framer Motion, Zustand',
            backend: 'Node.js, Express, Socket.IO Gateway, Redis Session Store',
            database: 'MongoDB Atlas with Client-Side Field Level Encryption (CSFLE)',
            infrastructure: 'Vercel Edge Network, AWS S3 Encrypted Storage Buckets, Cloudflare CDN'
          },
          team: [
            { name: 'MD Zaved Akhtar', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
            { name: 'Elena Rostova', role: 'UI/UX Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
            { name: 'Marcus Vance', role: 'Frontend Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
            { name: 'Sarah Chen', role: 'DevOps Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }
          ],
          seo: {
            title: 'CareSprint Case Study — Build Together. Ship Together. | ZANSTA',
            description: 'Explore how ZANSTA engineered CareSprint: On-demand healthcare platform with WebRTC video consultations and encrypted records.',
            openGraphImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
            canonicalUrl: 'https://zansta.dev/projects/caresprint'
          }
        },
        isLoading: false
      });
    }
  },

  fetchClientLink: async (token: string) => {
    set({ isLoading: true, error: null, isPasscodeVerified: false });
    try {
      const res = await apiRequest<any>(`/client-links/${token}`);
      if (res.success) {
        set({
          clientLinkData: {
            requiresPasscode: res.requiresPasscode,
            viewCount: res.viewCount,
            project: res.project
          },
          isPasscodeVerified: !res.requiresPasscode,
          isLoading: false
        });
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      // Fallback mock payload for client portal
      set({
        clientLinkData: {
          requiresPasscode: false,
          viewCount: 14,
          project: {
            id: 'proj_caresprint',
            slug: 'caresprint',
            name: 'CareSprint',
            tagline: 'Instant Telehealth & Encrypted Medical Records Platform',
            description: 'On-demand healthcare platform providing real-time doctor appointments, WebRTC video consultations, encrypted patient records, and instant prescription downloads.',
            category: 'Healthcare SaaS',
            techStack: ['React 18', 'Node.js', 'Socket.IO', 'MongoDB', 'Razorpay', 'WebRTC'],
            status: 'DEVELOPMENT',
            visibility: 'PUBLIC',
            repoUrl: 'https://github.com/nexora/caresprint',
            demoUrl: 'https://caresprint.example.com',
            progress: 85,
            coverUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
            screenshots: [
              'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
              'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200',
              'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200'
            ],
            features: [
              'Real-time WebRTC 1080p HD Doctor Video Consultations',
              'End-to-End 256-bit Encrypted Medical Records Vault',
              'Instant Razorpay Payment & Digital Prescription PDF Generation',
              'Multi-clinic Appointment Scheduling & Automated SMS Alerts'
            ],
            team: [
              { name: 'MD Zaved Akhtar', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
              { name: 'Elena Rostova', role: 'UI/UX Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
              { name: 'Marcus Vance', role: 'Frontend Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
            ]
          }
        },
        isPasscodeVerified: true,
        isLoading: false
      });
    }
  },

  verifyPasscode: async (token: string, passcode: string) => {
    try {
      const res = await apiRequest<any>(`/client-links/${token}/verify`, {
        method: 'POST',
        body: JSON.stringify({ passcode })
      });
      if (res.success && res.verified) {
        set((state) => ({
          clientLinkData: state.clientLinkData
            ? { ...state.clientLinkData, project: res.project }
            : null,
          isPasscodeVerified: true
        }));
        return true;
      }
      return false;
    } catch (err: any) {
      return false;
    }
  },

  generateClientLink: async (projectId: string, passcode?: string, expiresInDays?: number) => {
    try {
      const res = await apiRequest<any>('/client-links', {
        method: 'POST',
        body: JSON.stringify({ projectId, passcode, expiresInDays })
      });
      if (res.success && res.link) {
        return res.link;
      }
      return null;
    } catch (err: any) {
      const token = 'demo-caresprint-2026';
      return {
        token,
        url: `${window.location.origin}/demo/${token}`
      };
    }
  }
}));
