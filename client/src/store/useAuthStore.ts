import { create } from 'zustand';
import { User, AuthResponse } from '../types/auth';
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

// Default mock user for offline fallback session
const defaultMockUser: User = {
  id: 'user_mock_zaved',
  name: 'MD Zaved Akhtar',
  email: 'mdzavedakhtar620@gmail.com',
  role: 'OWNER',
  avatar: '/zaved.jpg',
  bio: 'Full-Stack & AI Systems Engineer',
  skills: ['React', 'Next.js', 'Node.js', 'Python', 'Java', 'Generative AI', 'RAG', 'Vector Search'],
  github: 'https://github.com/mdzavedakhtar',
  linkedin: 'https://www.linkedin.com/in/md-zaved-akhtar-22013828b',
  isVerified: true,
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: defaultMockUser,
  token: localStorage.getItem('zansta_token') || 'mock_token_dev',
  isAuthenticated: true, // Default to authenticated in dev MVP so UI works out of the box
  isLoading: false,

  initAuth: async () => {
    const token = localStorage.getItem('zansta_token');
    if (!token) {
      set({ user: defaultMockUser, isAuthenticated: true, isLoading: false });
      return;
    }

    try {
      set({ isLoading: true });
      const res = await apiRequest<AuthResponse>('/auth/me');
      if (res.success && res.user) {
        set({ user: res.user, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: defaultMockUser, isAuthenticated: true, isLoading: false });
      }
    } catch (error) {
      // Fall back to default session if server offline
      set({ user: defaultMockUser, isAuthenticated: true, isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await apiRequest<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (res.success && res.token && res.user) {
        localStorage.setItem('zansta_token', res.token);
        set({ user: res.user, token: res.token, isAuthenticated: true, isLoading: false });
      }
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.message || 'Failed to sign in');
    }
  },

  register: async (name, email, password, role = 'MEMBER') => {
    set({ isLoading: true });
    try {
      const res = await apiRequest<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role }),
      });

      if (res.success && res.token && res.user) {
        localStorage.setItem('zansta_token', res.token);
        set({ user: res.user, token: res.token, isAuthenticated: true, isLoading: false });
      }
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.message || 'Registration failed');
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
        set({ user: res.user, isLoading: false });
      }
    } catch (error: any) {
      // Fallback local state update if offline
      const current = get().user;
      if (current) {
        set({ user: { ...current, ...data }, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    }
  },

  logout: () => {
    localStorage.removeItem('zansta_token');
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },
}));
