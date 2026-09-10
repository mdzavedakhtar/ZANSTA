import { Router } from 'express';
import { verifyInvitation, acceptInvitation } from '../controllers/invite.controller.js';

const router = Router();

router.get('/:token', verifyInvitation);
router.post('/:token/accept', acceptInvitation);

export default router;
