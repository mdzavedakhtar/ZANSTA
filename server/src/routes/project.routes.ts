import { Router } from 'express';
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  getPublicProjects,
  getPublicProjectBySlug,
} from '../controllers/project.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes for portfolio showcase & case studies
router.get('/public', getPublicProjects);
router.get('/public/slug/:slug', getPublicProjectBySlug);

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, authorize('OWNER', 'ADMIN'), deleteProject);

export default router;
