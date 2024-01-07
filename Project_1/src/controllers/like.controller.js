import mongoose from 'mongoose';
import { Comment } from '../models/comment.model.js';
import { ApiErrorHandler } from '../utils/ApiErrorHander.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Toggle Video Like
const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});
// Toggle like on comment
const toggleCommentLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

// Toggle like on tweet
const toggleTweetLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

// Get all liked video
const getLokedVideos = asyncHandler(async (req, res) => {});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLokedVideos };
