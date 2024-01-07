import mongoose from 'mongoose';
import { Tweet } from '../models/tweet.model.js';
import { User } from '../models/user.model.js';
import { ApiErrorHandler } from '../utils/ApiErrorHander.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create Tweet
const createTweet = asyncHandler(async (req, res) => {});
// Get user tweet
const getUserTweet = asyncHandler(async (req, res) => {});
// Update Tweet
const updateTweet = asyncHandler(async (req, res) => {});
const deleteTweet = asyncHandler(async (req, res) => {});

export { createTweet, getUserTweet, updateTweet, deleteTweet };
