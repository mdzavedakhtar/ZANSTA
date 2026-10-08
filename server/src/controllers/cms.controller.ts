import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { CMSProject } from '../models/CMSProject.js';
import { CMSTeamMember } from '../models/CMSTeamMember.js';
import { CMSService } from '../models/CMSService.js';
import { CMSClientDemo } from '../models/CMSClientDemo.js';
import { CMSReview } from '../models/CMSReview.js';
import { CMSLandingContent } from '../models/CMSLandingContent.js';
import { ContactEnquiry } from '../models/ContactEnquiry.js';
import { DemoRequest } from '../models/DemoRequest.js';
import { CMSActivityLog } from '../models/CMSActivityLog.js';
import { CMSBanner } from '../models/CMSBanner.js';
import { broadcastCmsEvent } from '../sockets/index.js';
import {
  defaultProjects,
  defaultTeamMembers,
  defaultServices,
  defaultDemos,
  defaultReviews,
  defaultLandingContent,
  defaultEnquiries,
  defaultDemoRequests,
} from '../config/seed.js';
import {
  sendContactNotificationToAdmin,
  sendContactConfirmationToClient,
  sendDemoRequestNotificationToAdmin,
  sendDemoRequestConfirmationToClient,
  sendCustomEmail,
} from '../services/email.service.js';

export const defaultBanners = [
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
  },
  {
    id: 'ban_ai_agents',
    title: '🤖 AUTOMATE YOUR WORKFLOW WITH ENTERPRISE GENERATIVE AI AGENTS',
    subtitle: 'Multi-Agent LLM Orchestration & Custom Vector Database Integration',
    discountText: 'NEW RELEASE',
    badgeText: '✨ AI SUITE',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    targetUrl: '/contact',
    ctaText: 'Build AI Platform',
    isVisible: true,
    order: 2,
  },
  {
    id: 'ban_ui_design',
    title: '🎨 HIGH-CONVERTING 2026 DARK UI/UX & FLUID MOTION ARCHITECTURE',
    subtitle: 'Pixel-Perfect Modern Interfaces Crafted for Startups & Scaleups',
    discountText: 'LIMITED SLOTS',
    badgeText: '⭐ TOP RATED',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop',
    targetUrl: '/contact',
    ctaText: 'Book Design Sprint',
    isVisible: true,
    order: 3,
  },
];

// In-memory fallback caches if MongoDB is in fallback mode
let memoryProjects: any[] = [...defaultProjects];
let memoryTeam: any[] = [...defaultTeamMembers];
let memoryServices: any[] = [...defaultServices];
let memoryDemos: any[] = [...defaultDemos];
let memoryReviews: any[] = [...defaultReviews];
let memoryLanding: any = { ...defaultLandingContent };
let memoryEnquiries: any[] = [...defaultEnquiries];
let memoryDemoRequests: any[] = [...defaultDemoRequests];
let memoryBanners: any[] = [...defaultBanners];
let memoryActivities: any[] = [];

const isDbConnected = () => mongoose.connection.readyState === 1;

// Helper to log activities
const recordActivity = async (user: string, action: string, target: string, type: string) => {
  const item = {
    id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    timestamp: new Date(),
    user,
    action,
    target,
    type,
  };
  if (isDbConnected()) {
    try {
      await CMSActivityLog.create(item);
    } catch (e) {
      console.error('Error logging activity to DB', e);
    }
  }
  memoryActivities.unshift(item);
  if (memoryActivities.length > 50) memoryActivities.pop();
};

/* =========================================================================
   1. PROJECTS CMS CONTROLLERS
   ========================================================================= */
export const getProjects = async (req: Request, res: Response) => {
  try {
    const { status, category, isFeatured, isVisible, isClientProject, search } = req.query;

    let projects: any[] = [];
    if (isDbConnected()) {
      const filter: any = {};
      if (status && status !== 'ALL') {
        if (status === 'ACTIVE') {
          filter.status = { $in: ['IN_PROGRESS', 'LIVE'] };
        } else {
          filter.status = status;
        }
      }
      if (category && category !== 'ALL') filter.category = category;
      if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
      if (isVisible !== undefined) filter.isVisible = isVisible === 'true';
      if (isClientProject !== undefined) filter.isClientProject = isClientProject === 'true';

      if (search) {
        const regex = new RegExp(String(search), 'i');
        filter.$or = [
          { name: regex },
          { shortDescription: regex },
          { description: regex },
          { clientName: regex },
          { techStack: regex },
        ];
      }

      projects = await CMSProject.find(filter).sort({ order: 1, createdAt: -1 });
    } else {
      projects = [...memoryProjects];
      projects.sort((a, b) => (a.order || 0) - (b.order || 0));
      if (status && status !== 'ALL') {
        if (status === 'ACTIVE') {
          projects = projects.filter((p) => p.status === 'IN_PROGRESS' || p.status === 'LIVE');
        } else {
          projects = projects.filter((p) => p.status === status);
        }
      }
      if (category && category !== 'ALL') projects = projects.filter((p) => p.category === category);
      if (isFeatured !== undefined) projects = projects.filter((p) => String(p.isFeatured) === String(isFeatured));
      if (isVisible !== undefined) projects = projects.filter((p) => String(p.isVisible) === String(isVisible));
      if (isClientProject !== undefined) projects = projects.filter((p) => String(p.isClientProject) === String(isClientProject));
      if (search) {
        const q = String(search).toLowerCase();
        projects = projects.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q) ||
            (p.clientName && p.clientName.toLowerCase().includes(q))
        );
      }
    }

    res.json({ success: true, count: projects.length, data: projects });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const getProjectByIdOrSlug = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let project: any = null;

    if (isDbConnected()) {
      project = await CMSProject.findOne({
        $or: [{ id }, { slug: id.toLowerCase() }],
      });
    }

    if (!project) {
      project = memoryProjects.find((p) => p.id === id || p.slug === id.toLowerCase());
    }

    if (!project) {
      return res.status(404).json({ success: false, error: { message: 'Project not found' } });
    }

    res.json({ success: true, data: project });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    let rawSlug = (data.slug || data.name || 'project')
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    if (!rawSlug) rawSlug = `project-${Date.now().toString().slice(-6)}`;
    
    const id = data.id || `proj_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    let newProject: any;
    if (isDbConnected()) {
      // Ensure unique slug
      let slug = rawSlug;
      const existing = await CMSProject.findOne({ slug });
      if (existing) {
        slug = `${rawSlug}-${Date.now().toString().slice(-4)}`;
      }

      const count = await CMSProject.countDocuments();
      const order =
        data.order !== undefined && data.order !== null && !isNaN(Number(data.order))
          ? Number(data.order)
          : count + 1;

      newProject = await CMSProject.create({
        ...data,
        id,
        slug,
        order,
      });
    } else {
      newProject = {
        ...data,
        id,
        slug: rawSlug,
        order:
          data.order !== undefined && data.order !== null && !isNaN(Number(data.order))
            ? Number(data.order)
            : memoryProjects.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryProjects.push(newProject);
    }

    await recordActivity('MD Zaved Akhtar', 'created project', newProject.name, 'project');
    broadcastCmsEvent('project', newProject);
    res.status(201).json({ success: true, data: newProject, message: 'Project created successfully' });
  } catch (error: any) {
    console.error('Error creating project:', error);
    res.status(500).json({ success: false, error: { message: error.message || 'Failed to create project' } });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (updates.order !== undefined && updates.order !== null && !isNaN(Number(updates.order))) {
      updates.order = Number(updates.order);
    }

    let updatedProject: any = null;
    if (isDbConnected()) {
      updatedProject = await CMSProject.findOneAndUpdate(
        { $or: [{ id }, { slug: id.toLowerCase() }] },
        { ...updates, updatedAt: new Date() },
        { new: true }
      );
    }

    // Update in memory fallback
    const idx = memoryProjects.findIndex((p) => p.id === id || p.slug === id.toLowerCase());
    if (idx !== -1) {
      memoryProjects[idx] = { ...memoryProjects[idx], ...updates, updatedAt: new Date().toISOString() };
      if (!updatedProject) updatedProject = memoryProjects[idx];
    }

    if (!updatedProject) {
      return res.status(404).json({ success: false, error: { message: 'Project not found' } });
    }

    await recordActivity('MD Zaved Akhtar', 'updated project', updatedProject.name, 'project');
    broadcastCmsEvent('project', updatedProject);
    res.json({ success: true, data: updatedProject, message: 'Project updated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let name = id;

    if (isDbConnected()) {
      const proj = await CMSProject.findOneAndDelete({ $or: [{ id }, { slug: id.toLowerCase() }] });
      if (proj) name = proj.name;
    }

    const target = memoryProjects.find((p) => p.id === id || p.slug === id.toLowerCase());
    if (target) name = target.name;
    memoryProjects = memoryProjects.filter((p) => p.id !== id && p.slug !== id.toLowerCase());

    await recordActivity('MD Zaved Akhtar', 'deleted project', name, 'project');
    broadcastCmsEvent('project', { id, deleted: true });
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const reorderProjects = async (req: Request, res: Response) => {
  try {
    const { projects } = req.body; // Array of { id, order } or array of full projects
    if (Array.isArray(projects)) {
      if (isDbConnected()) {
        for (let i = 0; i < projects.length; i++) {
          const item = projects[i];
          const orderNum = item.order !== undefined && !isNaN(Number(item.order)) ? Number(item.order) : i + 1;
          await CMSProject.findOneAndUpdate(
            { $or: [{ id: item.id }, { slug: item.id }] },
            { order: orderNum }
          );
        }
      }
      memoryProjects = projects.map((p, idx) => ({
        ...p,
        order: p.order !== undefined && !isNaN(Number(p.order)) ? Number(p.order) : idx + 1,
      }));
    }
    await recordActivity('MD Zaved Akhtar', 'reordered projects', 'Project Showcase Order', 'project');
    broadcastCmsEvent('project', { reordered: true, projects: memoryProjects });
    res.json({ success: true, message: 'Projects reordered successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

/* =========================================================================
   2. TEAM MEMBERS CMS CONTROLLERS
   ========================================================================= */
export const getTeamMembers = async (req: Request, res: Response) => {
  try {
    const { isFeatured, isVisible, search } = req.query;

    let members: any[] = [];
    if (isDbConnected()) {
      const filter: any = {};
      if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
      if (isVisible !== undefined) filter.isVisible = isVisible === 'true';
      if (search) {
        const regex = new RegExp(String(search), 'i');
        filter.$or = [{ name: regex }, { role: regex }, { bio: regex }, { techStack: regex }];
      }
      members = await CMSTeamMember.find(filter).sort({ order: 1, createdAt: -1 });
    } else {
      members = [...memoryTeam];
      members.sort((a, b) => (a.order || 0) - (b.order || 0));
      if (isFeatured !== undefined) members = members.filter((m) => String(m.isFeatured) === String(isFeatured));
      if (isVisible !== undefined) members = members.filter((m) => String(m.isVisible) === String(isVisible));
      if (search) {
        const q = String(search).toLowerCase();
        members = members.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.role.toLowerCase().includes(q) ||
            m.bio.toLowerCase().includes(q)
        );
      }
    }

    res.json({ success: true, count: members.length, data: members });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const getTeamMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let member: any = null;

    if (isDbConnected()) {
      member = await CMSTeamMember.findOne({ id });
    }
    if (!member) {
      member = memoryTeam.find((m) => m.id === id);
    }
    if (!member) {
      return res.status(404).json({ success: false, error: { message: 'Team member not found' } });
    }
    res.json({ success: true, data: member });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const createTeamMember = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = data.id || `team_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    let newMember: any;
    if (isDbConnected()) {
      const count = await CMSTeamMember.countDocuments();
      const order = data.order !== undefined ? data.order : count + 1;
      newMember = await CMSTeamMember.create({ ...data, id, order });
    } else {
      newMember = {
        ...data,
        id,
        order: data.order !== undefined ? data.order : memoryTeam.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryTeam.push(newMember);
    }

    await recordActivity('MD Zaved Akhtar', 'added team member', newMember.name, 'team');
    broadcastCmsEvent('team', newMember);
    res.status(201).json({ success: true, data: newMember, message: 'Team member added successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const updateTeamMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    let updatedMember: any = null;
    if (isDbConnected()) {
      updatedMember = await CMSTeamMember.findOneAndUpdate(
        { id },
        { ...updates, updatedAt: new Date() },
        { new: true }
      );
    }

    const idx = memoryTeam.findIndex((m) => m.id === id);
    if (idx !== -1) {
      memoryTeam[idx] = { ...memoryTeam[idx], ...updates, updatedAt: new Date().toISOString() };
      if (!updatedMember) updatedMember = memoryTeam[idx];
    }

    if (!updatedMember) {
      return res.status(404).json({ success: false, error: { message: 'Team member not found' } });
    }

    await recordActivity('MD Zaved Akhtar', 'updated team member', updatedMember.name, 'team');
    broadcastCmsEvent('team', updatedMember);
    res.json({ success: true, data: updatedMember, message: 'Team member updated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const deleteTeamMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let name = id;

    if (isDbConnected()) {
      const target = await CMSTeamMember.findOneAndDelete({ id });
      if (target) name = target.name;
    }

    const target = memoryTeam.find((m) => m.id === id);
    if (target) name = target.name;
    memoryTeam = memoryTeam.filter((m) => m.id !== id);

    await recordActivity('MD Zaved Akhtar', 'deleted team member', name, 'team');
    broadcastCmsEvent('team', { id, deleted: true });
    res.json({ success: true, message: 'Team member deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const reorderTeamMembers = async (req: Request, res: Response) => {
  try {
    const { members } = req.body;
    if (Array.isArray(members)) {
      if (isDbConnected()) {
        for (let i = 0; i < members.length; i++) {
          await CMSTeamMember.findOneAndUpdate({ id: members[i].id }, { order: i + 1 });
        }
      }
      memoryTeam = members.map((m, idx) => ({ ...m, order: idx + 1 }));
    }
    await recordActivity('MD Zaved Akhtar', 'reordered team members', 'Team Showcase Order', 'team');
    broadcastCmsEvent('team', { reordered: true, members: memoryTeam });
    res.json({ success: true, message: 'Team members reordered successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

/* =========================================================================
   3. SERVICES CMS CONTROLLERS
   ========================================================================= */
export const getServices = async (req: Request, res: Response) => {
  try {
    let services: any[] = [];
    if (isDbConnected()) {
      services = await CMSService.find().sort({ order: 1, createdAt: -1 });
    } else {
      services = [...memoryServices].sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    res.json({ success: true, count: services.length, data: services });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let service: any = null;
    if (isDbConnected()) {
      service = await CMSService.findOne({ id });
    }
    if (!service) service = memoryServices.find((s) => s.id === id);
    if (!service) return res.status(404).json({ success: false, error: { message: 'Service not found' } });
    res.json({ success: true, data: service });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = data.id || `svc_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    let newService: any;
    if (isDbConnected()) {
      const count = await CMSService.countDocuments();
      const order =
        data.order !== undefined && data.order !== null && !isNaN(Number(data.order))
          ? Number(data.order)
          : count + 1;
      newService = await CMSService.create({ ...data, id, order });
    } else {
      newService = {
        ...data,
        id,
        order:
          data.order !== undefined && data.order !== null && !isNaN(Number(data.order))
            ? Number(data.order)
            : memoryServices.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryServices.push(newService);
    }

    await recordActivity('MD Zaved Akhtar', 'created agency service', newService.name, 'service');
    broadcastCmsEvent('service', newService);
    res.status(201).json({ success: true, data: newService, message: 'Service created successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (updates.order !== undefined && updates.order !== null && !isNaN(Number(updates.order))) {
      updates.order = Number(updates.order);
    }

    let updatedService: any = null;
    if (isDbConnected()) {
      updatedService = await CMSService.findOneAndUpdate({ id }, { ...updates, updatedAt: new Date() }, { new: true });
    }

    const idx = memoryServices.findIndex((s) => s.id === id);
    if (idx !== -1) {
      memoryServices[idx] = { ...memoryServices[idx], ...updates, updatedAt: new Date().toISOString() };
      if (!updatedService) updatedService = memoryServices[idx];
    }

    if (!updatedService) return res.status(404).json({ success: false, error: { message: 'Service not found' } });

    await recordActivity('MD Zaved Akhtar', 'updated agency service', updatedService.name, 'service');
    broadcastCmsEvent('service', updatedService);
    res.json({ success: true, data: updatedService, message: 'Service updated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const reorderServices = async (req: Request, res: Response) => {
  try {
    const { services } = req.body;
    if (Array.isArray(services)) {
      if (isDbConnected()) {
        for (let i = 0; i < services.length; i++) {
          const item = services[i];
          const orderNum = item.order !== undefined && !isNaN(Number(item.order)) ? Number(item.order) : i + 1;
          await CMSService.findOneAndUpdate({ id: item.id }, { order: orderNum });
        }
      }
      memoryServices = services.map((s, idx) => ({
        ...s,
        order: s.order !== undefined && !isNaN(Number(s.order)) ? Number(s.order) : idx + 1,
      }));
    }
    await recordActivity('MD Zaved Akhtar', 'reordered services', 'Services Showcase Order', 'service');
    broadcastCmsEvent('service', { reordered: true, services: memoryServices });
    res.json({ success: true, message: 'Services reordered successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let name = id;

    if (isDbConnected()) {
      const target = await CMSService.findOneAndDelete({ id });
      if (target) name = target.name;
    }

    const target = memoryServices.find((s) => s.id === id);
    if (target) name = target.name;
    memoryServices = memoryServices.filter((s) => s.id !== id);

    await recordActivity('MD Zaved Akhtar', 'deleted agency service', name, 'service');
    broadcastCmsEvent('service', { id, deleted: true });
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

/* =========================================================================
   4. CLIENT DEMOS CMS CONTROLLERS
   ========================================================================= */
export const getDemos = async (req: Request, res: Response) => {
  try {
    const { status, visibility, search } = req.query;

    let demos: any[] = [];
    if (isDbConnected()) {
      const filter: any = {};
      if (status && status !== 'ALL') filter.status = status;
      if (visibility && visibility !== 'ALL') filter.visibility = visibility;
      if (search) {
        const regex = new RegExp(String(search), 'i');
        filter.$or = [{ title: regex }, { clientName: regex }, { projectName: regex }, { description: regex }];
      }
      demos = await CMSClientDemo.find(filter).sort({ createdAt: -1 });
    } else {
      demos = [...memoryDemos];
      demos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      if (status && status !== 'ALL') demos = demos.filter((d) => d.status === status);
      if (visibility && visibility !== 'ALL') demos = demos.filter((d) => d.visibility === visibility);
      if (search) {
        const q = String(search).toLowerCase();
        demos = demos.filter(
          (d) =>
            d.title.toLowerCase().includes(q) ||
            d.clientName.toLowerCase().includes(q) ||
            (d.projectName && d.projectName.toLowerCase().includes(q))
        );
      }
    }

    res.json({ success: true, count: demos.length, data: demos });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const getDemoByTokenOrId = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    let demo: any = null;

    if (isDbConnected()) {
      demo = await CMSClientDemo.findOne({ $or: [{ token }, { id: token }] });
    }
    if (!demo) {
      demo = memoryDemos.find((d) => d.token === token || d.id === token);
    }
    if (!demo) {
      return res.status(404).json({ success: false, error: { message: 'Demo not found' } });
    }
    res.json({ success: true, data: demo });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const createDemo = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const generatedToken =
      data.token || `${data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`;
    const id = data.id || `demo_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    let newDemo: any;
    if (isDbConnected()) {
      newDemo = await CMSClientDemo.create({
        ...data,
        id,
        token: generatedToken,
        viewCount: 0,
      });
    } else {
      newDemo = {
        ...data,
        id,
        token: generatedToken,
        viewCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryDemos.unshift(newDemo);
    }

    await recordActivity('MD Zaved Akhtar', 'created client demo', newDemo.title, 'demo');
    broadcastCmsEvent('demo', newDemo);
    res.status(201).json({ success: true, data: newDemo, message: 'Demo created successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const updateDemo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    let updatedDemo: any = null;
    if (isDbConnected()) {
      updatedDemo = await CMSClientDemo.findOneAndUpdate(
        { $or: [{ id }, { token: id }] },
        { ...updates, updatedAt: new Date() },
        { new: true }
      );
    }

    const idx = memoryDemos.findIndex((d) => d.id === id || d.token === id);
    if (idx !== -1) {
      memoryDemos[idx] = { ...memoryDemos[idx], ...updates, updatedAt: new Date().toISOString() };
      if (!updatedDemo) updatedDemo = memoryDemos[idx];
    }

    if (!updatedDemo) return res.status(404).json({ success: false, error: { message: 'Demo not found' } });

    await recordActivity('MD Zaved Akhtar', 'updated client demo', updatedDemo.title, 'demo');
    broadcastCmsEvent('demo', updatedDemo);
    res.json({ success: true, data: updatedDemo, message: 'Demo updated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const regenerateDemoToken = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let demoTitle = '';

    if (isDbConnected()) {
      const demo = await CMSClientDemo.findOne({ $or: [{ id }, { token: id }] });
      if (demo) {
        demoTitle = demo.title;
        const newToken = `${demo.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-6)}`;
        demo.token = newToken;
        await demo.save();
        await recordActivity('MD Zaved Akhtar', 'regenerated demo security token', demoTitle, 'demo');
        broadcastCmsEvent('demo', demo);
        return res.json({ success: true, token: newToken, message: 'Token regenerated successfully' });
      }
    }

    const target = memoryDemos.find((d) => d.id === id || d.token === id);
    if (target) {
      const newToken = `${target.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-6)}`;
      target.token = newToken;
      await recordActivity('MD Zaved Akhtar', 'regenerated demo security token', target.title, 'demo');
      broadcastCmsEvent('demo', target);
      return res.json({ success: true, token: newToken, message: 'Token regenerated successfully' });
    }

    res.status(404).json({ success: false, error: { message: 'Demo not found' } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const incrementDemoView = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    if (isDbConnected()) {
      await CMSClientDemo.findOneAndUpdate({ $or: [{ token }, { id: token }] }, { $inc: { viewCount: 1 } });
    }
    const target = memoryDemos.find((d) => d.token === token || d.id === token);
    if (target) target.viewCount = (target.viewCount || 0) + 1;
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const deleteDemo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let title = id;

    if (isDbConnected()) {
      const target = await CMSClientDemo.findOneAndDelete({ $or: [{ id }, { token: id }] });
      if (target) title = target.title;
    }

    const target = memoryDemos.find((d) => d.id === id || d.token === id);
    if (target) title = target.title;
    memoryDemos = memoryDemos.filter((d) => d.id !== id && d.token !== id);

    await recordActivity('MD Zaved Akhtar', 'deleted client demo', title, 'demo');
    broadcastCmsEvent('demo', { id, deleted: true });
    res.json({ success: true, message: 'Demo deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

/* =========================================================================
   5. REVIEWS CMS CONTROLLERS
   ========================================================================= */
export const getReviews = async (req: Request, res: Response) => {
  try {
    const { isFeatured, isVisible } = req.query;

    let reviews: any[] = [];
    if (isDbConnected()) {
      const filter: any = {};
      if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
      if (isVisible !== undefined) filter.isVisible = isVisible === 'true';
      reviews = await CMSReview.find(filter).sort({ order: 1, createdAt: -1 });
    } else {
      reviews = [...memoryReviews].sort((a, b) => (a.order || 0) - (b.order || 0));
      if (isFeatured !== undefined) reviews = reviews.filter((r) => String(r.isFeatured) === String(isFeatured));
      if (isVisible !== undefined) reviews = reviews.filter((r) => String(r.isVisible) === String(isVisible));
    }

    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let review: any = null;
    if (isDbConnected()) review = await CMSReview.findOne({ id });
    if (!review) review = memoryReviews.find((r) => r.id === id);
    if (!review) return res.status(404).json({ success: false, error: { message: 'Review not found' } });
    res.json({ success: true, data: review });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = data.id || `rev_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    let newReview: any;
    if (isDbConnected()) {
      const count = await CMSReview.countDocuments();
      const order = data.order !== undefined ? Number(data.order) : count + 1;
      newReview = await CMSReview.create({ ...data, id, order });
    } else {
      newReview = {
        ...data,
        id,
        order: data.order !== undefined ? Number(data.order) : memoryReviews.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryReviews.push(newReview);
    }

    await recordActivity('MD Zaved Akhtar', 'added client review', `${newReview.clientName} (${newReview.companyName})`, 'review');
    broadcastCmsEvent('review', newReview);
    res.status(201).json({ success: true, data: newReview, message: 'Review added successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.order !== undefined && updates.order !== null && !isNaN(Number(updates.order))) {
      updates.order = Number(updates.order);
    }

    let updatedReview: any = null;
    if (isDbConnected()) {
      updatedReview = await CMSReview.findOneAndUpdate({ id }, { ...updates, updatedAt: new Date() }, { new: true });
    }

    const idx = memoryReviews.findIndex((r) => r.id === id);
    if (idx !== -1) {
      memoryReviews[idx] = { ...memoryReviews[idx], ...updates, updatedAt: new Date().toISOString() };
      if (!updatedReview) updatedReview = memoryReviews[idx];
    }

    if (!updatedReview) return res.status(404).json({ success: false, error: { message: 'Review not found' } });

    await recordActivity('MD Zaved Akhtar', 'updated client review', updatedReview.clientName, 'review');
    broadcastCmsEvent('review', updatedReview);
    res.json({ success: true, data: updatedReview, message: 'Review updated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let name = id;

    if (isDbConnected()) {
      const target = await CMSReview.findOneAndDelete({ id });
      if (target) name = target.clientName;
    }

    const target = memoryReviews.find((r) => r.id === id);
    if (target) name = target.clientName;
    memoryReviews = memoryReviews.filter((r) => r.id !== id);

    await recordActivity('MD Zaved Akhtar', 'deleted client review', name, 'review');
    broadcastCmsEvent('review', { id, deleted: true });
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const reorderReviews = async (req: Request, res: Response) => {
  try {
    const { reviews } = req.body;
    if (Array.isArray(reviews)) {
      if (isDbConnected()) {
        for (let i = 0; i < reviews.length; i++) {
          const item = reviews[i];
          const orderNum = item.order !== undefined && !isNaN(Number(item.order)) ? Number(item.order) : i + 1;
          await CMSReview.findOneAndUpdate({ id: item.id }, { order: orderNum });
        }
      }
      memoryReviews = reviews.map((r, idx) => ({
        ...r,
        order: r.order !== undefined && !isNaN(Number(r.order)) ? Number(r.order) : idx + 1,
      }));
    }
    await recordActivity('MD Zaved Akhtar', 'reordered reviews', 'Client Reviews Order', 'review');
    broadcastCmsEvent('review', { reordered: true, reviews: memoryReviews });
    res.json({ success: true, message: 'Reviews reordered successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

/* =========================================================================
   6. LANDING PAGE CONTENT CONTROLLERS
   ========================================================================= */
export const getLandingContent = async (req: Request, res: Response) => {
  try {
    let content: any = null;
    if (isDbConnected()) {
      content = await CMSLandingContent.findOne().sort({ updatedAt: -1 });
    }
    if (!content) {
      content = memoryLanding;
    }
    res.json({ success: true, data: content });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const updateLandingContent = async (req: Request, res: Response) => {
  try {
    const updates = req.body;

    let updatedContent: any = null;
    if (isDbConnected()) {
      const existing = await CMSLandingContent.findOne();
      if (existing) {
        Object.assign(existing, updates);
        existing.updatedAt = new Date();
        updatedContent = await existing.save();
      } else {
        updatedContent = await CMSLandingContent.create({ ...updates, updatedAt: new Date() });
      }
    }

    memoryLanding = {
      ...memoryLanding,
      ...updates,
      sectionVisibility: {
        ...memoryLanding.sectionVisibility,
        ...(updates.sectionVisibility || {}),
      },
      updatedAt: new Date().toISOString(),
    };
    if (!updatedContent) updatedContent = memoryLanding;

    await recordActivity('MD Zaved Akhtar', 'updated landing page CMS content', 'Landing Page CMS', 'landing');
    broadcastCmsEvent('landing', updatedContent);
    res.json({ success: true, data: updatedContent, message: 'Landing page CMS content updated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

/* =========================================================================
   7. CONTACT ENQUIRIES CONTROLLERS
   ========================================================================= */
export const getEnquiries = async (req: Request, res: Response) => {
  try {
    let enquiries: any[] = [];
    if (isDbConnected()) {
      enquiries = await ContactEnquiry.find().sort({ createdAt: -1 });
    } else {
      enquiries = [...memoryEnquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const createEnquiry = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = `enq_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    let newEnquiry: any;
    if (isDbConnected()) {
      newEnquiry = await ContactEnquiry.create({ ...data, id, status: 'NEW' });
    } else {
      newEnquiry = { ...data, id, status: 'NEW', createdAt: new Date().toISOString() };
      memoryEnquiries.unshift(newEnquiry);
    }

    await recordActivity(newEnquiry.name, 'submitted project contact enquiry', newEnquiry.company || newEnquiry.email, 'enquiry');
    broadcastCmsEvent('enquiry', newEnquiry);

    // Send instant email notifications
    sendContactNotificationToAdmin(newEnquiry).catch((err) =>
      console.warn('[Email Notification] Admin alert failed:', err.message)
    );
    if (newEnquiry.email) {
      sendContactConfirmationToClient(newEnquiry).catch((err) =>
        console.warn('[Email Notification] Client confirmation failed:', err.message)
      );
    }

    res.status(201).json({ success: true, data: newEnquiry, message: 'Enquiry submitted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const updateEnquiryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    let updated: any = null;
    if (isDbConnected()) {
      updated = await ContactEnquiry.findOneAndUpdate({ id }, { status }, { new: true });
    }

    const idx = memoryEnquiries.findIndex((e) => e.id === id);
    if (idx !== -1) {
      memoryEnquiries[idx].status = status;
      if (!updated) updated = memoryEnquiries[idx];
    }

    if (!updated) return res.status(404).json({ success: false, error: { message: 'Enquiry not found' } });

    await recordActivity('MD Zaved Akhtar', `updated enquiry status to ${status}`, updated.name, 'enquiry');
    broadcastCmsEvent('enquiry', updated);
    res.json({ success: true, data: updated, message: 'Enquiry status updated' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const deleteEnquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let name = id;

    if (isDbConnected()) {
      const target = await ContactEnquiry.findOneAndDelete({ id });
      if (target) name = target.name;
    }

    const target = memoryEnquiries.find((e) => e.id === id);
    if (target) name = target.name;
    memoryEnquiries = memoryEnquiries.filter((e) => e.id !== id);

    await recordActivity('MD Zaved Akhtar', 'deleted contact enquiry', name, 'enquiry');
    broadcastCmsEvent('enquiry', { id, deleted: true });
    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

/* =========================================================================
   8. DEMO REQUESTS CONTROLLERS
   ========================================================================= */
export const getDemoRequests = async (req: Request, res: Response) => {
  try {
    let requests: any[] = [];
    if (isDbConnected()) {
      requests = await DemoRequest.find().sort({ createdAt: -1 });
    } else {
      requests = [...memoryDemoRequests].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    res.json({ success: true, count: requests.length, data: requests });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const createDemoRequest = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = `req_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    let newReq: any;
    if (isDbConnected()) {
      newReq = await DemoRequest.create({ ...data, id, status: 'NEW' });
    } else {
      newReq = { ...data, id, status: 'NEW', createdAt: new Date().toISOString() };
      memoryDemoRequests.unshift(newReq);
    }

    await recordActivity(newReq.name, 'submitted demo request', newReq.company || newReq.email, 'request');
    broadcastCmsEvent('demoRequest', newReq);

    // Send instant email notifications
    sendDemoRequestNotificationToAdmin(newReq).catch((err) =>
      console.warn('[Email Notification] Admin demo alert failed:', err.message)
    );
    if (newReq.email) {
      sendDemoRequestConfirmationToClient(newReq).catch((err) =>
        console.warn('[Email Notification] Client demo confirmation failed:', err.message)
      );
    }

    res.status(201).json({ success: true, data: newReq, message: 'Demo request submitted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const updateDemoRequestStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    let updated: any = null;
    if (isDbConnected()) {
      updated = await DemoRequest.findOneAndUpdate({ id }, { status }, { new: true });
    }

    const idx = memoryDemoRequests.findIndex((r) => r.id === id);
    if (idx !== -1) {
      memoryDemoRequests[idx].status = status;
      if (!updated) updated = memoryDemoRequests[idx];
    }

    if (!updated) return res.status(404).json({ success: false, error: { message: 'Demo request not found' } });

    await recordActivity('MD Zaved Akhtar', `updated demo request status to ${status}`, updated.name, 'request');
    broadcastCmsEvent('demoRequest', updated);
    res.json({ success: true, data: updated, message: 'Demo request status updated' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const deleteDemoRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let name = id;

    if (isDbConnected()) {
      const target = await DemoRequest.findOneAndDelete({ id });
      if (target) name = target.name;
    }

    const target = memoryDemoRequests.find((r) => r.id === id);
    if (target) name = target.name;
    memoryDemoRequests = memoryDemoRequests.filter((r) => r.id !== id);

    await recordActivity('MD Zaved Akhtar', 'deleted demo request', name, 'request');
    broadcastCmsEvent('demoRequest', { id, deleted: true });
    res.json({ success: true, message: 'Demo request deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

/* =========================================================================
   9. BANNERS & PROMO OFFERS CMS CONTROLLERS
   ========================================================================= */
export const getBanners = async (req: Request, res: Response) => {
  try {
    const { isVisible } = req.query;
    let banners: any[] = [];
    if (isDbConnected()) {
      const filter: any = {};
      if (isVisible !== undefined) filter.isVisible = isVisible === 'true';
      banners = await CMSBanner.find(filter).sort({ order: 1, createdAt: -1 });
      if (banners.length === 0) {
        // Seed memory banners if empty
        banners = memoryBanners;
      }
    } else {
      banners = [...memoryBanners].sort((a, b) => (a.order || 0) - (b.order || 0));
      if (isVisible !== undefined) banners = banners.filter((b) => String(b.isVisible) === String(isVisible));
    }
    res.json({ success: true, count: banners.length, data: banners });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const getBannerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let banner: any = null;
    if (isDbConnected()) banner = await CMSBanner.findOne({ id });
    if (!banner) banner = memoryBanners.find((b) => b.id === id);
    if (!banner) return res.status(404).json({ success: false, error: { message: 'Banner not found' } });
    res.json({ success: true, data: banner });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const createBanner = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = data.id || `ban_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    let newBanner: any;
    if (isDbConnected()) {
      const count = await CMSBanner.countDocuments();
      const order = data.order !== undefined && !isNaN(Number(data.order)) ? Number(data.order) : count + 1;
      newBanner = await CMSBanner.create({ ...data, id, order });
    } else {
      newBanner = {
        ...data,
        id,
        order: data.order !== undefined && !isNaN(Number(data.order)) ? Number(data.order) : memoryBanners.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryBanners.push(newBanner);
    }

    await recordActivity('MD Zaved Akhtar', 'created promo banner', newBanner.title, 'banner');
    broadcastCmsEvent('banner', newBanner);
    res.status(201).json({ success: true, data: newBanner, message: 'Promo banner created successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const updateBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (updates.order !== undefined && updates.order !== null && !isNaN(Number(updates.order))) {
      updates.order = Number(updates.order);
    }

    let updatedBanner: any = null;
    if (isDbConnected()) {
      updatedBanner = await CMSBanner.findOneAndUpdate({ id }, { ...updates, updatedAt: new Date() }, { new: true });
    }

    const idx = memoryBanners.findIndex((b) => b.id === id);
    if (idx !== -1) {
      memoryBanners[idx] = { ...memoryBanners[idx], ...updates, updatedAt: new Date().toISOString() };
      if (!updatedBanner) updatedBanner = memoryBanners[idx];
    }

    if (!updatedBanner) return res.status(404).json({ success: false, error: { message: 'Banner not found' } });

    await recordActivity('MD Zaved Akhtar', 'updated promo banner', updatedBanner.title, 'banner');
    broadcastCmsEvent('banner', updatedBanner);
    res.json({ success: true, data: updatedBanner, message: 'Promo banner updated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const deleteBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let title = id;

    if (isDbConnected()) {
      const target = await CMSBanner.findOneAndDelete({ id });
      if (target) title = target.title;
    }

    const target = memoryBanners.find((b) => b.id === id);
    if (target) title = target.title;
    memoryBanners = memoryBanners.filter((b) => b.id !== id);

    await recordActivity('MD Zaved Akhtar', 'deleted promo banner', title, 'banner');
    broadcastCmsEvent('banner', { id, deleted: true });
    res.json({ success: true, message: 'Promo banner deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const reorderBanners = async (req: Request, res: Response) => {
  try {
    const { banners } = req.body;
    if (Array.isArray(banners)) {
      if (isDbConnected()) {
        for (let i = 0; i < banners.length; i++) {
          const item = banners[i];
          const orderNum = item.order !== undefined && !isNaN(Number(item.order)) ? Number(item.order) : i + 1;
          await CMSBanner.findOneAndUpdate({ id: item.id }, { order: orderNum });
        }
      }
      memoryBanners = banners.map((b, idx) => ({
        ...b,
        order: b.order !== undefined && !isNaN(Number(b.order)) ? Number(b.order) : idx + 1,
      }));
    }
    await recordActivity('MD Zaved Akhtar', 'reordered promo banners', 'Promo Offers Slider Order', 'banner');
    broadcastCmsEvent('banner', { reordered: true, banners: memoryBanners });
    res.json({ success: true, message: 'Promo banners reordered successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

/* =========================================================================
   10. ACTIVITIES AUDIT CONTROLLERS
   ========================================================================= */
export const getActivities = async (req: Request, res: Response) => {
  try {
    let activities: any[] = [];
    if (isDbConnected()) {
      activities = await CMSActivityLog.find().sort({ timestamp: -1 }).limit(50);
      if (activities.length === 0) activities = memoryActivities;
    } else {
      activities = [...memoryActivities];
    }
    res.json({ success: true, count: activities.length, data: activities });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    const { user, action, target, type } = req.body;
    await recordActivity(user || 'MD Zaved Akhtar', action, target || '', type || 'project');
    res.status(201).json({ success: true, message: 'Activity logged' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const clearActivities = async (req: Request, res: Response) => {
  try {
    if (isDbConnected()) {
      await CMSActivityLog.deleteMany({});
    }
    memoryActivities = [];
    res.json({ success: true, message: 'Activity log cleared' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

/* =========================================================================
   11. CUSTOM EMAIL SENDER CONTROLLER
   ========================================================================= */
export const sendCustomEmailHandler = async (req: Request, res: Response) => {
  try {
    const { to, subject, message, senderName } = req.body;
    if (!to || !subject || !message) {
      return res.status(400).json({ success: false, error: { message: 'Recipient email, subject, and message are required' } });
    }
    await sendCustomEmail({ to, subject, message, senderName });
    await recordActivity('MD Zaved Akhtar', `sent email to ${to}`, subject, 'enquiry');
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

