import mongoose from 'mongoose';
import { Video } from '../models/video.model.js';
import { Subscription } from '../models/subscripton.model.js';
import { Like } from '../models/like.model.js';
import { ApiErrorHandler } from '../utils/ApiErrorHander.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Get the channel status like total video views, total subscribers, total videos,total likes etc
const getChannelStatus = asyncHandler(async (req, res) => {});
// Get all the  videos uploaded  by the channel
const getChannelVideos = asyncHandler(async (req, res) => {});

export{
    getChannelStatus,
    getChannelVideos
}
