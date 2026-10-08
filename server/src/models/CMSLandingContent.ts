import mongoose, { Schema, Document } from 'mongoose';

export interface ICMSLandingContent extends Document {
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
  updatedAt: Date;
}

const CMSLandingContentSchema = new Schema<ICMSLandingContent>(
  {
    heroHeadline: { type: String, default: 'BUILD TOGETHER. SHIP EXTRAORDINARY.' },
    heroSubheadline: { type: String, default: 'A collaborative workspace for ambitious software engineering teams to manage code, stream real-time updates, track tasks, and launch high-impact client showcases.' },
    ctaText: { type: String, default: 'EXPLORE SHOWCASE' },
    ctaLink: { type: String, default: '/projects' },
    aboutHeadline: { type: String, default: 'ABOUT ZANSTA' },
    aboutSubheadline: { type: String, default: 'Enterprise Web Apps & AI Agent Engineering' },
    aboutStoryText: { type: String, default: 'ZANSTA brings together top-tier developers and motion design architects to transform ambitious product concepts into high-converting digital platforms.' },
    brandStoryHeadline: { type: String, default: 'ENGINEERING CREATIVE SOFTWARE WITH ZERO COMPROMISE' },
    brandStoryText: { type: String, default: 'ZANSTA brings together top-tier developers and motion design architects to transform ambitious product concepts into high-converting digital platforms.' },
    agencyVisionHeadline: { type: String, default: 'THE ZANSTA VISION' },
    agencyVisionText: { type: String, default: 'Building products that combine engineering precision, speed, and immersive design.' },
    finalCtaHeadline: { type: String, default: 'READY TO BUILD YOUR NEXT DIGITAL BREAKTHROUGH?' },
    finalCtaSubtext: { type: String, default: 'Connect with our team to launch your custom web application or AI platform.' },
    contactEmail: { type: String, default: 'mdzavedakhtar62@gmail.com' },
    contactPhone: { type: String, default: '+91 98765 43210' },
    contactAddress: { type: String, default: 'Bhilai / Delhi NCR, India' },
    linkedinUrl: { type: String, default: 'https://www.linkedin.com/in/md-zaved-akhtar-22013828b' },
    githubUrl: { type: String, default: 'https://github.com/mdzavedakhtar' },
    twitterUrl: { type: String, default: '' },
    sectionVisibility: {
      hero: { type: Boolean, default: true },
      about: { type: Boolean, default: true },
      services: { type: Boolean, default: true },
      projectShowcase: { type: Boolean, default: true },
      teamShowcase: { type: Boolean, default: true },
      agencyVision: { type: Boolean, default: true },
      reviews: { type: Boolean, default: true },
      demoRequest: { type: Boolean, default: true },
      contact: { type: Boolean, default: true },
      finalCta: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export const CMSLandingContent = mongoose.model<ICMSLandingContent>('CMSLandingContent', CMSLandingContentSchema);
