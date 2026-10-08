import { CMSLandingPageContent } from '@/types/cms';
import { apiRequest } from './api';
import { activityService } from './activityService';

const STORAGE_KEY = 'zansta_cms_landing';

export const defaultLandingContent: CMSLandingPageContent = {
  heroHeadline: 'NEXT-GEN CREATIVE AGENCY & DIGITAL ENGINE',
  heroSubheadline: 'We build enterprise web applications, AI agent systems, and ultra-fluid digital experiences for market leaders.',
  ctaText: 'EXPLORE SHOWCASE',
  ctaLink: '/projects',
  brandStoryHeadline: 'ENGINEERING CREATIVE SOFTWARE WITH ZERO COMPROMISE',
  brandStoryText: 'ZANSTA brings together top-tier developers and motion design architects to transform ambitious product concepts into high-converting digital platforms.',
  agencyVisionHeadline: 'THE ZANSTA VISION',
  agencyVisionText: 'Building products that combine engineering precision, speed, and immersive design.',
  finalCtaHeadline: 'READY TO BUILD YOUR NEXT DIGITAL BREAKTHROUGH?',
  finalCtaSubtext: 'Connect with our team to launch your custom web application or AI platform.',
  contactEmail: 'zanstacom@gmail.com',
  contactPhone: '+91 6202888431, +91 6287786639',
  contactAddress: 'Bhilai, Kohka, Durg, Chhattisgarh 490023',
  linkedinUrl: 'https://www.linkedin.com/in/md-zaved-akhtar-22013828b',
  githubUrl: 'https://github.com/mdzavedakhtar',
  sectionVisibility: {
    hero: true,
    about: true,
    services: true,
    projectShowcase: true,
    teamShowcase: true,
    agencyVision: true,
    reviews: true,
    demoRequest: true,
    contact: true,
    finalCta: true,
  },
  updatedAt: new Date().toISOString(),
};

export const landingService = {
  // Async fetch from MongoDB API
  fetchLandingContent: async (): Promise<CMSLandingPageContent> => {
    try {
      const response = await apiRequest<{ success: boolean; data: CMSLandingPageContent }>('/cms/landing');
      if (response.success && response.data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        return response.data;
      }
    } catch (err) {
      console.warn('[landingService] Backend API offline, using local cache:', err);
    }
    return landingService.getLandingContent();
  },

  // Synchronous read with local cache
  getLandingContent: (): CMSLandingPageContent => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse landing content from localStorage', e);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultLandingContent));
    return defaultLandingContent;
  },

  updateLandingContent: async (updates: Partial<CMSLandingPageContent>): Promise<CMSLandingPageContent> => {
    const current = landingService.getLandingContent();
    const updated: CMSLandingPageContent = {
      ...current,
      ...updates,
      sectionVisibility: {
        ...current.sectionVisibility,
        ...(updates.sectionVisibility || {}),
      },
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    activityService.logActivity('MD Zaved Akhtar', 'updated landing page CMS content', 'Landing Page CMS', 'landing');

    try {
      const res = await apiRequest<{ success: boolean; data: CMSLandingPageContent }>('/cms/landing', {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      if (res.success && res.data) return res.data;
    } catch (err) {
      console.warn('[landingService] Failed to save landing content to MongoDB, saved locally:', err);
    }

    return updated;
  },
};
