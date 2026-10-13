import { CMSTeamMember } from '@/types/cms';
import { apiRequest } from './api';
import { activityService } from './activityService';
import { generateZavedResumePdfBase64 } from '@/utils/generateZavedResume';
import { safeStorage } from '@/lib/safeStorage';

const STORAGE_KEY = 'zansta_cms_team';

export const defaultTeamMembers: CMSTeamMember[] = [
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
    email: 'mdzavedakhtar62@gmail.com',
    github: 'https://github.com/mdzavedakhtar',
    linkedin: 'https://www.linkedin.com/in/md-zaved-akhtar-22013828b',
    portfolio: 'https://github.com/mdzavedakhtar',
    resumeUrl: generateZavedResumePdfBase64(),
    resumeFileName: 'MD_Zaved_Akhtar_Resume.pdf',
    isFeatured: true,
    isVisible: true,
    order: 1,
    createdAt: '2026-01-01T10:00:00.000Z',
    updatedAt: '2026-02-10T12:00:00.000Z',
  },
];

export interface TeamFilterOptions {
  isFeatured?: boolean;
  isVisible?: boolean;
  search?: string;
}

export const teamService = {
  // Async fetch from MongoDB API
  fetchTeamMembers: async (filters?: TeamFilterOptions): Promise<CMSTeamMember[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.isFeatured !== undefined) params.append('isFeatured', String(filters.isFeatured));
      if (filters?.isVisible !== undefined) params.append('isVisible', String(filters.isVisible));
      if (filters?.search) params.append('search', filters.search);

      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await apiRequest<{ success: boolean; data: CMSTeamMember[] }>(`/cms/team${queryString}`);
      if (response.success && Array.isArray(response.data)) {
        // Cleanly store exact server data without reviving deleted members
        if (!filters || Object.keys(filters).length === 0) {
          safeStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        }
        return response.data;
      }
    } catch {
      // Silently fall back to local cache
    }
    return teamService.getTeamMembers(filters);
  },

  // Synchronous read with local cache
  getTeamMembers: (filters?: TeamFilterOptions): CMSTeamMember[] => {
    let members: CMSTeamMember[] = [];
    try {
      const stored = safeStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        members = JSON.parse(stored);
      } else {
        safeStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTeamMembers));
        members = defaultTeamMembers;
      }
    } catch (e) {
      console.error('Failed to parse team members from storage', e);
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

  fetchMemberById: async (id: string): Promise<CMSTeamMember | null> => {
    try {
      const res = await apiRequest<{ success: boolean; data: CMSTeamMember }>(`/cms/team/${id}`);
      if (res.success && res.data) {
        const members = teamService.getTeamMembers();
        const updated = members.some((m) => m.id === id)
          ? members.map((m) => (m.id === id ? res.data : m))
          : [...members, res.data];
        safeStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return res.data;
      }
    } catch {
      // Silent
    }
    return teamService.getMemberById(id);
  },

  createMember: async (data: Omit<CMSTeamMember, 'id' | 'createdAt' | 'updatedAt' | 'order'> & { order?: number }): Promise<CMSTeamMember> => {
    const members = teamService.getTeamMembers();
    const id = `team_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newMember: CMSTeamMember = {
      ...data,
      id,
      order: data.order ?? (members.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let resultMember = newMember;
    try {
      const res = await apiRequest<{ success: boolean; data: CMSTeamMember }>('/cms/team', {
        method: 'POST',
        body: JSON.stringify(newMember),
      });
      if (res.data) {
        resultMember = res.data;
      }
      activityService.logActivity('MD Zaved Akhtar', 'added team member', resultMember.name, 'team');
    } catch (apiErr) {
      console.warn('Backend API create failed, saving locally:', apiErr);
      activityService.logActivity('MD Zaved Akhtar', 'added team member (offline)', newMember.name, 'team');
    }

    try {
      const updated = [...members.filter((m) => m.id !== id && m.id !== resultMember.id), resultMember];
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (storageErr) {
      console.warn('safeStorage cache write skipped:', storageErr);
    }

    return resultMember;
  },

  updateMember: async (id: string, updates: Partial<CMSTeamMember>): Promise<CMSTeamMember | null> => {
    const members = teamService.getTeamMembers();
    const index = members.findIndex((m) => m.id === id);
    const existing = index !== -1 ? members[index] : ({} as CMSTeamMember);

    const updatedMember: CMSTeamMember = {
      ...existing,
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };

    let resultMember = updatedMember;
    try {
      const res = await apiRequest<{ success: boolean; data: CMSTeamMember }>(`/cms/team/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      if (res.data) {
        resultMember = res.data;
      }
      activityService.logActivity('MD Zaved Akhtar', 'updated team member', resultMember.name || 'Member', 'team');
    } catch (apiErr) {
      console.warn('Backend API update failed, saving locally:', apiErr);
      activityService.logActivity('MD Zaved Akhtar', 'updated team member (offline)', updatedMember.name || 'Member', 'team');
    }

    try {
      const updatedList = members.some((m) => m.id === id)
        ? members.map((m) => (m.id === id ? resultMember : m))
        : [...members, resultMember];
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (storageErr) {
      console.warn('safeStorage cache write skipped:', storageErr);
    }

    return resultMember;
  },

  deleteMember: async (id: string): Promise<boolean> => {
    const members = teamService.getTeamMembers();
    const target = members.find((m) => m.id === id);

    try {
      await apiRequest(`/cms/team/${id}`, {
        method: 'DELETE',
      });
    } catch {
      // Silent
    }

    try {
      const filtered = members.filter((m) => m.id !== id);
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      activityService.logActivity('MD Zaved Akhtar', 'deleted team member', target?.name || id, 'team');
    } catch (storageErr) {
      console.warn('safeStorage delete skipped:', storageErr);
    }
    return true;
  },

  reorderMembers: async (reorderedMembers: CMSTeamMember[]): Promise<void> => {
    const updated = reorderedMembers.map((m, idx) => ({
      ...m,
      order: idx + 1,
      updatedAt: new Date().toISOString(),
    }));

    try {
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      activityService.logActivity('MD Zaved Akhtar', 'reordered team members', 'Team Showcase Order', 'team');
    } catch (storageErr) {
      console.warn('safeStorage reorder skipped:', storageErr);
    }

    try {
      await apiRequest('/cms/team/reorder', {
        method: 'PUT',
        body: JSON.stringify({ members: updated }),
      });
    } catch {
      // Silent
    }
  },
};
