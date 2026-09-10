import { Router } from 'express';
import {
  getWorkspaceOverview,
  getMembers,
  createInvitation,
  updateMemberRole,
  updateMember,
  removeMember,
} from '../controllers/workspace.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

router.get('/current', getWorkspaceOverview);
router.get('/current/members', getMembers);
router.post('/current/invite', authorize('OWNER', 'ADMIN'), createInvitation);
router.put('/current/members/:id/role', authorize('OWNER', 'ADMIN'), updateMemberRole);
router.put('/current/members/:id', updateMember);
router.delete('/current/members/:id', removeMember);

export default router;
