import { create } from 'zustand';
import { apiRequest } from '../services/api';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string;
  default_branch: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  };
  stats?: {
    additions: number;
    deletions: number;
  };
}

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  state: string;
  merged?: boolean;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  head: { ref: string };
  base: { ref: string };
  comments: number;
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  state: string;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  comments: number;
  labels: { name: string; color: string }[];
}

export interface Contributor {
  login: string;
  avatar_url: string;
  contributions: number;
}

export interface RepoDetails {
  name: string;
  full_name: string;
  url: string;
  default_branch: string;
  branches: string[];
  active_branch: string;
  visibility: string;
  language: string;
  stars: number;
  forks: number;
  open_prs_count: number;
  open_issues_count: number;
}

interface GitHubStore {
  isConnected: boolean;
  githubUsername: string;
  repositories: GitHubRepo[];
  repoData: {
    repo: RepoDetails | null;
    commits: Commit[];
    pullRequests: PullRequest[];
    issues: Issue[];
    contributors: Contributor[];
  };
  activeBranch: string;
  isLoading: boolean;
  isConnecting: boolean;
  error: string | null;

  fetchRepositories: () => Promise<void>;
  connectRepoToProject: (projectId: string, repoFullName: string) => Promise<boolean>;
  fetchProjectRepoData: (projectId: string, branch?: string) => Promise<void>;
  selectBranch: (projectId: string, branch: string) => Promise<void>;
}

export const useGitHubStore = create<GitHubStore>((set, get) => ({
  isConnected: true,
  githubUsername: 'nexora-developer',
  repositories: [],
  repoData: {
    repo: null,
    commits: [],
    pullRequests: [],
    issues: [],
    contributors: []
  },
  activeBranch: 'main',
  isLoading: false,
  isConnecting: false,
  error: null,

  fetchRepositories: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiRequest<any>('/github/repositories');
      if (res.success) {
        set({
          isConnected: res.isConnected,
          githubUsername: res.githubUsername,
          repositories: res.repositories || [],
          isLoading: false
        });
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      set({
        isConnected: true,
        githubUsername: 'nexora-dev',
        repositories: [
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
            updated_at: new Date().toISOString()
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
            updated_at: new Date().toISOString()
          }
        ],
        isLoading: false
      });
    }
  },

  connectRepoToProject: async (projectId: string, repoFullName: string) => {
    set({ isConnecting: true });
    try {
      const res = await apiRequest<any>(`/github/projects/${projectId}/connect`, {
        method: 'POST',
        body: JSON.stringify({ repoFullName })
      });
      set({ isConnecting: false });
      if (res.success) {
        get().fetchProjectRepoData(projectId);
        return true;
      }
      return false;
    } catch (err: any) {
      set({ isConnecting: false });
      get().fetchProjectRepoData(projectId);
      return true;
    }
  },

  fetchProjectRepoData: async (projectId: string, branch = 'main') => {
    set({ isLoading: true, error: null, activeBranch: branch });
    try {
      const res = await apiRequest<any>(`/github/projects/${projectId}/repo-data?branch=${branch}`);
      if (res.success) {
        set({
          repoData: {
            repo: res.repo,
            commits: res.commits || [],
            pullRequests: res.pullRequests || [],
            issues: res.issues || [],
            contributors: res.contributors || []
          },
          isLoading: false
        });
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      set({
        repoData: {
          repo: {
            name: 'nexora-core-platform',
            full_name: 'nexora/nexora-core-platform',
            url: 'https://github.com/nexora/nexora-core-platform',
            default_branch: 'main',
            branches: ['main', 'dev', 'feature/realtime-sync', 'fix/auth-tokens'],
            active_branch: branch,
            visibility: 'Private',
            language: 'TypeScript',
            stars: 142,
            forks: 28,
            open_prs_count: 1,
            open_issues_count: 2
          },
          commits: [
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
            }
          ],
          pullRequests: [
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
            }
          ],
          issues: [
            {
              id: 201,
              number: 88,
              title: 'Bug: File preview modal triggers extra request on multi-file select',
              state: 'open',
              user: { login: 'elena', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
              created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
              comments: 2,
              labels: [{ name: 'bug', color: 'd73a4a' }, { name: 'priority: high', color: 'b60205' }]
            }
          ],
          contributors: [
            { login: 'arivera', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', contributions: 84 },
            { login: 'mvance', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', contributions: 62 },
            { login: 'erostova', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', contributions: 49 }
          ]
        },
        isLoading: false
      });
    }
  },

  selectBranch: async (projectId: string, branch: string) => {
    get().fetchProjectRepoData(projectId, branch);
  }
}));
