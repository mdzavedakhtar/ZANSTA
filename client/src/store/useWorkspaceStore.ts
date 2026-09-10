import { create } from 'zustand';
import { apiRequest } from '../services/api';
import { UserRole } from '../types/auth';

export interface MemberItem {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: string;
  skills: string[];
  joinedAt: string;
}

export interface WorkspaceOverview {
  id: string;
  name: string;
  slug: string;
  metrics: {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    teamMembers: number;
    pendingTasks: number;
    githubSyncRate: string;
  };
}

interface WorkspaceState {
  workspace: WorkspaceOverview | null;
  members: MemberItem[];
  isLoading: boolean;
  fetchWorkspace: () => Promise<void>;
  fetchMembers: () => Promise<void>;
  createInvitation: (email: string, role: UserRole) => Promise<{ inviteUrl: string; token: string }>;
  updateRole: (memberId: string, role: UserRole) => Promise<void>;
  updateMember: (memberId: string, updates: Partial<MemberItem>) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
}

const defaultMembers: MemberItem[] = [
  { id: '1', name: 'MD Zaved Akhtar', email: 'mdzavedakhtar620@gmail.com', role: 'OWNER', status: 'Active', skills: ['React', 'Next.js', 'Node.js', 'Generative AI', 'Python', 'Java', 'RAG'], joinedAt: '2026-01-01' },
  { id: '2', name: 'Rahul Sharma', email: 'rahul@zansta.dev', role: 'ADMIN', status: 'Active', skills: ['React 18', 'Framer Motion', 'Tailwind'], joinedAt: '2026-01-05' },
  { id: '3', name: 'Aman Deep', email: 'aman@zansta.dev', role: 'MEMBER', status: 'Active', skills: ['Node.js', 'Socket.IO', 'Express'], joinedAt: '2026-01-10' },
  { id: '4', name: 'Acme Client User', email: 'client@acme.com', role: 'CLIENT', status: 'Invited', skills: ['Client Review'], joinedAt: '2026-02-01' },
];

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspace: {
    id: 'ws_zansta_core',
    name: 'Zansta Core Team',
    slug: 'zansta-core',
    metrics: {
      totalProjects: 12,
      activeProjects: 8,
      completedProjects: 4,
      teamMembers: 4,
      pendingTasks: 28,
      githubSyncRate: '99.8%',
    },
  },
  members: defaultMembers,
  isLoading: false,

  fetchWorkspace: async () => {
    try {
      set({ isLoading: true });
      const res = await apiRequest('/workspaces/current');
      if (res.success && res.workspace) {
        set({ workspace: res.workspace, isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },

  fetchMembers: async () => {
    try {
      set({ isLoading: true });
      const res = await apiRequest('/workspaces/current/members');
      if (res.success && res.members) {
        set({ members: res.members, isLoading: false });
      }
    } catch {
      set({ members: defaultMembers, isLoading: false });
    }
  },

  createInvitation: async (email, role) => {
    try {
      const res = await apiRequest('/workspaces/current/invite', {
        method: 'POST',
        body: JSON.stringify({ email, role }),
      });
      return { inviteUrl: res.invitation.inviteUrl, token: res.invitation.token };
    } catch (error: any) {
      // Fallback generator if offline
      const token = Math.random().toString(36).substring(2, 15);
      const inviteUrl = `${window.location.origin}/invite/${token}`;
      
      const newMember: MemberItem = {
        id: `m_${Date.now()}`,
        name: email.split('@')[0].toUpperCase(),
        email,
        role,
        status: 'Invited',
        skills: ['Pending Join'],
        joinedAt: new Date().toISOString(),
      };
      set({ members: [...get().members, newMember] });

      return { inviteUrl, token };
    }
  },

  updateRole: async (memberId, role) => {
    try {
      const res = await apiRequest(`/workspaces/current/members/${memberId}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role }),
      });
      if (res.success && res.members) {
        set({ members: res.members });
      }
    } catch {
      set({
        members: get().members.map((m) => (m.id === memberId ? { ...m, role } : m)),
      });
    }
  },

  updateMember: async (memberId, updates) => {
    try {
      const res = await apiRequest(`/workspaces/current/members/${memberId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      if (res.success && res.members) {
        set({ members: res.members });
      } else {
        set({
          members: get().members.map((m) => (m.id === memberId ? { ...m, ...updates } : m)),
        });
      }
    } catch {
      set({
        members: get().members.map((m) => (m.id === memberId ? { ...m, ...updates } : m)),
      });
    }
  },

  removeMember: async (memberId) => {
    try {
      const res = await apiRequest(`/workspaces/current/members/${memberId}`, {
        method: 'DELETE',
      });
      if (res.success && res.members) {
        set({ members: res.members });
      }
    } catch {
      set({ members: get().members.filter((m) => m.id !== memberId) });
    }
  },
}));
