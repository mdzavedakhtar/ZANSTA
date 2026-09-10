import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Project } from '../models/Project.js';
import { Task } from '../models/Task.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

let mockProjectsDatabase = [
  {
    id: 'proj_caresprint',
    slug: 'caresprint',
    name: 'CareSprint',
    description: 'On-demand healthcare platform providing real-time doctor appointments, WebRTC video consultations, encrypted patient records, and instant prescription downloads.',
    category: 'Healthcare SaaS',
    techStack: ['React 18', 'Node.js', 'Socket.IO', 'MongoDB', 'Razorpay'],
    status: 'DEVELOPMENT',
    visibility: 'PUBLIC',
    repoUrl: 'https://github.com/nexora/caresprint',
    demoUrl: 'https://caresprint.example.com',
    progress: 85,
    membersCount: 4,
    createdAt: '2026-01-10T00:00:00.000Z',
  },
  {
    id: 'proj_neurostack',
    slug: 'neurostack',
    name: 'NeuroStack',
    description: 'Autonomous AI Agent Workflow Engine supporting multi-agent coordination, vector database search, tool execution, and dynamic task graphs.',
    category: 'AI Infrastructure',
    techStack: ['TypeScript', 'FastAPI', 'Vector DB', 'Redis', 'Tailwind'],
    status: 'PLANNING',
    visibility: 'TEAM_ONLY',
    repoUrl: 'https://github.com/nexora/neurostack',
    demoUrl: 'https://neurostack.example.com',
    progress: 60,
    membersCount: 3,
    createdAt: '2026-01-20T00:00:00.000Z',
  },
  {
    id: 'proj_insightiq',
    slug: 'insightiq',
    name: 'InsightIQ',
    description: 'Real-time Financial Analytics & Reporting Hub providing WebSocket live feeds, exportable PDF reports, and custom threshold alerts.',
    category: 'Fintech SaaS',
    techStack: ['Next.js', 'Express', 'Chart.js', 'PostgreSQL', 'Tailwind'],
    status: 'COMPLETED',
    visibility: 'PUBLIC',
    repoUrl: 'https://github.com/nexora/insightiq',
    demoUrl: 'https://insightiq.example.com',
    progress: 95,
    membersCount: 5,
    createdAt: '2026-02-01T00:00:00.000Z',
  },
];

// @desc    Get All Projects
// @route   GET /api/v1/projects
export const getProjects = async (req: Request, res: Response) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected) {
    const projects = await Project.find().populate('owner', 'name email avatar');
    return res.status(200).json({ success: true, projects });
  } else {
    return res.status(200).json({ success: true, projects: mockProjectsDatabase });
  }
};

// @desc    Get Project By Slug / ID
// @route   GET /api/v1/projects/:slug
export const getProjectBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected) {
    const project = await Project.findOne({ $or: [{ slug: slug.toLowerCase() }, { _id: mongoose.Types.ObjectId.isValid(slug) ? slug : null }] }).populate('members', 'name email role avatar');
    if (!project) {
      return res.status(404).json({ success: false, error: { message: 'Project not found', statusCode: 404 } });
    }
    return res.status(200).json({ success: true, project });
  } else {
    const project = mockProjectsDatabase.find((p) => p.slug === slug.toLowerCase() || p.id === slug) || mockProjectsDatabase[0];
    return res.status(200).json({ success: true, project });
  }
};

// @desc    Create New Project
// @route   POST /api/v1/projects
export const createProject = async (req: AuthenticatedRequest, res: Response) => {
  const { name, description, category, techStack, status, visibility, repoUrl, demoUrl } = req.body;

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected && req.user) {
    const project = await Project.create({
      name,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      description,
      category: category || 'Full-Stack Web',
      techStack: techStack || [],
      status: status || 'DEVELOPMENT',
      visibility: visibility || 'TEAM_ONLY',
      repoUrl: repoUrl || '',
      demoUrl: demoUrl || '',
      owner: req.user._id,
      members: [req.user._id],
    });

    return res.status(201).json({ success: true, message: 'Project created successfully', project });
  } else {
    const mockProj = {
      id: `proj_${Date.now()}`,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      name,
      description,
      category: category || 'Full-Stack Web',
      techStack: techStack || ['React', 'Node.js'],
      status: status || 'DEVELOPMENT',
      visibility: visibility || 'TEAM_ONLY',
      repoUrl: repoUrl || '',
      demoUrl: demoUrl || '',
      progress: 10,
      membersCount: 1,
      createdAt: new Date().toISOString(),
    };

    mockProjectsDatabase.unshift(mockProj);

    return res.status(201).json({ success: true, message: 'Project created successfully', project: mockProj });
  }
};

// @desc    Update Project
// @route   PUT /api/v1/projects/:id
export const updateProject = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const target = mockProjectsDatabase.find((p) => p.id === id || p.slug === id);
  if (target) {
    Object.assign(target, req.body);
  }
  return res.status(200).json({ success: true, message: 'Project updated successfully', project: target || mockProjectsDatabase[0] });
};

// @desc    Delete Project
// @route   DELETE /api/v1/projects/:id
export const deleteProject = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  mockProjectsDatabase = mockProjectsDatabase.filter((p) => p.id !== id && p.slug !== id);
  return res.status(200).json({ success: true, message: 'Project deleted successfully' });
};

// @desc    Get Public Showcase Projects
// @route   GET /api/v1/projects/public
export const getPublicProjects = async (req: Request, res: Response) => {
  try {
    const isMongoConnected = mongoose.connection.readyState === 1;
    let publicProjects: any[] = [];

    if (isMongoConnected) {
      publicProjects = await Project.find({ visibility: 'PUBLIC' }).sort({ createdAt: -1 });
    }

    if (!publicProjects || publicProjects.length === 0) {
      publicProjects = mockProjectsDatabase.filter(p => p.visibility === 'PUBLIC');
    }

    // Enhance public projects with portfolio visuals & team avatars
    const richProjects = publicProjects.map(p => ({
      ...p,
      tagline: p.tagline || `${p.name} — Next-Gen ${p.category} Solution`,
      coverUrl: p.coverUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
      screenshots: p.screenshots || [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200',
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200'
      ],
      team: [
        { name: 'MD Zaved Akhtar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
        { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
        { name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
      ]
    }));

    return res.json({
      success: true,
      count: richProjects.length,
      projects: richProjects
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Public Project Case Study by Slug
// @route   GET /api/v1/projects/public/slug/:slug
export const getPublicProjectBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const isMongoConnected = mongoose.connection.readyState === 1;

    let proj: any = null;
    if (isMongoConnected) {
      proj = await Project.findOne({ slug, visibility: 'PUBLIC' });
    }

    if (!proj) {
      proj = mockProjectsDatabase.find(p => p.slug === slug || p.id === slug);
    }

    if (!proj) {
      return res.status(404).json({ success: false, message: 'Public project case study not found' });
    }

    // Construct full agency case study metadata payload
    const caseStudy = {
      ...proj,
      tagline: 'Instant Telehealth & Encrypted Medical Records Platform',
      overview: 'CareSprint is a flagship healthcare SaaS designed and engineered by NEXORA for modern tele-clinics. It unifies patient onboarding, HD video consultations, HIPAA-compliant medical vault storage, and instant pharmacy prescription dispatching into a seamless glassmorphic interface.',
      problem: 'Legacy healthcare web apps suffer from fragmented user flows, 10+ second video connection latencies, insecure record transfers over unencrypted email, and non-responsive mobile views that cause patient dropoff.',
      solution: 'NEXORA engineered a zero-latency WebRTC media stream pipeline backed by MongoDB client-side field-level encryption, dynamic appointment scheduling via Socket.IO, and a 60fps responsive React 18 frontend with sub-100ms API response times.',
      features: [
        { title: 'Sub-100ms WebRTC Video Consultations', desc: 'Custom peer-to-peer WebRTC mesh with automated fallback ICE servers ensuring 1080p HD stream stability.' },
        { title: 'HIPAA 256-Bit Encrypted Vault', desc: 'Client-side encrypted file uploads for lab diagnostics, blood work PDFs, and MRI scans.' },
        { title: 'Automated Prescription Dispatch', desc: '1-click digital signature doctor prescriptions with instant QR code verification for pharmacies.' },
        { title: 'Linear-Style Appointment Board', desc: 'Real-time kanban drag & drop dashboard for clinic triage and nurse shift coordination.' }
      ],
      architecture: {
        frontend: 'React 18, TypeScript, Tailwind CSS, Framer Motion, Zustand',
        backend: 'Node.js, Express, Socket.IO Gateway, Redis Session Store',
        database: 'MongoDB Atlas with Client-Side Field Level Encryption (CSFLE)',
        infrastructure: 'Vercel Edge Network, AWS S3 Encrypted Storage Buckets, Cloudflare CDN'
      },
      coverUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
      screenshots: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200',
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200'
      ],
      team: [
        { name: 'MD Zaved Akhtar', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
        { name: 'Elena Rostova', role: 'UI/UX Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
        { name: 'Marcus Vance', role: 'Frontend Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
        { name: 'Sarah Chen', role: 'DevOps Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }
      ],
      seo: {
        title: `${proj.name} Case Study — Build Together. Ship Together. | NEXORA`,
        description: `Explore how NEXORA engineered ${proj.name}: ${proj.description}`,
        openGraphImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
        canonicalUrl: `https://nexora.dev/projects/${proj.slug}`
      }
    };

    return res.json({ success: true, project: caseStudy });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

