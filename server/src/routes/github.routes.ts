import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import {
  getAuthUrl,
  handleCallback,
  getRepositories,
  connectRepo,
  getProjectRepoData
} from '../controllers/github.controller';

const router = Router();

router.use(protect);

router.get('/auth-url', getAuthUrl);
router.post('/callback', handleCallback);
router.get('/repositories', getRepositories);
router.post('/projects/:projectId/connect', connectRepo);
router.get('/projects/:projectId/repo-data', getProjectRepoData);

export default router;
