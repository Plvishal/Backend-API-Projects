import { Router } from 'express';
import {
  getChannelStatus,
  getChannelVideos,
} from '../controllers/dashboard.controller.js';

import { verifyJWT } from '../middlewares/auth.middleware.js';

const dashboardRouter = Router();
dashboardRouter.use(verifyJWT);
dashboardRouter.route('/status').get(getChannelStatus);
dashboardRouter.route('/videos').get(getChannelVideos);

export default dashboardRouter;
