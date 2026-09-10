import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { ClientLink } from '../models/ClientLink.js';
import { Project } from '../models/Project.js';
import mongoose from 'mongoose';
import crypto from 'crypto';

// In-memory fallback map for client links when DB is offline
const mockClientLinks = new Map<string, any>();

// Default mock link for demonstration
mockClientLinks.set('demo-caresprint-2026', {
  token: 'demo-caresprint-2026',
  projectId: 'proj_caresprint',
  passcode: '',
  expiresAt: null,
  viewCount: 14,
  createdById: 'user_mock_sahil',
  isActive: true,
  createdAt: new Date().toISOString()
});

export const generateClientLink = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { projectId, passcode, expiresInDays } = req.body;
    const userId = req.user?.id;

    if (!projectId) {
      return res.status(400).json({ success: false, message: 'Project ID is required' });
    }

    const token = 'link_' + crypto.randomBytes(8).toString('hex');
    let expiresAt: Date | null = null;
    if (expiresInDays && Number(expiresInDays) > 0) {
      expiresAt = new Date(Date.now() + Number(expiresInDays) * 24 * 60 * 60 * 1000);
    }

    const isMongoConnected = mongoose.connection.readyState === 1;

    let newLink: any;
    if (isMongoConnected) {
      newLink = await ClientLink.create({
        token,
        projectId,
        passcode: passcode || '',
        expiresAt,
        createdById: userId,
        isActive: true
      });
    } else {
      newLink = {
        token,
        projectId,
        passcode: passcode || '',
        expiresAt,
        viewCount: 0,
        createdById: userId || 'user_mock_sahil',
        isActive: true,
        createdAt: new Date().toISOString()
      };
      mockClientLinks.set(token, newLink);
    }

    const fullUrl = `${process.env.APP_URL || 'http://localhost:5173'}/demo/${token}`;

    res.status(201).json({
      success: true,
      message: 'Client demo link created successfully',
      link: {
        token,
        url: fullUrl,
        hasPasscode: Boolean(passcode),
        expiresAt,
        viewCount: newLink.viewCount || 0
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getClientLinkData = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const isMongoConnected = mongoose.connection.readyState === 1;

    let link: any;
    if (isMongoConnected) {
      link = await ClientLink.findOne({ token, isActive: true }).populate('projectId');
    } else {
      link = mockClientLinks.get(token);
    }

    if (!link) {
      return res.status(404).json({ success: false, message: 'Client demo link not found or expired' });
    }

    if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
      return res.status(410).json({ success: false, message: 'This demo link has expired' });
    }

    // Check if passcode is required
    const requiresPasscode = Boolean(link.passcode);

    // Increment view count
    if (isMongoConnected) {
      await ClientLink.findByIdAndUpdate(link._id, { $inc: { viewCount: 1 } });
    } else {
      link.viewCount = (link.viewCount || 0) + 1;
    }

    // Rich mock project fallback for offline client portal rendering
    const project = link.projectId && typeof link.projectId === 'object' ? link.projectId : {
      id: 'proj_caresprint',
      slug: 'caresprint',
      name: 'CareSprint',
      tagline: 'Instant Telehealth & Encrypted Medical Records Platform',
      description: 'On-demand healthcare platform providing real-time doctor appointments, WebRTC video consultations, encrypted patient records, and instant prescription downloads.',
      category: 'Healthcare SaaS',
      techStack: ['React 18', 'Node.js', 'Socket.IO', 'MongoDB', 'Razorpay', 'WebRTC'],
      status: 'DEVELOPMENT',
      visibility: 'PUBLIC',
      repoUrl: 'https://github.com/nexora/caresprint',
      demoUrl: 'https://caresprint.example.com',
      progress: 85,
      coverUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
      screenshots: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200',
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200'
      ],
      features: [
        'Real-time WebRTC 1080p HD Doctor Video Consultations',
        'End-to-End 256-bit Encrypted Medical Records Vault',
        'Instant Razorpay Payment & Digital Prescription PDF Generation',
        'Multi-clinic Appointment Scheduling & Automated SMS Alerts'
      ],
      team: [
        { name: 'MD Zaved Akhtar', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
        { name: 'Elena Rostova', role: 'UI/UX Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
        { name: 'Marcus Vance', role: 'Frontend Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
      ]
    };

    res.json({
      success: true,
      requiresPasscode,
      viewCount: link.viewCount,
      project: requiresPasscode ? { name: project.name, category: project.category } : project
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyClientLinkPasscode = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { passcode } = req.body;

    const isMongoConnected = mongoose.connection.readyState === 1;
    let link: any = isMongoConnected
      ? await ClientLink.findOne({ token, isActive: true }).populate('projectId')
      : mockClientLinks.get(token);

    if (!link) {
      return res.status(404).json({ success: false, message: 'Demo link not found' });
    }

    if (link.passcode && link.passcode !== passcode) {
      return res.status(401).json({ success: false, message: 'Invalid passcode provided' });
    }

    const project = link.projectId && typeof link.projectId === 'object' ? link.projectId : {
      id: 'proj_caresprint',
      slug: 'caresprint',
      name: 'CareSprint',
      tagline: 'Instant Telehealth & Encrypted Medical Records Platform',
      description: 'On-demand healthcare platform providing real-time doctor appointments, WebRTC video consultations, encrypted patient records, and instant prescription downloads.',
      category: 'Healthcare SaaS',
      techStack: ['React 18', 'Node.js', 'Socket.IO', 'MongoDB', 'Razorpay', 'WebRTC'],
      status: 'DEVELOPMENT',
      visibility: 'PUBLIC',
      repoUrl: 'https://github.com/nexora/caresprint',
      demoUrl: 'https://caresprint.example.com',
      progress: 85,
      coverUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
      screenshots: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200',
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200'
      ],
      features: [
        'Real-time WebRTC 1080p HD Doctor Video Consultations',
        'End-to-End 256-bit Encrypted Medical Records Vault',
        'Instant Razorpay Payment & Digital Prescription PDF Generation',
        'Multi-clinic Appointment Scheduling & Automated SMS Alerts'
      ],
      team: [
        { name: 'MD Zaved Akhtar', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
        { name: 'Elena Rostova', role: 'UI/UX Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
        { name: 'Marcus Vance', role: 'Frontend Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
      ]
    };

    res.json({
      success: true,
      verified: true,
      project
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
