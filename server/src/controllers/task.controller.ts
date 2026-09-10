import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

let mockTasksDatabase = [
  { id: 't1', projectId: 'caresprint', title: 'Implement WebRTC video signaling server', description: 'Setup sub-100ms Socket.IO mesh signaling gateway', assignee: 'Aman Deep', priority: 'HIGH', status: 'IN_PROGRESS', labels: ['backend', 'webrtc'], dueDate: '2026-03-01' },
  { id: 't2', projectId: 'caresprint', title: 'Design dark mode consultation UI', description: 'Create responsive video controls overlay with custom tokens', assignee: 'Rahul Sharma', priority: 'HIGH', status: 'REVIEW', labels: ['frontend', 'ui'], dueDate: '2026-03-05' },
  { id: 't3', projectId: 'caresprint', title: 'Integrate Razorpay payment gateway', description: 'Add doctor appointment invoice checkout', assignee: 'MD Zaved Akhtar', priority: 'MEDIUM', status: 'TODO', labels: ['payment'], dueDate: '2026-03-10' },
  { id: 't4', projectId: 'caresprint', title: 'HIPAA document storage security audit', description: 'Encrypt stored PDFs at rest using AES-256', assignee: 'Aman Deep', priority: 'URGENT', status: 'BACKLOG', labels: ['security'], dueDate: '2026-03-15' },
  { id: 't5', projectId: 'caresprint', title: 'Setup Mongoose user & appointment schemas', description: 'Initial database model scaffolding', assignee: 'MD Zaved Akhtar', priority: 'HIGH', status: 'DONE', labels: ['database'], dueDate: '2026-02-15' },
];

// @desc    Get Tasks for a Project
// @route   GET /api/v1/tasks?projectId=caresprint
export const getTasks = async (req: Request, res: Response) => {
  const { projectId } = req.query;
  const filtered = projectId
    ? mockTasksDatabase.filter((t) => t.projectId === (projectId as string).toLowerCase())
    : mockTasksDatabase;

  return res.status(200).json({ success: true, tasks: filtered });
};

// @desc    Create New Kanban Task
// @route   POST /api/v1/tasks
export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  const { projectId, title, description, assignee, priority, status, labels, dueDate } = req.body;

  const newTask = {
    id: `t_${Date.now()}`,
    projectId: (projectId || 'caresprint').toLowerCase(),
    title,
    description: description || '',
    assignee: assignee || 'MD Zaved Akhtar',
    priority: priority || 'MEDIUM',
    status: status || 'TODO',
    labels: labels || ['feature'],
    dueDate: dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  };

  mockTasksDatabase.unshift(newTask);

  return res.status(201).json({ success: true, message: 'Task created successfully', task: newTask });
};

// @desc    Update Task (Status shift / Inline editing)
// @route   PUT /api/v1/tasks/:id
export const updateTask = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const task = mockTasksDatabase.find((t) => t.id === id);

  if (task) {
    Object.assign(task, req.body);
  }

  return res.status(200).json({ success: true, message: 'Task updated successfully', task });
};

// @desc    Delete Task
// @route   DELETE /api/v1/tasks/:id
export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  mockTasksDatabase = mockTasksDatabase.filter((t) => t.id !== id);
  return res.status(200).json({ success: true, message: 'Task deleted successfully' });
};
