import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import workspaceRoutes from './workspace.routes.js';
import inviteRoutes from './invite.routes.js';
import projectRoutes from './project.routes.js';
import taskRoutes from './task.routes.js';
import fileRoutes from './file.routes.js';
import notificationRoutes from './notification.routes.js';
import githubRoutes from './github.routes.js';
import clientLinkRoutes from './clientLink.routes.js';
import feedbackRoutes from './feedback.routes.js';
import agencyRoutes from './agency.routes.js';

const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/workspaces', workspaceRoutes);
apiRouter.use('/invitations', inviteRoutes);
apiRouter.use('/projects', projectRoutes);
apiRouter.use('/tasks', taskRoutes);
apiRouter.use('/files', fileRoutes);
apiRouter.use('/notifications', notificationRoutes);
apiRouter.use('/github', githubRoutes);
apiRouter.use('/client-links', clientLinkRoutes);
apiRouter.use('/feedback', feedbackRoutes);
apiRouter.use('/agency', agencyRoutes);

export default apiRouter;
