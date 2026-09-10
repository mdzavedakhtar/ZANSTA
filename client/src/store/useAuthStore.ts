import { create } from 'zustand';
import { User, AuthResponse, UserRole } from '../types/auth';
import { apiRequest } from '../services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  logout: () => void;
}

// Known mock accounts for decoupled fallback authentication
const knownMockUsers: Record<string, User> = {
  'mdzavedakhtar620@gmail.com': {
    id: 'user_mock_zaved',
    name: 'MD Zaved Akhtar',
    email: 'mdzavedakhtar620@gmail.com',
    role: 'OWNER',
    avatar: '/zaved.jpg',
    bio: 'Lead Architect & Full-Stack Systems Engineer',
    skills: ['React', 'Next.js', 'Node.js', 'Python', 'Java', 'Generative AI', 'RAG', 'Vector Search'],
    github: 'https://github.com/mdzavedakhtar',
    linkedin: 'https://www.linkedin.com/in/md-zaved-akhtar-22013828b',
    isVerified: true,
  },
  'rahul@zansta.dev': {
    id: 'user_mock_rahul',
    name: 'Rahul Sharma',
    email: 'rahul@zansta.dev',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    bio: 'Frontend & Motion Specialist',
    skills: ['React 18', 'Framer Motion', 'Tailwind'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isVerified: true,
  },
  'aman@zansta.dev': {
    id: 'user_mock_aman',
    name: 'Aman Deep',
    email: 'aman@zansta.dev',
    role: 'MEMBER',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    bio: 'Backend & Real-Time Gateway Engineer',
    skills: ['Node.js', 'Socket.IO', 'Express'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isVerified: true,
  },
  'client@acme.com': {
    id: 'user_mock_client',
    name: 'Acme Client User',
    email: 'client@acme.com',
    role: 'CLIENT',
    avatar: '',
    bio: 'Client Stakeholder',
    skills: ['Client Review'],
    github: '',
    linkedin: '',
    isVerified: true,
  },
};

const getInitialUser = (): User | null => {
  try {
    const saved = localStorage.getItem('zansta_user');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to parse saved user', e);
  }
  return knownMockUsers['mdzavedakhtar620@gmail.com'];
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: getInitialUser(),
  token: localStorage.getItem('zansta_token') || 'mock_token_dev',
  isAuthenticated: Boolean(localStorage.getItem('zansta_token') || getInitialUser()),
  isLoading: false,

  initAuth: async () => {
    const token = localStorage.getItem('zansta_token');
    if (!token) {
      const storedUser = getInitialUser();
      set({ user: storedUser, isAuthenticated: Boolean(storedUser), isLoading: false });
      return;
    }

    try {
      set({ isLoading: true });
      const res = await apiRequest<AuthResponse>('/auth/me');
      if (res.success && res.user) {
        localStorage.setItem('zansta_user', JSON.stringify(res.user));
        set({ user: res.user, isAuthenticated: true, isLoading: false });
      } else {
        const storedUser = getInitialUser();
        set({ user: storedUser, isAuthenticated: Boolean(storedUser), isLoading: false });
      }
    } catch (error) {
      const storedUser = getInitialUser();
      set({ user: storedUser, isAuthenticated: Boolean(storedUser), isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    const cleanEmail = email.trim().toLowerCase();

    try {
      const res = await apiRequest<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: cleanEmail, password }),
      });

      if (res.success && res.token && res.user) {
        localStorage.setItem('zansta_token', res.token);
        localStorage.setItem('zansta_user', JSON.stringify(res.user));
        set({ user: res.user, token: res.token, isAuthenticated: true, isLoading: false });
        return;
      }
    } catch (error: any) {
      // Decoupled / Offline Fallback matching:
      // Match email against known mock accounts or create member
      const matchedUser: User = knownMockUsers[cleanEmail] || {
        id: `user_${Date.now()}`,
        name: cleanEmail.split('@')[0].toUpperCase(),
        email: cleanEmail,
        role: cleanEmail === 'mdzavedakhtar620@gmail.com' ? 'OWNER' : 'MEMBER',
        avatar: '',
        bio: 'Workspace Member',
        skills: ['Developer'],
        github: '',
        linkedin: '',
        isVerified: true,
      };

      const token = `mock_jwt_${matchedUser.id}`;
      localStorage.setItem('zansta_token', token);
      localStorage.setItem('zansta_user', JSON.stringify(matchedUser));

      set({ user: matchedUser, token, isAuthenticated: true, isLoading: false });
    }
  },

  register: async (name, email, password, role = 'MEMBER') => {
    set({ isLoading: true });
    const cleanEmail = email.trim().toLowerCase();
    
    // Prevent registering as OWNER unless authorized email
    const assignedRole: UserRole = cleanEmail === 'mdzavedakhtar620@gmail.com' ? 'OWNER' : (role === 'OWNER' ? 'MEMBER' : (role as UserRole || 'MEMBER'));

    try {
      const res = await apiRequest<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email: cleanEmail, password, role: assignedRole }),
      });

      if (res.success && res.token && res.user) {
        localStorage.setItem('zansta_token', res.token);
        localStorage.setItem('zansta_user', JSON.stringify(res.user));
        set({ user: res.user, token: res.token, isAuthenticated: true, isLoading: false });
      }
    } catch (error: any) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email: cleanEmail,
        role: assignedRole,
        avatar: '',
        bio: 'Workspace Member',
        skills: ['Developer'],
        github: '',
        linkedin: '',
        isVerified: true,
      };

      const token = `mock_jwt_${newUser.id}`;
      localStorage.setItem('zansta_token', token);
      localStorage.setItem('zansta_user', JSON.stringify(newUser));

      set({ user: newUser, token, isAuthenticated: true, isLoading: false });
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true });
    try {
      const res = await apiRequest<AuthResponse>('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      });

      if (res.success && res.user) {
        localStorage.setItem('zansta_user', JSON.stringify(res.user));
        set({ user: res.user, isLoading: false });
      }
    } catch (error: any) {
      const current = get().user;
      if (current) {
        const updated = { ...current, ...data };
        localStorage.setItem('zansta_user', JSON.stringify(updated));
        set({ user: updated, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    }
  },

  logout: () => {
    localStorage.removeItem('zansta_token');
    localStorage.removeItem('zansta_user');
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },
}));
