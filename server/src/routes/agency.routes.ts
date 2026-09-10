import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import {
  submitProjectRequest,
  getProjectRequests,
  updateRequestStatus,
  getAgencyClients,
  getAgencyProposals
} from '../controllers/agency.controller.js';

const router = Router();

// Public inbound project lead submission
router.post('/requests', submitProjectRequest);

// Protected agency management endpoints
router.get('/requests', protect, getProjectRequests);
router.put('/requests/:id/status', protect, updateRequestStatus);
router.get('/clients', protect, getAgencyClients);
router.get('/proposals', protect, getAgencyProposals);

export default router;
