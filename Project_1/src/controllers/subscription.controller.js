import mongoose, { isValidObjectId } from 'mongoose';
import { Subscription } from '../models/subscripton.model.js';
import { ApiErrorHandler } from '../utils/ApiErrorHander.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Toggle Subscription
const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
});

// Controller  to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
});

// Controller to return channel list to which user has subscriber
const getSubscriberChannels = asyncHandler(async (req, res) => {
  const { subscribeId } = req.params;
});

export { toggleSubscription, getSubscriberChannels, getUserChannelSubscribers };
