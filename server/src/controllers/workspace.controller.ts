import { Request, Response } from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { Workspace } from '../models/Workspace.js';
import { WorkspaceMember } from '../models/WorkspaceMember.js';
import { Invitation } from '../models/Invitation.js';
import { User } from '../models/User.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

// Decoupled Mock Roster
let mockMembersDatabase = [
  { id: '1', name: 'MD Zaved Akhtar', email: 'mdzavedakhtar620@gmail.com', role: 'OWNER', status: 'Active', skills: ['React', 'Next.js', 'Node.js', 'Python', 'Generative AI', 'RAG'], joinedAt: new Date().toISOString() },
  { id: '2', name: 'Rahul Sharma', email: 'rahul@zansta.dev', role: 'ADMIN', status: 'Active', skills: ['React', 'Framer Motion', 'Tailwind'], joinedAt: new Date().toISOString() },
  { id: '3', name: 'Aman Deep', email: 'aman@zansta.dev', role: 'MEMBER', status: 'Active', skills: ['Node.js', 'Socket.IO', 'Express'], joinedAt: new Date().toISOString() },
  { id: '4', name: 'Acme Client User', email: 'client@acme.com', role: 'CLIENT', status: 'Invited', skills: ['Client Review'], joinedAt: new Date().toISOString() },
];

let mockInvitations: any[] = [];

// @desc    Get Workspace Overview Metrics & Settings
// @route   GET /api/v1/workspaces/current
export const getWorkspaceOverview = async (req: AuthenticatedRequest, res: Response) => {
  return res.status(200).json({
    success: true,
    workspace: {
      id: 'ws_zansta_core',
      name: 'Zansta Core Team',
      slug: 'zansta-core',
      metrics: {
        totalProjects: 12,
        activeProjects: 8,
        completedProjects: 4,
        teamMembers: mockMembersDatabase.length,
        pendingTasks: 28,
        githubSyncRate: '99.8%',
      },
    },
  });
};

// @desc    Get Workspace Team Roster
// @route   GET /api/v1/workspaces/current/members
export const getMembers = async (req: AuthenticatedRequest, res: Response) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected) {
    const members = await WorkspaceMember.find().populate('userId', 'name email role avatar skills github linkedin');
    return res.status(200).json({
      success: true,
      members,
    });
  } else {
    return res.status(200).json({
      success: true,
      members: mockMembersDatabase,
    });
  }
};

// @desc    Invite Team Member (Generates tokenized /invite/:token)
// @route   POST /api/v1/workspaces/current/invite
export const createInvitation = async (req: AuthenticatedRequest, res: Response) => {
  const { email, role } = req.body;

  const token = crypto.randomBytes(24).toString('hex');
  const inviteUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/invite/${token}`;

  const invitation = {
    id: `inv_${Date.now()}`,
    email: email.toLowerCase(),
    role: role || 'MEMBER',
    token,
    inviteUrl,
    status: 'PENDING',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  mockInvitations.push(invitation);

  return res.status(201).json({
    success: true,
    message: 'Invitation link generated successfully',
    invitation,
  });
};

// @desc    Update Member Role
// @route   PUT /api/v1/workspaces/current/members/:id/role
export const updateMemberRole = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  const member = mockMembersDatabase.find((m) => m.id === id || m.email === id);
  if (member) {
    member.role = role;
  }

  return res.status(200).json({
    success: true,
    message: 'Member role updated successfully',
    members: mockMembersDatabase,
  });
};

// @desc    Update Member Profile Details
// @route   PUT /api/v1/workspaces/current/members/:id
export const updateMember = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const member = mockMembersDatabase.find((m) => m.id === id || m.email === id);
  if (member) {
    Object.assign(member, updates);
  }

  return res.status(200).json({
    success: true,
    message: 'Member profile updated successfully',
    members: mockMembersDatabase,
  });
};

// @desc    Remove Member from Workspace
// @route   DELETE /api/v1/workspaces/current/members/:id
export const removeMember = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  mockMembersDatabase = mockMembersDatabase.filter((m) => m.id !== id && m.email !== id);

  return res.status(200).json({
    success: true,
    message: 'Member removed from workspace',
    members: mockMembersDatabase,
  });
};
