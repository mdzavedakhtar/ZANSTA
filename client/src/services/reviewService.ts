import { CMSReview } from '@/types/cms';
import { apiRequest } from './api';
import { activityService } from './activityService';

const STORAGE_KEY = 'zansta_cms_reviews';

export const defaultReviews: CMSReview[] = [
  {
    id: 'rev_caresprint',
    clientName: 'Dr. Marcus Vance',
    clientRole: 'Chief Medical Officer',
    companyName: 'CareSprint Health Inc.',
    clientImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    reviewText:
      'ZANSTA delivered our telemedicine video gateway with sub-100ms signaling latency. Their team combines world-class motion design with deep engineering rigor.',
    projectId: 'proj_caresprint',
    projectName: 'CareSprint Platform',
    isFeatured: true,
    isVisible: true,
    order: 1,
    createdAt: '2026-01-20T10:00:00.000Z',
    updatedAt: '2026-01-20T10:00:00.000Z',
  },
  {
    id: 'rev_insightiq',
    clientName: 'Elena Rostova',
    clientRole: 'VP of Digital Innovation',
    companyName: 'Apex Capital Ltd',
    clientImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    reviewText:
      'The real-time streaming WebSocket hub built by ZANSTA handles millions of daily data points flawlessly. Hands down the best engineering agency partner.',
    projectId: 'proj_insightiq',
    projectName: 'Insight IQ Analytics',
    isFeatured: true,
    isVisible: true,
    order: 2,
    createdAt: '2026-02-05T12:00:00.000Z',
    updatedAt: '2026-02-05T12:00:00.000Z',
  },
  {
    id: 'rev_neurostack',
    clientName: 'David Chen',
    clientRole: 'Head of Product',
    companyName: 'NeuroStack AI Solutions',
    clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    reviewText:
      'ZANSTA built an autonomous multi-agent system that automated 80% of our manual data workflows. Unmatched speed to market and aesthetic perfection.',
    projectId: 'proj_neurostack',
    projectName: 'NeuroStack AI Engine',
    isFeatured: true,
    isVisible: true,
    order: 3,
    createdAt: '2026-02-15T14:30:00.000Z',
    updatedAt: '2026-02-15T14:30:00.000Z',
  },
];

export const reviewService = {
  // Async fetch from MongoDB API
  fetchReviews: async (filters?: { isFeatured?: boolean; isVisible?: boolean }): Promise<CMSReview[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.isFeatured !== undefined) params.append('isFeatured', String(filters.isFeatured));
      if (filters?.isVisible !== undefined) params.append('isVisible', String(filters.isVisible));

      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await apiRequest<{ success: boolean; data: CMSReview[] }>(`/cms/reviews${queryString}`);
      if (response.success && Array.isArray(response.data)) {
        if (!filters || Object.keys(filters).length === 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        } else {
          try {
            const stored = localStorage.getItem(STORAGE_KEY);
            const current: CMSReview[] = stored ? JSON.parse(stored) : [];
            const mergedMap = new Map<string, CMSReview>();
            response.data.forEach((r) => mergedMap.set(r.id, r));
            current.forEach((r) => {
              if (!mergedMap.has(r.id)) mergedMap.set(r.id, r);
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(mergedMap.values())));
          } catch {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
          }
        }
        return response.data;
      }
    } catch (err) {
      console.warn('[reviewService] Backend API offline, using local cache:', err);
    }
    return reviewService.getReviews(filters);
  },

  // Synchronous read with local cache
  getReviews: (filters?: { isFeatured?: boolean; isVisible?: boolean }): CMSReview[] => {
    let reviews: CMSReview[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        reviews = JSON.parse(stored);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultReviews));
        reviews = defaultReviews;
      }
    } catch (e) {
      console.error('Failed to parse reviews from localStorage', e);
      reviews = defaultReviews;
    }

    reviews.sort((a, b) => (a.order || 0) - (b.order || 0));

    if (!filters) return reviews;

    return reviews.filter((r) => {
      if (filters.isFeatured !== undefined && r.isFeatured !== filters.isFeatured) return false;
      if (filters.isVisible !== undefined && r.isVisible !== filters.isVisible) return false;
      return true;
    });
  },

  getReviewById: (id: string): CMSReview | null => {
    const reviews = reviewService.getReviews();
    return reviews.find((r) => r.id === id) || null;
  },

  fetchReviewById: async (id: string): Promise<CMSReview | null> => {
    try {
      const res = await apiRequest<{ success: boolean; data: CMSReview }>(`/cms/reviews/${id}`);
      if (res.success && res.data) {
        const reviews = reviewService.getReviews();
        const updated = reviews.some((r) => r.id === id)
          ? reviews.map((r) => (r.id === id ? res.data : r))
          : [...reviews, res.data];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return res.data;
      }
    } catch (err) {
      console.warn('[reviewService] Could not fetch review by ID from server:', err);
    }
    return reviewService.getReviewById(id);
  },

  createReview: async (data: Omit<CMSReview, 'id' | 'createdAt' | 'updatedAt' | 'order'> & { order?: number }): Promise<CMSReview> => {
    const reviews = reviewService.getReviews();
    const id = `rev_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newReview: CMSReview = {
      ...data,
      id,
      order: data.order ?? (reviews.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await apiRequest<{ success: boolean; data: CMSReview }>('/cms/reviews', {
        method: 'POST',
        body: JSON.stringify(newReview),
      });
      const saved = res.data || newReview;
      const updated = [...reviews.filter((r) => r.id !== id && r.id !== saved.id), saved];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      activityService.logActivity('MD Zaved Akhtar', 'added client review', `${saved.clientName} (${saved.companyName})`, 'review');
      return saved;
    } catch (err) {
      console.warn('[reviewService] Failed to save review in MongoDB, saved locally:', err);
      const updated = [...reviews, newReview];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      activityService.logActivity('MD Zaved Akhtar', 'added client review (offline)', `${newReview.clientName} (${newReview.companyName})`, 'review');
      return newReview;
    }
  },

  updateReview: async (id: string, updates: Partial<CMSReview>): Promise<CMSReview | null> => {
    const reviews = reviewService.getReviews();
    const index = reviews.findIndex((r) => r.id === id);
    const existing = index !== -1 ? reviews[index] : ({} as CMSReview);

    const updatedReview: CMSReview = {
      ...existing,
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await apiRequest<{ success: boolean; data: CMSReview }>(`/cms/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      const saved = res.data || updatedReview;
      const updatedList = reviews.some((r) => r.id === id)
        ? reviews.map((r) => (r.id === id ? saved : r))
        : [...reviews, saved];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      activityService.logActivity('MD Zaved Akhtar', 'updated client review', saved.clientName || 'Review', 'review');
      return saved;
    } catch (err) {
      console.warn('[reviewService] Failed to update review in MongoDB, updated locally:', err);
      if (index !== -1) {
        reviews[index] = updatedReview;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
      }
      activityService.logActivity('MD Zaved Akhtar', 'updated client review (offline)', updatedReview.clientName || 'Review', 'review');
      return updatedReview;
    }
  },

  deleteReview: async (id: string): Promise<boolean> => {
    const reviews = reviewService.getReviews();
    const target = reviews.find((r) => r.id === id);

    try {
      await apiRequest(`/cms/reviews/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.warn('[reviewService] Failed to delete review from MongoDB, deleted locally:', err);
    }

    const filtered = reviews.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    activityService.logActivity('MD Zaved Akhtar', 'deleted client review', target?.clientName || id, 'review');
    return true;
  },
};
