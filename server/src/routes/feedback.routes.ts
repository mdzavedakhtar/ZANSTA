import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import {
  submitFeedback,
  getProjectFeedback,
  updateFeedbackStatus
} from '../controllers/feedback.controller.js';

const router = Router();

// Public feedback submission endpoint
router.post('/', submitFeedback);

// Project feedback query
router.get('/project/:projectId', getProjectFeedback);

// Status update (Protected)
router.put('/:id/status', protect, updateFeedbackStatus);

export default router;
