import { Router } from 'express';
import {
  addComment,
  deleteComment,
  getVideoComment,
  updateComment,
} from '../controllers/comment.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const commentRouter = Router();
commentRouter.use(verifyJWT); //apply verifyJWT middleware to all routes in this file

commentRouter.route('/:videoId').get(getVideoComment).post(addComment);
commentRouter.route('/c/:commentId').delete(deleteComment).patch(updateComment);

export default commentRouter;
