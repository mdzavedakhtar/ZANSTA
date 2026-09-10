export type ProjectCategory =
  | 'WEB APP'
  | 'AI / ML'
  | 'MOBILE'
  | 'SAAS'
  | 'AGENCY'
  | 'CLIENT PROJECT'
  | 'INTERNAL PRODUCT';

export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'LIVE' | 'ARCHIVED';

export interface CMSProject {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  gallery: string[];
  techStack: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  clientName?: string;
  clientRating?: number;
  clientReviewPreview?: string;
  isClientProject: boolean;
  isFeatured: boolean;
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CMSTeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  fullBio?: string;
  techStack: string[];
  experienceYears: string;
  experienceSummary?: string;
  location?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  resumeUrl?: string;
  resumeFileName?: string;
  isFeatured: boolean;
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type DemoStatus = 'DRAFT' | 'LIVE' | 'ARCHIVED';
export type DemoVisibility = 'PUBLIC' | 'PRIVATE';

export interface CMSClientDemo {
  id: string;
  projectId: string;
  projectName?: string;
  token: string;
  title: string;
  description: string;
  demoUrl: string;
  previewImage?: string;
  clientName: string;
  passcode?: string;
  visibility: DemoVisibility;
  status: DemoStatus;
  isFeatured: boolean;
  viewCount: number;
  expirationDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CMSService {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  techStack: string[];
  isFeatured: boolean;
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CMSReview {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  clientImage?: string;
  rating: number; // 1 to 5
  reviewText: string;
  projectId?: string;
  projectName?: string;
  isFeatured: boolean;
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type DemoRequestStatus = 'NEW' | 'CONTACTED' | 'SCHEDULED' | 'ARCHIVED';

export interface DemoRequest {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectInterest?: string;
  message?: string;
  contactMethod?: 'email' | 'phone' | 'linkedin';
  status: DemoRequestStatus;
  createdAt: string;
}

export type EnquiryStatus = 'NEW' | 'IN_DISCUSSION' | 'CLOSED' | 'ARCHIVED';

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterested?: string;
  budget?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface CMSLandingPageContent {
  heroHeadline?: string;
  heroSubheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  aboutHeadline?: string;
  aboutSubheadline?: string;
  aboutStoryText?: string;
  brandStoryHeadline?: string;
  brandStoryText?: string;
  agencyVisionHeadline?: string;
  agencyVisionText?: string;
  finalCtaHeadline?: string;
  finalCtaSubtext?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  sectionVisibility: {
    hero: boolean;
    about: boolean;
    services: boolean;
    projectShowcase: boolean;
    teamShowcase: boolean;
    agencyVision: boolean;
    reviews: boolean;
    demoRequest: boolean;
    contact: boolean;
    finalCta: boolean;
  };
  updatedAt: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  target: string;
  type: 'project' | 'team' | 'demo' | 'service' | 'review' | 'request' | 'enquiry' | 'landing';
}
