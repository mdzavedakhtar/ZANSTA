import { Router } from 'express';
import { getFiles, uploadFile, deleteFile } from '../controllers/file.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getFiles);
router.post('/', protect, uploadFile);
router.delete('/:id', protect, deleteFile);

export default router;
