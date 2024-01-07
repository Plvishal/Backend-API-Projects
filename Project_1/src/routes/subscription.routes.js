import { Router } from 'express';
import {
  getSubscriberChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from '../controllers/subscription.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const subscriptionRouter = Router();

subscriptionRouter.use(verifyJWT);

subscriptionRouter
  .route('/c/:channelId')
  .get(getSubscriberChannels)
  .post(toggleSubscription);

subscriptionRouter.route('/u/:subscribedId').get(getUserChannelSubscribers);

export default subscriptionRouter;
