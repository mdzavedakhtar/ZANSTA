import { CMSProject } from '../models/CMSProject.js';
import { CMSTeamMember } from '../models/CMSTeamMember.js';
import { CMSService } from '../models/CMSService.js';
import { CMSClientDemo } from '../models/CMSClientDemo.js';
import { CMSReview } from '../models/CMSReview.js';
import { CMSLandingContent } from '../models/CMSLandingContent.js';
import { ContactEnquiry } from '../models/ContactEnquiry.js';
import { DemoRequest } from '../models/DemoRequest.js';
import { CMSActivityLog } from '../models/CMSActivityLog.js';
import { generateZavedResumePdfBase64 } from '../utils/generateZavedResume.js';

export const defaultProjects = [
  {
    id: 'proj_caresprint',
    name: 'CareSprint Platform',
    slug: 'caresprint',
    shortDescription: 'On-Demand Healthcare Telemedicine & Prescription Platform',
    description:
      'Real-time doctor scheduling, WebRTC video consultations, encrypted patient records, and automated prescription generation. Engineered for high performance with sub-100ms video signaling latency.',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop',
    ],
    techStack: ['React 18', 'Node.js', 'Socket.IO', 'MongoDB', 'Razorpay'],
    category: 'SAAS',
    status: 'LIVE',
    githubUrl: 'https://github.com/zansta/caresprint',
    liveUrl: 'https://caresprint.example.com',
    clientName: 'CareSprint Health Inc.',
    clientRating: 5.0,
    clientReviewPreview: 'ZANSTA delivered our telemedicine video gateway with sub-100ms signaling latency. Outstanding work!',
    isClientProject: true,
    isFeatured: true,
    isVisible: true,
    order: 1,
  },
  {
    id: 'proj_neurostack',
    name: 'NeuroStack AI Engine',
    slug: 'neurostack',
    shortDescription: 'Autonomous AI Agent Workflow & Orchestration Engine',
    description:
      'Multi-agent coordination system with vector database search, tool execution, dynamic task graphs, and sub-second context retrieval for enterprise LLM automation.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
    ],
    techStack: ['TypeScript', 'FastAPI', 'Vector DB', 'Redis', 'Tailwind'],
    category: 'AI / ML',
    status: 'IN_PROGRESS',
    githubUrl: 'https://github.com/zansta/neurostack',
    liveUrl: 'https://neurostack.example.com',
    clientName: 'Internal Product',
    clientRating: 5.0,
    clientReviewPreview: 'Multi-agent orchestration platform that automated 80% of our manual data workflows.',
    isClientProject: false,
    isFeatured: true,
    isVisible: true,
    order: 2,
  },
  {
    id: 'proj_insightiq',
    name: 'Insight IQ Analytics',
    slug: 'insightiq',
    shortDescription: 'Real-time Financial Analytics & High-Frequency Streaming Hub',
    description:
      'High-frequency financial metrics dashboard with live WebSocket feeds, exportable PDF reports, automated custom alert rules, and interactive chart visualizations.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    ],
    techStack: ['Next.js', 'Express', 'Chart.js', 'PostgreSQL', 'Tailwind'],
    category: 'WEB APP',
    status: 'COMPLETED',
    githubUrl: 'https://github.com/zansta/insightiq',
    liveUrl: 'https://insightiq.example.com',
    clientName: 'Apex Capital Ltd',
    clientRating: 5.0,
    clientReviewPreview: 'The real-time streaming WebSocket hub built by ZANSTA handles millions of daily data points flawlessly.',
    isClientProject: true,
    isFeatured: true,
    isVisible: true,
    order: 3,
  },
];

export const defaultTeamMembers = [
  {
    id: 'team_zaved',
    name: 'MD Zaved Akhtar',
    role: 'Full-Stack, AI & Data Analytics Engineer',
    photo: '/zaved.jpg',
    bio: 'Specializing in AI-powered RAG document intelligence platforms, Full-Stack MERN & Next.js architectures, and Data Analytics (Python, SQL, Power BI).',
    fullBio:
      'Full-Stack, AI & Data Analytics Engineer with hands-on expertise building production-grade RAG intelligence platforms, knowledge graphs (Pinecone, Neo4j, Gemini), MERN/Next.js applications, and end-to-end data analytics solutions (Python, SQL, Power BI, DAX, Pandas, NumPy, Machine Learning). Microsoft Azure AI Fundamentals and MSME Data Analytics certified.',
    techStack: ['React', 'Next.js', 'Node.js', 'Python', 'SQL', 'Power BI', 'Generative AI', 'RAG', 'Data Analytics', 'Java', 'TypeScript', 'MongoDB', 'Docker', 'Azure AI'],
    experienceYears: '3+',
    experienceSummary: 'Full-stack, Generative AI & Data Analytics Engineer specializing in RAG document intelligence, business intelligence dashboards, and scalable web platforms.',
    location: 'Bhilai / Delhi NCR, India',
    email: 'mdzavedakhtar62@gmail.com',
    github: 'https://github.com/mdzavedakhtar',
    linkedin: 'https://www.linkedin.com/in/md-zaved-akhtar-22013828b',
    portfolio: 'https://github.com/mdzavedakhtar',
    resumeUrl: generateZavedResumePdfBase64(),
    resumeFileName: 'MD_Zaved_Akhtar_Resume.pdf',
    isFeatured: true,
    isVisible: true,
    order: 1,
  },
];

export const defaultServices = [
  {
    id: 'svc_frontend_design',
    name: 'Frontend Design',
    shortDescription: 'Pixel-perfect 2026 dark UI/UX design systems with fluid Framer Motion animations and magnetic interactions.',
    fullDescription: 'Custom UI/UX component architectures, high-precision motion choreography, and high-converting modern dark interfaces tailored for modern platforms.',
    iconName: 'Layout',
    tag: 'UI / UX',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    techStack: ['Framer Motion', 'TailwindCSS', 'React 18', 'Figma'],
    isFeatured: true,
    isVisible: true,
    order: 1,
  },
  {
    id: 'svc_fullstack_dev',
    name: 'Full Stack Website Development',
    shortDescription: 'Scalable MERN/Next.js web applications engineered with clean microservices and real-time WebSockets.',
    fullDescription: 'Complete end-to-end full stack platforms featuring low-latency WebSocket signaling, MongoDB Atlas architectures, and robust RESTful API gateways.',
    iconName: 'Code2',
    tag: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    techStack: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Express'],
    isFeatured: true,
    isVisible: true,
    order: 2,
  },
  {
    id: 'svc_seo_opt',
    name: 'SEO Design & Optimization',
    shortDescription: 'High-speed technical SEO architecture, structured metadata schema, and performance optimizations.',
    fullDescription: 'Core Web Vitals scoring optimization, SSR/SSG rendering, OpenGraph tags, and semantic search indexing to drive top Google rankings.',
    iconName: 'Search',
    tag: 'Growth',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    techStack: ['Technical SEO', 'Next.js SSR', 'Schema.org', 'Lighthouse 100'],
    isFeatured: true,
    isVisible: true,
    order: 3,
  },
  {
    id: 'svc_digital_marketing',
    name: 'Digital Marketing',
    shortDescription: 'Data-driven acquisition campaigns, multi-channel performance marketing, and conversion rate optimization.',
    fullDescription: 'Full-funnel growth campaigns, technical analytics tracking, attribution modeling, and customer acquisition strategies.',
    iconName: 'TrendingUp',
    tag: 'Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=800&auto=format&fit=crop',
    techStack: ['Growth Marketing', 'Meta Ads', 'Google Ads', 'CRO'],
    isFeatured: true,
    isVisible: true,
    order: 4,
  },
  {
    id: 'svc_ai_engine',
    name: 'Generative AI Tools Development',
    shortDescription: 'Autonomous multi-agent engines, RAG vector database pipelines, and custom AI workflow automation.',
    fullDescription: 'Custom vector database architectures (Pinecone/Chroma), Gemini/OpenAI tool integrations, and dynamic multi-agent task execution.',
    iconName: 'Bot',
    tag: 'AI / ML',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    techStack: ['Python', 'Pinecone', 'LangChain', 'OpenAI', 'Gemini'],
    isFeatured: true,
    isVisible: true,
    order: 5,
  },
  {
    id: 'svc_analytics_ai',
    name: 'Data Analytics with Generative AI',
    shortDescription: 'Real-time telemetry dashboards integrated with custom LLMs for automated business intelligence.',
    fullDescription: 'Power BI dashboards, automated SQL analytics pipelines, and natural language query interfaces for enterprise decision making.',
    iconName: 'BarChart3',
    tag: 'Analytics',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    techStack: ['Power BI', 'Python', 'SQL', 'Pandas', 'DAX'],
    isFeatured: true,
    isVisible: true,
    order: 6,
  },
];

export const defaultDemos = [
  {
    id: 'demo_caresprint',
    projectId: 'proj_caresprint',
    projectName: 'CareSprint Platform',
    token: 'caresprint-live-demo-2026',
    title: 'CareSprint Healthcare Portal Staging',
    description: 'Live interactive client demonstration environment featuring WebRTC tele-consultation and online doctor booking.',
    demoUrl: 'https://caresprint.example.com',
    previewImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    clientName: 'CareSprint Health Inc.',
    passcode: '123456',
    visibility: 'PRIVATE',
    status: 'LIVE',
    isFeatured: true,
    viewCount: 42,
  },
  {
    id: 'demo_insightiq',
    projectId: 'proj_insightiq',
    projectName: 'Insight IQ Analytics',
    token: 'insightiq-analytics-preview',
    title: 'Insight IQ Financial Streaming Hub',
    description: 'High-frequency market metrics dashboard preview for executive client review.',
    demoUrl: 'https://insightiq.example.com',
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    clientName: 'Apex Capital Ltd',
    passcode: '',
    visibility: 'PUBLIC',
    status: 'LIVE',
    isFeatured: false,
    viewCount: 18,
  },
];

export const defaultReviews = [
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
  },
];

export const defaultLandingContent = {
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
  twitterUrl: '',
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
};

export const defaultEnquiries: any[] = [];
export const defaultDemoRequests: any[] = [];

import { CMSCertificate } from '../models/CMSCertificate.js';

export const defaultCertificates = [
  {
    id: 'cert_msme_udyam',
    title: 'MSME UDYAM REGISTRATION VERIFIED',
    issuer: 'Ministry of Micro, Small & Medium Enterprises, Govt. of India',
    certificateNumber: 'UDYAM-CG-02-0018924',
    badgeText: '🇮🇳 GOVT. OF INDIA VERIFIED',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Government_of_India_logo.svg',
    verificationUrl: 'https://udyamregistration.gov.in',
    issuedDate: '2024-03-15',
    description: 'Officially registered and recognized Enterprise by the Government of India for Software Design, Development, and Digital Systems.',
    isVisible: true,
    order: 1,
  },
  {
    id: 'cert_startup_india',
    title: 'STARTUP INDIA RECOGNITION',
    issuer: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
    certificateNumber: 'DPIIT-RECOGNIZED-ENTERPRISE',
    badgeText: '🚀 DPIIT RECOGNIZED',
    logoUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=300&auto=format&fit=crop',
    verificationUrl: 'https://www.startupindia.gov.in',
    issuedDate: '2024-05-10',
    description: 'Recognized by DPIIT as an innovative technology and software development startup entity.',
    isVisible: true,
    order: 2,
  },
  {
    id: 'cert_iso_9001',
    title: 'ISO 9001:2015 QUALITY MANAGEMENT',
    issuer: 'International Organization for Standardization',
    certificateNumber: 'ISO-9001:2015-QMS-VALIDATED',
    badgeText: '⭐ ISO 9001:2015 CERTIFIED',
    logoUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=300&auto=format&fit=crop',
    verificationUrl: '',
    issuedDate: '2025-01-20',
    description: 'Certified Quality Management System for reliable architecture delivery and software engineering security standards.',
    isVisible: true,
    order: 3,
  },
  {
    id: 'cert_ssl_encryption',
    title: '256-BIT SSL ENTERPRISE ENCRYPTED',
    issuer: 'Cloudflare & Let\'s Encrypt Trust Network',
    certificateNumber: 'TLS-1.3-HIGH-GRADE-SECURITY',
    badgeText: '🔒 256-BIT ENCRYPTION',
    logoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop',
    verificationUrl: '',
    issuedDate: '2026-01-01',
    description: 'Strict TLS 1.3 cryptographic transport and end-to-end payload encryption for user data safety.',
    isVisible: true,
    order: 4,
  },
];

export const seedCMSData = async () => {
  try {
    const projectCount = await CMSProject.countDocuments();
    if (projectCount === 0) {
      console.log('[Seed] Seeding initial Showcase Projects into MongoDB...');
      await CMSProject.insertMany(defaultProjects);
    }

    const teamCount = await CMSTeamMember.countDocuments();
    // Clean up any deleted placeholder members
    await CMSTeamMember.deleteMany({ id: { $in: ['team_rahul', 'team_aman'] } });
    if (teamCount === 0) {
      console.log('[Seed] Seeding initial Team Members into MongoDB...');
      await CMSTeamMember.insertMany(defaultTeamMembers);
    } else {
      // Ensure Zaved profile is present
      const zaved = await CMSTeamMember.findOne({ id: 'team_zaved' });
      if (!zaved) {
        await CMSTeamMember.create(defaultTeamMembers[0]);
      }
    }

    const serviceCount = await CMSService.countDocuments();
    if (serviceCount === 0) {
      console.log('[Seed] Seeding initial Services into MongoDB...');
      await CMSService.insertMany(defaultServices);
    }

    const demoCount = await CMSClientDemo.countDocuments();
    if (demoCount === 0) {
      console.log('[Seed] Seeding initial Client Demos into MongoDB...');
      await CMSClientDemo.insertMany(defaultDemos);
    }

    const reviewCount = await CMSReview.countDocuments();
    if (reviewCount === 0) {
      console.log('[Seed] Seeding initial Client Reviews into MongoDB...');
      await CMSReview.insertMany(defaultReviews);
    }

    const landingCount = await CMSLandingContent.countDocuments();
    if (landingCount === 0) {
      console.log('[Seed] Seeding initial Landing Page Content into MongoDB...');
      await CMSLandingContent.create(defaultLandingContent);
    }

    const certificateCount = await CMSCertificate.countDocuments();
    if (certificateCount === 0) {
      console.log('[Seed] Seeding initial Government MSME & Trust Certificates into MongoDB...');
      await CMSCertificate.insertMany(defaultCertificates);
    }

    console.log('[Seed] ✅ MongoDB collections verified & ready for Superadmin CMS!');
  } catch (error) {
    console.error('[Seed Error] Failed to seed CMS initial data:', error);
  }
};


