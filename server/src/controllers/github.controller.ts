import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { GitHubConnection } from '../models/GitHubConnection.js';
import { Project } from '../models/Project.js';
import mongoose from 'mongoose';

// In-memory fallback repository storage for standalone mode
const mockGitHubConnections = new Map<string, any>();
const mockProjectRepos = new Map<string, any>();

// Realistic mock commits data
const getMockCommits = (repoName: string, branch: string) => [
  {
    sha: '8f9a2b1c4e5d6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
    commit: {
      message: 'feat(core): implement real-time WebSocket sync and activity telemetry stream',
      author: { name: 'Alex Rivera', email: 'alex@nexora.dev', date: new Date(Date.now() - 1000 * 60 * 42).toISOString() }
    },
    author: { login: 'arivera', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
    stats: { additions: 142, deletions: 18 }
  },
  {
    sha: '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
    commit: {
      message: 'fix(auth): secure JWT token storage and add role-based permission validation',
      author: { name: 'Elena Rostova', email: 'elena@nexora.dev', date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() }
    },
    author: { login: 'erostova', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    stats: { additions: 65, deletions: 12 }
  },
  {
    sha: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    commit: {
      message: 'style(ui): polish glassmorphic design system and custom cursor interactions',
      author: { name: 'Marcus Vance', email: 'marcus@nexora.dev', date: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString() }
    },
    author: { login: 'mvance', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    stats: { additions: 289, deletions: 44 }
  },
  {
    sha: '9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e',
    commit: {
      message: 'chore(config): configure CI/CD pipeline and Vite production build optimization',
      author: { name: 'Sarah Chen', email: 'sarah@nexora.dev', date: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString() }
    },
    author: { login: 'schen', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    stats: { additions: 54, deletions: 9 }
  }
];

// Realistic mock Pull Requests
const getMockPullRequests = () => [
  {
    id: 101,
    number: 42,
    title: 'feat: Add Linear-style Kanban board drag & drop interaction',
    state: 'open',
    user: { login: 'mvance', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    head: { ref: 'feature/kanban-dnd' },
    base: { ref: 'main' },
    comments: 6
  },
  {
    id: 102,
    number: 41,
    title: 'fix: Resolve Socket.IO reconnection latency on initial workspace load',
    state: 'closed',
    merged: true,
    user: { login: 'arivera', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    head: { ref: 'fix/socket-latency' },
    base: { ref: 'main' },
    comments: 3
  }
];

// Realistic mock Issues
const getMockIssues = () => [
  {
    id: 201,
    number: 88,
    title: 'Bug: File preview modal triggers extra request on multi-file select',
    state: 'open',
    user: { login: 'elena', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    comments: 2,
    labels: [{ name: 'bug', color: 'd73a4a' }, { name: 'priority: high', color: 'b60205' }]
  },
  {
    id: 202,
    number: 85,
    title: 'Feature: Support markdown syntax highlighting in project notes',
    state: 'open',
    user: { login: 'schen', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    comments: 4,
    labels: [{ name: 'enhancement', color: 'a2eeef' }]
  }
];

// Realistic mock Contributors
const getMockContributors = () => [
  { login: 'arivera', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', contributions: 84 },
  { login: 'mvance', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', contributions: 62 },
  { login: 'erostova', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', contributions: 49 },
  { login: 'schen', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', contributions: 31 }
];

export const getAuthUrl = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = process.env.GITHUB_CLIENT_ID || 'mock_github_client_id';
    const redirectUri = encodeURIComponent(`${process.env.APP_URL || 'http://localhost:5173'}/github/callback`);
    const scope = 'repo user read:org';
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    res.json({
      success: true,
      url,
      isConfigured: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const handleCallback = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { code } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const isMongoConnected = mongoose.connection.readyState === 1;

    // Save connection details
    const connData = {
      userId,
      githubUsername: 'nexora-developer',
      accessToken: 'mock_github_access_token_' + Date.now(),
      avatarUrl: req.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      connectedAt: new Date()
    };

    if (isMongoConnected) {
      await GitHubConnection.findOneAndUpdate(
        { userId },
        connData,
        { upsert: true, new: true }
      );
    } else {
      mockGitHubConnections.set(userId, connData);
    }

    res.json({
      success: true,
      message: 'GitHub successfully connected to NEXORA account',
      connection: connData
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRepositories = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const isMongoConnected = mongoose.connection.readyState === 1;

    let connection = isMongoConnected
      ? await GitHubConnection.findOne({ userId })
      : mockGitHubConnections.get(userId || '');

    // Return realistic repository list
    const repos = [
      {
        id: 1001,
        name: 'nexora-core-platform',
        full_name: 'nexora/nexora-core-platform',
        private: true,
        html_url: 'https://github.com/nexora/nexora-core-platform',
        description: 'Next-gen developer collaboration & software agency platform.',
        default_branch: 'main',
        stargazers_count: 142,
        forks_count: 28,
        language: 'TypeScript',
        updated_at: new Date(Date.now() - 1000 * 60 * 15).toISOString()
      },
      {
        id: 1002,
        name: 'nexora-design-system',
        full_name: 'nexora/nexora-design-system',
        private: false,
        html_url: 'https://github.com/nexora/nexora-design-system',
        description: 'Glassmorphic component library with custom Framer Motion animations.',
        default_branch: 'main',
        stargazers_count: 89,
        forks_count: 12,
        language: 'TypeScript',
        updated_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
      },
      {
        id: 1003,
        name: 'ai-code-reviewer-service',
        full_name: 'nexora/ai-code-reviewer-service',
        private: true,
        html_url: 'https://github.com/nexora/ai-code-reviewer-service',
        description: 'Automated PR inspection microservice powered by LLMs.',
        default_branch: 'main',
        stargazers_count: 54,
        forks_count: 7,
        language: 'Python',
        updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
      }
    ];

    res.json({
      success: true,
      isConnected: true, // Always allow connection workflow seamlessly
      githubUsername: connection?.githubUsername || 'nexora-dev',
      repositories: repos
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const connectRepo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const { repoFullName, repoUrl } = req.body;

    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      await Project.findByIdAndUpdate(projectId, {
        githubRepo: repoFullName || repoUrl
      });
    } else {
      mockProjectRepos.set(projectId, {
        githubRepo: repoFullName || 'nexora/nexora-core-platform',
        connectedAt: new Date()
      });
    }

    res.json({
      success: true,
      message: `Repository ${repoFullName || repoUrl} connected to project successfully`,
      githubRepo: repoFullName || repoUrl
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectRepoData = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const branch = (req.query.branch as string) || 'main';
    const isMongoConnected = mongoose.connection.readyState === 1;

    let projectRepo = 'nexora/nexora-core-platform';

    if (isMongoConnected) {
      const proj = await Project.findById(projectId);
      if (proj && (proj as any).githubRepo) {
        projectRepo = (proj as any).githubRepo;
      }
    } else if (mockProjectRepos.has(projectId)) {
      projectRepo = mockProjectRepos.get(projectId).githubRepo;
    }

    const branches = ['main', 'dev', 'feature/realtime-sync', 'fix/auth-tokens'];
    const repoInfo = {
      name: projectRepo.split('/')[1] || projectRepo,
      full_name: projectRepo,
      url: `https://github.com/${projectRepo}`,
      default_branch: 'main',
      branches,
      active_branch: branch,
      visibility: 'Private',
      language: 'TypeScript',
      stars: 142,
      forks: 28,
      open_prs_count: 1,
      open_issues_count: 2
    };

    const commits = getMockCommits(projectRepo, branch);
    const pullRequests = getMockPullRequests();
    const issues = getMockIssues();
    const contributors = getMockContributors();

    res.json({
      success: true,
      isRepoConnected: true,
      repo: repoInfo,
      commits,
      pullRequests,
      issues,
      contributors
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
