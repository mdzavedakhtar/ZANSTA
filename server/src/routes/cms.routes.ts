import { Router } from 'express';
import {
  getProjects,
  getProjectByIdOrSlug,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  reorderTeamMembers,
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getDemos,
  getDemoByTokenOrId,
  createDemo,
  updateDemo,
  regenerateDemoToken,
  incrementDemoView,
  deleteDemo,
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getLandingContent,
  updateLandingContent,
  getEnquiries,
  createEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
  getDemoRequests,
  createDemoRequest,
  updateDemoRequestStatus,
  deleteDemoRequest,
  getActivities,
  createActivity,
  clearActivities,
  sendCustomEmailHandler,
} from '../controllers/cms.controller.js';

const router = Router();

// Projects CMS Routes
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectByIdOrSlug);
router.post('/projects', createProject);
router.put('/projects/reorder', reorderProjects);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Team CMS Routes
router.get('/team', getTeamMembers);
router.get('/team/:id', getTeamMemberById);
router.post('/team', createTeamMember);
router.put('/team/reorder', reorderTeamMembers);
router.put('/team/:id', updateTeamMember);
router.delete('/team/:id', deleteTeamMember);

// Services CMS Routes
router.get('/services', getServices);
router.get('/services/:id', getServiceById);
router.post('/services', createService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

// Client Demos CMS Routes
router.get('/demos', getDemos);
router.get('/demos/:token', getDemoByTokenOrId);
router.post('/demos', createDemo);
router.put('/demos/:id', updateDemo);
router.post('/demos/:id/regenerate-token', regenerateDemoToken);
router.post('/demos/:token/view', incrementDemoView);
router.delete('/demos/:id', deleteDemo);

// Reviews CMS Routes
router.get('/reviews', getReviews);
router.get('/reviews/:id', getReviewById);
router.post('/reviews', createReview);
router.put('/reviews/:id', updateReview);
router.delete('/reviews/:id', deleteReview);

// Landing Page CMS Routes
router.get('/landing', getLandingContent);
router.put('/landing', updateLandingContent);

// Contact Enquiries Routes
router.get('/enquiries', getEnquiries);
router.post('/enquiries', createEnquiry);
router.put('/enquiries/:id/status', updateEnquiryStatus);
router.delete('/enquiries/:id', deleteEnquiry);

// Demo Requests Routes
router.get('/demo-requests', getDemoRequests);
router.post('/demo-requests', createDemoRequest);
router.put('/demo-requests/:id/status', updateDemoRequestStatus);
router.delete('/demo-requests/:id', deleteDemoRequest);

// Activity Logs Routes
router.get('/activities', getActivities);
router.post('/activities', createActivity);
router.delete('/activities', clearActivities);

// Direct Email Sending Route
router.post('/send-email', sendCustomEmailHandler);

export default router;
