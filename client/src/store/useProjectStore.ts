import { create } from 'zustand';
import { apiRequest } from '../services/api';

export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type ProjectStatus = 'PLANNING' | 'DEVELOPMENT' | 'TESTING' | 'COMPLETED';
export type ProjectVisibility = 'PRIVATE' | 'TEAM_ONLY' | 'PUBLIC';

export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  techStack: string[];
  status: ProjectStatus;
  visibility: ProjectVisibility;
  repoUrl?: string;
  demoUrl?: string;
  progress?: number;
  membersCount?: number;
  createdAt: string;
}

export interface TaskItem {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  assignee?: string;
  priority: TaskPriority;
  status: TaskStatus;
  labels: string[];
  dueDate?: string;
}

export interface FileItem {
  id: string;
  projectId: string;
  name: string;
  extension: string;
  size: number;
  url: string;
  uploadedBy: string;
  createdAt: string;
}

interface ProjectState {
  projects: ProjectItem[];
  currentProject: ProjectItem | null;
  tasks: TaskItem[];
  files: FileItem[];
  isLoading: boolean;
  fetchProjects: () => Promise<void>;
  fetchProjectBySlug: (slug: string) => Promise<void>;
  createProject: (data: Partial<ProjectItem>) => Promise<ProjectItem>;
  fetchTasks: (projectId: string) => Promise<void>;
  createTask: (data: Partial<TaskItem>) => Promise<void>;
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => Promise<void>;
  fetchFiles: (projectId: string) => Promise<void>;
  uploadFile: (projectId: string, name: string, size: number) => Promise<void>;
  deleteFile: (fileId: string) => Promise<void>;
}

const defaultProjects: ProjectItem[] = [
  {
    id: 'proj_caresprint',
    slug: 'caresprint',
    name: 'CareSprint',
    description: 'On-demand healthcare platform providing real-time doctor appointments, WebRTC video consultations, encrypted patient records, and instant prescription downloads.',
    category: 'Healthcare SaaS',
    techStack: ['React 18', 'Node.js', 'Socket.IO', 'MongoDB', 'Razorpay'],
    status: 'DEVELOPMENT',
    visibility: 'PUBLIC',
    repoUrl: 'https://github.com/zansta/caresprint',
    demoUrl: 'https://caresprint.example.com',
    progress: 85,
    membersCount: 4,
    createdAt: '2026-01-10',
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
    repoUrl: 'https://github.com/zansta/neurostack',
    demoUrl: 'https://neurostack.example.com',
    progress: 60,
    membersCount: 3,
    createdAt: '2026-01-20',
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
    repoUrl: 'https://github.com/zansta/insightiq',
    demoUrl: 'https://insightiq.example.com',
    progress: 95,
    membersCount: 5,
    createdAt: '2026-02-01',
  },
];

const defaultTasks: TaskItem[] = [
  { id: 't1', projectId: 'caresprint', title: 'Implement WebRTC video signaling server', description: 'Setup sub-100ms Socket.IO mesh signaling gateway', assignee: 'Aman Deep', priority: 'HIGH', status: 'IN_PROGRESS', labels: ['backend', 'webrtc'], dueDate: '2026-03-01' },
  { id: 't2', projectId: 'caresprint', title: 'Design dark mode consultation UI', description: 'Create responsive video controls overlay', assignee: 'Rahul Sharma', priority: 'HIGH', status: 'REVIEW', labels: ['frontend', 'ui'], dueDate: '2026-03-05' },
  { id: 't3', projectId: 'caresprint', title: 'Integrate Razorpay payment checkout', description: 'Add appointment billing flow', assignee: 'MD Zaved Akhtar', priority: 'MEDIUM', status: 'TODO', labels: ['payment'], dueDate: '2026-03-10' },
  { id: 't4', projectId: 'caresprint', title: 'HIPAA document encryption audit', description: 'AES-256 document encryption at rest', assignee: 'Aman Deep', priority: 'URGENT', status: 'BACKLOG', labels: ['security'], dueDate: '2026-03-15' },
  { id: 't5', projectId: 'caresprint', title: 'Setup User & Appointment Mongoose models', description: 'Initial schema scaffolding', assignee: 'MD Zaved Akhtar', priority: 'HIGH', status: 'DONE', labels: ['database'], dueDate: '2026-02-15' },
];

const defaultFiles: FileItem[] = [
  { id: 'f1', projectId: 'caresprint', name: 'caresprint_architecture_v2.pdf', extension: 'PDF', size: 4404019, url: 'https://zansta.dev/files/caresprint_architecture.pdf', uploadedBy: 'MD Zaved Akhtar', createdAt: '2026-02-10' },
  { id: 'f2', projectId: 'caresprint', name: 'webrtc_signaling_spec.docx', extension: 'DOCX', size: 1240100, url: 'https://zansta.dev/files/signaling_spec.docx', uploadedBy: 'Aman Deep', createdAt: '2026-02-12' },
  { id: 'f3', projectId: 'caresprint', name: 'caresprint_mobile_build.apk', extension: 'APK', size: 48201948, url: 'https://zansta.dev/files/caresprint.apk', uploadedBy: 'Rahul Sharma', createdAt: '2026-02-15' },
];

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: defaultProjects,
  currentProject: defaultProjects[0],
  tasks: defaultTasks,
  files: defaultFiles,
  isLoading: false,

  fetchProjects: async () => {
    try {
      set({ isLoading: true });
      const res = await apiRequest('/projects');
      if (res.success && res.projects) {
        set({ projects: res.projects, isLoading: false });
      }
    } catch {
      set({ projects: defaultProjects, isLoading: false });
    }
  },

  fetchProjectBySlug: async (slug) => {
    try {
      set({ isLoading: true });
      const res = await apiRequest(`/projects/${slug}`);
      if (res.success && res.project) {
        set({ currentProject: res.project, isLoading: false });
      }
    } catch {
      const found = get().projects.find((p) => p.slug === slug || p.id === slug) || defaultProjects[0];
      set({ currentProject: found, isLoading: false });
    }
  },

  createProject: async (data) => {
    try {
      set({ isLoading: true });
      const res = await apiRequest('/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const newProj = res.project;
      set({ projects: [newProj, ...get().projects], currentProject: newProj, isLoading: false });
      return newProj;
    } catch (error: any) {
      const slug = (data.name || 'new-project').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const fallbackProj: ProjectItem = {
        id: `proj_${Date.now()}`,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        name: data.name || 'New Project',
        description: data.description || '',
        category: data.category || 'Full-Stack Web',
        techStack: data.techStack || ['React', 'Node.js'],
        status: data.status || 'DEVELOPMENT',
        visibility: data.visibility || 'TEAM_ONLY',
        repoUrl: data.repoUrl || '',
        demoUrl: data.demoUrl || '',
        progress: 10,
        membersCount: 1,
        createdAt: new Date().toISOString(),
      };
      set({ projects: [fallbackProj, ...get().projects], currentProject: fallbackProj, isLoading: false });
      return fallbackProj;
    }
  },

  fetchTasks: async (projectId) => {
    try {
      set({ isLoading: true });
      const res = await apiRequest(`/tasks?projectId=${projectId}`);
      if (res.success && res.tasks) {
        set({ tasks: res.tasks, isLoading: false });
      }
    } catch {
      set({ tasks: defaultTasks, isLoading: false });
    }
  },

  createTask: async (data) => {
    try {
      const res = await apiRequest('/tasks', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (res.success && res.task) {
        set({ tasks: [res.task, ...get().tasks] });
      }
    } catch {
      const newTask: TaskItem = {
        id: `t_${Date.now()}`,
        projectId: data.projectId || 'caresprint',
        title: data.title || 'New Task',
        description: data.description || '',
        assignee: data.assignee || 'MD Zaved Akhtar',
        priority: data.priority || 'MEDIUM',
        status: data.status || 'TODO',
        labels: data.labels || ['feature'],
        dueDate: data.dueDate || '2026-03-15',
      };
      set({ tasks: [newTask, ...get().tasks] });
    }
  },

  updateTaskStatus: async (taskId, newStatus) => {
    // Optimistic UI update
    set({
      tasks: get().tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    });
    try {
      await apiRequest(`/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // Retain optimistic state
    }
  },

  fetchFiles: async (projectId) => {
    try {
      const res = await apiRequest(`/files?projectId=${projectId}`);
      if (res.success && res.files) {
        set({ files: res.files });
      }
    } catch {
      set({ files: defaultFiles });
    }
  },

  uploadFile: async (projectId, name, size) => {
    const ext = name.split('.').pop()?.toUpperCase() || 'FILE';
    try {
      const res = await apiRequest('/files', {
        method: 'POST',
        body: JSON.stringify({ projectId, name, size }),
      });
      if (res.success && res.file) {
        set({ files: [res.file, ...get().files] });
      }
    } catch (error: any) {
      const newFile: FileItem = {
        id: `f_${Date.now()}`,
        projectId,
        name,
        extension: ext,
        size,
        url: `https://zansta.dev/files/${name}`,
        uploadedBy: 'MD Zaved Akhtar',
        createdAt: new Date().toISOString(),
      };
      set({ files: [newFile, ...get().files] });
    }
  },

  deleteFile: async (fileId) => {
    set({ files: get().files.filter((f) => f.id !== fileId) });
    try {
      await apiRequest(`/files/${fileId}`, { method: 'DELETE' });
    } catch {
      // Retain deletion
    }
  },
}));
