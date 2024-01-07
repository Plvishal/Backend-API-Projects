import { Router } from 'express';
import {
  createTweet,
  deleteTweet,
  updateTweet,
  getUserTweet,
} from '../controllers/tweet.controller.js';

import { verifyJWT } from '../middlewares/auth.middleware.js';
const tweetRouter = Router();

tweetRouter.use(verifyJWT);
tweetRouter.route('/').post(createTweet);
tweetRouter.route('/user/:userId').get(getUserTweet);
tweetRouter.route('/:tweetId').patch(updateTweet).delete(deleteTweet);

export default tweetRouter;
