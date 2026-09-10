import { CMSTeamMember } from '@/types/cms';
import { activityService } from './activityService';

const STORAGE_KEY = 'zansta_cms_team';

const defaultTeamMembers: CMSTeamMember[] = [
  {
    id: 'team_zaved',
    name: 'MD Zaved Akhtar',
    role: 'Full-Stack, AI & Data Analytics Engineer',
    photo: '/zaved.jpg',
    bio: 'Specializing in AI-powered RAG document intelligence platforms, Full-Stack MERN & Next.js architectures, and Data Analytics (Python, SQL, Power BI).',
    fullBio:
      'Full-Stack, AI & Data Analytics Engineer with hands-on expertise building production-grade RAG intelligence platforms, knowledge graphs (Pinecone, Neo4j, Gemini), MERN/Next.js applications, and end-to-end data analytics solutions (Python, SQL, Power BI, DAX, Pandas, NumPy, Machine Learning). Microsoft Azure AI Fundamentals and MSME Data Analytics certified.',
    techStack: ['React', 'Next.js', 'Node.js', 'Python', 'SQL', 'Power BI', 'Generative AI', 'RAG', 'Data Analytics', 'Java', 'TypeScript', 'MongoDB', 'Docker', 'Azure AI'],
    experienceYears: '3+',
    experienceSummary: 'Full-stack, Generative AI & Data Analytics Engineer specializing in RAG document intelligence, business intelligence dashboards, and scalable web platforms.',
    location: 'Bhilai / Delhi NCR, India',
    email: 'mdzavedakhtar620@gmail.com',
    github: 'https://github.com/mdzavedakhtar',
    linkedin: 'https://www.linkedin.com/in/md-zaved-akhtar-22013828b',
    portfolio: 'https://github.com/mdzavedakhtar',
    resumeUrl: '',
    resumeFileName: 'MD_Zaved_Akhtar_Resume.pdf',
    isFeatured: true,
    isVisible: true,
    order: 1,
    createdAt: '2026-01-01T10:00:00.000Z',
    updatedAt: '2026-02-10T12:00:00.000Z',
  },
  {
    id: 'team_rahul',
    name: 'Rahul Sharma',
    role: 'Frontend & Motion Specialist',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    bio: 'Crafting 2026-level web aesthetics, custom magnetic cursors, and fluid Framer Motion animations.',
    fullBio:
      'UI/UX Design Engineer dedicated to pixel-perfect micro-interactions, responsive design systems, and cutting-edge 3D WebGL user interfaces.',
    techStack: ['React 18', 'Framer Motion', 'GSAP', 'Tailwind CSS', 'UI/UX Architecture', 'Three.js'],
    experienceYears: '4+',
    experienceSummary: 'Design systems engineer crafting high-impact agency showcase experiences.',
    location: 'Bangalore, India',
    email: 'rahul@zansta.dev',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    portfolio: 'https://zansta.dev',
    resumeUrl: '',
    resumeFileName: 'Rahul_Sharma_Frontend_Resume.pdf',
    isFeatured: true,
    isVisible: true,
    order: 2,
    createdAt: '2026-01-05T11:00:00.000Z',
    updatedAt: '2026-02-12T15:20:00.000Z',
  },
  {
    id: 'team_aman',
    name: 'Aman Deep',
    role: 'Backend & Real-Time Gateway Engineer',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    bio: 'Engineering Socket.IO streaming event topologies, WebRTC signaling mesh, and secure JWT auth.',
    fullBio:
      'Infrastructure developer focusing on low-latency Socket.IO event gateways, Redis caching, microservices security, and CI/CD pipelines.',
    techStack: ['Node.js', 'Socket.IO', 'Express', 'Docker', 'Security Standards', 'Redis', 'PostgreSQL'],
    experienceYears: '3+',
    experienceSummary: 'Backend engineer specializing in streaming WebRTC signaling and API gateways.',
    location: 'Chandigarh, India',
    email: 'aman@zansta.dev',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    portfolio: 'https://zansta.dev',
    resumeUrl: '',
    resumeFileName: 'Aman_Deep_Backend_Resume.pdf',
    isFeatured: true,
    isVisible: true,
    order: 3,
    createdAt: '2026-01-12T09:30:00.000Z',
    updatedAt: '2026-02-18T10:15:00.000Z',
  },
];

export interface TeamFilterOptions {
  isFeatured?: boolean;
  isVisible?: boolean;
  search?: string;
}

export const teamService = {
  getTeamMembers: (filters?: TeamFilterOptions): CMSTeamMember[] => {
    let members: CMSTeamMember[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        members = JSON.parse(stored);
        // Automatically sync latest Zaved data
        const zavedIdx = members.findIndex(m => m.id === 'team_zaved' || m.id === 'team_sahil' || m.name.toLowerCase().includes('sahil') || m.name.toLowerCase().includes('zaved'));
        if (zavedIdx !== -1) {
          members[zavedIdx] = defaultTeamMembers[0];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
        }
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTeamMembers));
        members = defaultTeamMembers;
      }
    } catch (e) {
      console.error('Failed to parse team members from localStorage', e);
      members = defaultTeamMembers;
    }

    members.sort((a, b) => (a.order || 0) - (b.order || 0));

    if (!filters) return members;

    return members.filter((m) => {
      if (filters.isFeatured !== undefined && m.isFeatured !== filters.isFeatured) return false;
      if (filters.isVisible !== undefined && m.isVisible !== filters.isVisible) return false;
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = m.name.toLowerCase().includes(query);
        const matchesRole = m.role.toLowerCase().includes(query);
        const matchesBio = m.bio.toLowerCase().includes(query);
        const matchesTech = m.techStack.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesRole && !matchesBio && !matchesTech) return false;
      }
      return true;
    });
  },

  getMemberById: (id: string): CMSTeamMember | null => {
    const members = teamService.getTeamMembers();
    return members.find((m) => m.id === id) || null;
  },

  createMember: (data: Omit<CMSTeamMember, 'id' | 'createdAt' | 'updatedAt' | 'order'> & { order?: number }): CMSTeamMember => {
    const members = teamService.getTeamMembers();
    const newMember: CMSTeamMember = {
      ...data,
      id: `team_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      order: data.order ?? (members.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...members, newMember];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    activityService.logActivity('MD Zaved Akhtar', 'added team member', newMember.name, 'team');
    return newMember;
  },

  updateMember: (id: string, updates: Partial<CMSTeamMember>): CMSTeamMember | null => {
    const members = teamService.getTeamMembers();
    const index = members.findIndex((m) => m.id === id);
    if (index === -1) return null;

    const existing = members[index];
    const updatedMember: CMSTeamMember = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    members[index] = updatedMember;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    activityService.logActivity('MD Zaved Akhtar', 'updated team member', updatedMember.name, 'team');
    return updatedMember;
  },

  deleteMember: (id: string): boolean => {
    const members = teamService.getTeamMembers();
    const target = members.find((m) => m.id === id);
    if (!target) return false;

    const filtered = members.filter((m) => m.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    activityService.logActivity('MD Zaved Akhtar', 'deleted team member', target.name, 'team');
    return true;
  },

  reorderMembers: (reorderedMembers: CMSTeamMember[]): void => {
    const updated = reorderedMembers.map((m, idx) => ({
      ...m,
      order: idx + 1,
      updatedAt: new Date().toISOString(),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    activityService.logActivity('MD Zaved Akhtar', 'reordered team members', 'Team Showcase Order', 'team');
  },
};
