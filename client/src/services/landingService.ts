import { CMSLandingPageContent } from '@/types/cms';
import { activityService } from './activityService';

const STORAGE_KEY = 'zansta_cms_landing';

const defaultLandingContent: CMSLandingPageContent = {
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

  updateLandingContent: (updates: Partial<CMSLandingPageContent>): CMSLandingPageContent => {
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
    return updated;
  },
};
