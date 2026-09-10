import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { ProjectRequest } from '../models/ProjectRequest.js';
import mongoose from 'mongoose';

// In-memory agency data store for standalone execution
let mockProjectRequestsDatabase = [
  {
    id: 'req_301',
    name: 'Sarah Jenkins',
    company: 'Apex Health Systems',
    email: 'sarah@apexhealth.org',
    projectType: 'Healthcare SaaS',
    budget: '$50k+',
    timeline: '3 Months',
    description: 'We need an enterprise WebRTC patient portal with HIPAA compliant FHIR EHR integrations.',
    requirements: 'SOC2 Type II compliance, WebRTC 1080p, iOS & Android React Native apps',
    status: 'NEW',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
  },
  {
    id: 'req_302',
    name: 'David Vance',
    company: 'Quantum Trading Labs',
    email: 'david@quantumlabs.io',
    projectType: 'FinTech Platform',
    budget: '$50k+',
    timeline: '2 Months',
    description: 'Algorithmic liquidity aggregation gateway with low latency WebSocket order book streams.',
    requirements: 'Sub-millisecond execution, Kafka event bus, React 18 high-frequency charts',
    status: 'PROPOSAL',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: 'req_303',
    name: 'Elena Rostova',
    company: 'SaaSFlow Studio',
    email: 'elena@saasflow.dev',
    projectType: 'AI Solutions',
    budget: '$15k-$50k',
    timeline: '6 Weeks',
    description: 'Autonomous LLM agent microservice for automated pull request inspection and code refactoring.',
    requirements: 'OpenAI API, Vector database embeddings, GitHub Webhook integration',
    status: 'IN_PROGRESS',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
  }
];

const mockAgencyClients = [
  {
    id: 'cli_501',
    name: 'Dr. Arthur Pendelton',
    company: 'CareSprint Telehealth',
    email: 'arthur@telehealth.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    activeProjects: ['CareSprint'],
    totalSpent: '$45,000',
    status: 'ACTIVE',
    joinedDate: '2026-01-15'
  },
  {
    id: 'cli_502',
    name: 'David Vance',
    company: 'Quantum Trading Labs',
    email: 'david@quantumlabs.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    activeProjects: ['VortexFin'],
    totalSpent: '$68,000',
    status: 'ACTIVE',
    joinedDate: '2025-11-10'
  }
];

const mockAgencyProposals = [
  {
    id: 'prop_701',
    title: 'Enterprise Telehealth & HIPAA Encrypted Records Platform',
    clientName: 'CareSprint Telehealth',
    value: '$45,000',
    status: 'APPROVED',
    deliverables: [
      'WebRTC 1080p Video Consultation Engine',
      'Client-Side 256-bit Encrypted Medical Records Vault',
      'Instant Prescription PDF Generator & QR Verifier'
    ],
    milestones: [
      { phase: 'Phase 1: Architecture & UI System', status: 'COMPLETED', dueDate: '2026-02-01' },
      { phase: 'Phase 2: Real-time WebRTC Stream Mesh', status: 'COMPLETED', dueDate: '2026-02-20' },
      { phase: 'Phase 3: HIPAA Encryption Vault', status: 'IN_PROGRESS', dueDate: '2026-03-15' }
    ]
  }
];

export const submitProjectRequest = async (req: Request, res: Response) => {
  try {
    const { name, company, email, projectType, budget, timeline, description, requirements } = req.body;

    if (!name || !email || !description) {
      return res.status(400).json({ success: false, message: 'Name, email, and project description are required' });
    }

    const isMongoConnected = mongoose.connection.readyState === 1;
    let requestItem: any;

    if (isMongoConnected) {
      requestItem = await ProjectRequest.create({
        name,
        company: company || '',
        email,
        projectType: projectType || 'SaaS Development',
        budget: budget || '$15k-$50k',
        timeline: timeline || '1 Month',
        description,
        requirements: requirements || '',
        status: 'NEW'
      });
    } else {
      requestItem = {
        id: `req_${Date.now()}`,
        name,
        company: company || '',
        email,
        projectType: projectType || 'SaaS Development',
        budget: budget || '$15k-$50k',
        timeline: timeline || '1 Month',
        description,
        requirements: requirements || '',
        status: 'NEW',
        createdAt: new Date().toISOString()
      };
      mockProjectRequestsDatabase.unshift(requestItem);
    }

    res.status(201).json({
      success: true,
      message: 'Project request submitted successfully! A ZANSTA partner will review your inquiry shortly.',
      request: requestItem
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectRequests = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const isMongoConnected = mongoose.connection.readyState === 1;
    let requests: any[] = [];

    if (isMongoConnected) {
      requests = await ProjectRequest.find().sort({ createdAt: -1 });
    }

    if (!requests || requests.length === 0) {
      requests = mockProjectRequestsDatabase;
    }

    res.json({
      success: true,
      count: requests.length,
      requests
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRequestStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      await ProjectRequest.findByIdAndUpdate(id, { status });
    } else {
      const reqItem = mockProjectRequestsDatabase.find(r => r.id === id);
      if (reqItem) {
        reqItem.status = status;
      }
    }

    res.json({
      success: true,
      message: `Project request status updated to ${status}`
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAgencyClients = async (req: AuthenticatedRequest, res: Response) => {
  try {
    res.json({
      success: true,
      count: mockAgencyClients.length,
      clients: mockAgencyClients
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAgencyProposals = async (req: AuthenticatedRequest, res: Response) => {
  try {
    res.json({
      success: true,
      count: mockAgencyProposals.length,
      proposals: mockAgencyProposals
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
