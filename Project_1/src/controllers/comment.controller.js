import mongoose from 'mongoose';
import { Comment } from '../models/comment.model.js';
import { ApiErrorHandler } from '../utils/ApiErrorHander.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Get All Video Comment
const getVideoComment = asyncHandler(async (req, res) => {
  // Todo: get all comment from the video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
});

// Add New Comment
const addComment = asyncHandler(async (req, res) => {
  // Todo : add a comment to a video
});

// Update Comment
const updateComment = asyncHandler(async (req, res) => {});

// Delete Comment
const deleteComment = asyncHandler(async (req, res) => {});

export { getVideoComment, addComment, updateComment, deleteComment };
