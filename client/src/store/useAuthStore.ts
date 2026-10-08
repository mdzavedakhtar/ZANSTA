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
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  logout: () => void;
}

const getInitialUser = (): User | null => {
  try {
    const saved = localStorage.getItem('zansta_user');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to parse saved user', e);
  }
  return null;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: getInitialUser(),
  token: localStorage.getItem('zansta_token') || null,
  isAuthenticated: Boolean(localStorage.getItem('zansta_token') && getInitialUser()),
  isLoading: false,

  initAuth: async () => {
    const token = localStorage.getItem('zansta_token');
    if (!token) {
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      set({ isLoading: true });
      const res = await apiRequest<AuthResponse>('/auth/me');
      if (res.success && res.user) {
        localStorage.setItem('zansta_user', JSON.stringify(res.user));
        set({ user: res.user, isAuthenticated: true, isLoading: false });
      } else {
        localStorage.removeItem('zansta_token');
        localStorage.removeItem('zansta_user');
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      const storedUser = getInitialUser();
      if (storedUser && token) {
        set({ user: storedUser, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      }
    }
  },

  login: async (email: string, password: string) => {
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
      } else {
        set({ isLoading: false });
        throw new Error(res.message || 'Login failed. Please check your credentials.');
      }
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.message || 'Invalid email or password. Please verify your credentials.');
    }
  },

  register: async (name: string, email: string, password: string, role = 'MEMBER') => {
    set({ isLoading: true });
    const cleanEmail = email.trim().toLowerCase();

    try {
      const res = await apiRequest<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email: cleanEmail, password, role }),
      });

      if (res.success && res.token && res.user) {
        localStorage.setItem('zansta_token', res.token);
        localStorage.setItem('zansta_user', JSON.stringify(res.user));
        set({ user: res.user, token: res.token, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
        throw new Error(res.message || 'Registration failed');
      }
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.message || 'Registration failed. Please try again.');
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

  updatePassword: async (currentPassword, newPassword) => {
    set({ isLoading: true });
    try {
      await apiRequest('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify({ currentPassword, password: newPassword }),
      });
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.message || 'Failed to update password');
    }
  },

  logout: () => {
    localStorage.removeItem('zansta_token');
    localStorage.removeItem('zansta_user');
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },
}));
