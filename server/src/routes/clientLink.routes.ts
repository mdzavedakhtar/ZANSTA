import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
  generateClientLink,
  getClientLinkData,
  verifyClientLinkPasscode
} from '../controllers/clientLink.controller.js';

const router = Router();

// Public endpoints for client demo portal
router.get('/:token', getClientLinkData);
router.post('/:token/verify', verifyClientLinkPasscode);

// Protected endpoint to generate links
router.post('/', protect, generateClientLink);

export default router;
