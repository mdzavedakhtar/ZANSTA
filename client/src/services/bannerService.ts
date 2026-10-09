import { CMSBanner } from '@/types/cms';
import { apiRequest } from './api';
import { activityService } from './activityService';

const STORAGE_KEY = 'zansta_cms_banners';

export const defaultBanners: CMSBanner[] = [
  {
    id: 'ban_festive_offer',
    title: '⚡ SPECIAL LAUNCH OFFER: GET 25% OFF ON CUSTOM FULL-STACK PLATFORMS',
    subtitle: 'Limited Slots • Free Architecture & SEO Audit Included',
    discountText: '25% OFF',
    badgeText: '🔥 HOT OFFER',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop',
    targetUrl: '/contact',
    ctaText: 'Claim Discount',
    isVisible: true,
    order: 1,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'ban_ai_agents',
    title: '🤖 AUTOMATE YOUR ENTERPRISE WITH NEXT-GEN GENERATIVE AI AGENTS',
    subtitle: 'Multi-Agent LLM Orchestration & Custom Vector Database Integration',
    discountText: 'NEW RELEASE',
    badgeText: '✨ AI SUITE',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    targetUrl: '/contact',
    ctaText: 'Build AI Platform',
    isVisible: true,
    order: 2,
    createdAt: '2026-01-02T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
  },
  {
    id: 'ban_ui_design',
    title: '🎨 HIGH-CONVERTING 2026 DARK UI/UX & FLUID MOTION ARCHITECTURE',
    subtitle: 'Pixel-Perfect Modern Interfaces Crafted for Fast-Growing Startups',
    discountText: 'LIMITED SLOTS',
    badgeText: '⭐ TOP RATED',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop',
    targetUrl: '/contact',
    ctaText: 'Book Design Sprint',
    isVisible: true,
    order: 3,
    createdAt: '2026-01-03T00:00:00.000Z',
    updatedAt: '2026-01-03T00:00:00.000Z',
  },
];

export interface BannerFilterOptions {
  isVisible?: boolean;
}

export const bannerService = {
  fetchBanners: async (filters?: BannerFilterOptions): Promise<CMSBanner[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.isVisible !== undefined) params.append('isVisible', String(filters.isVisible));
      const queryString = params.toString() ? `?${params.toString()}` : '';

      const response = await apiRequest<{ success: boolean; data: CMSBanner[] }>(`/cms/banners${queryString}`);
      if (response.success && Array.isArray(response.data)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        return response.data;
      }
    } catch {
      // Silently fall back to local cache
    }
    return bannerService.getBanners(filters);
  },

  getBanners: (filters?: BannerFilterOptions): CMSBanner[] => {
    let banners: CMSBanner[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        banners = JSON.parse(stored);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBanners));
        banners = defaultBanners;
      }
    } catch {
      banners = defaultBanners;
    }

    banners.sort((a, b) => (a.order || 0) - (b.order || 0));

    if (!filters) return banners;

    return banners.filter((b) => {
      if (filters.isVisible !== undefined && b.isVisible !== filters.isVisible) return false;
      return true;
    });
  },

  getBannerById: (id: string): CMSBanner | null => {
    const banners = bannerService.getBanners();
    return banners.find((b) => b.id === id) || null;
  },

  createBanner: async (data: Omit<CMSBanner, 'id' | 'createdAt' | 'updatedAt' | 'order'> & { order?: number }): Promise<CMSBanner> => {
    const banners = bannerService.getBanners();
    const id = `ban_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    const newBanner: CMSBanner = {
      ...data,
      id,
      order: data.order ?? (banners.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await apiRequest<{ success: boolean; data: CMSBanner }>('/cms/banners', {
        method: 'POST',
        body: JSON.stringify(newBanner),
      });
      const saved = res.data || newBanner;
      const updated = [...banners.filter((b) => b.id !== id && b.id !== saved.id), saved];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      activityService.logActivity('MD Zaved Akhtar', 'created promo banner', saved.title, 'banner');
      return saved;
    } catch {
      const updated = [...banners, newBanner];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      activityService.logActivity('MD Zaved Akhtar', 'created promo banner (offline)', newBanner.title, 'banner');
      return newBanner;
    }
  },

  updateBanner: async (id: string, updates: Partial<CMSBanner>): Promise<CMSBanner | null> => {
    const banners = bannerService.getBanners();
    const index = banners.findIndex((b) => b.id === id);
    const existing = index !== -1 ? banners[index] : ({} as CMSBanner);

    const updatedBanner: CMSBanner = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await apiRequest<{ success: boolean; data: CMSBanner }>(`/cms/banners/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      const saved = res.data || updatedBanner;
      const updatedList = banners.map((b) => (b.id === id ? saved : b));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      activityService.logActivity('MD Zaved Akhtar', 'updated promo banner', saved.title, 'banner');
      return saved;
    } catch {
      const updatedList = banners.map((b) => (b.id === id ? updatedBanner : b));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      activityService.logActivity('MD Zaved Akhtar', 'updated promo banner (offline)', updatedBanner.title, 'banner');
      return updatedBanner;
    }
  },

  deleteBanner: async (id: string): Promise<boolean> => {
    const banners = bannerService.getBanners();
    const target = banners.find((b) => b.id === id);
    const title = target?.title || id;

    try {
      await apiRequest(`/cms/banners/${id}`, { method: 'DELETE' });
    } catch {
      // Silent
    }

    const filtered = banners.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    activityService.logActivity('MD Zaved Akhtar', 'deleted promo banner', title, 'banner');
    return true;
  },

  reorderBanners: async (banners: CMSBanner[]): Promise<CMSBanner[]> => {
    const reordered = banners.map((b, idx) => ({ ...b, order: idx + 1, updatedAt: new Date().toISOString() }));
    try {
      await apiRequest('/cms/banners/reorder', {
        method: 'PUT',
        body: JSON.stringify({ banners: reordered }),
      });
    } catch {
      // Silent
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reordered));
    activityService.logActivity('MD Zaved Akhtar', 'reordered promo banners', 'Banners Order', 'banner');
    return reordered;
  },
};
