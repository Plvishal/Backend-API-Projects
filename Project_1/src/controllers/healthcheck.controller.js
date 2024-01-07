import { ApiErrorHandler } from '../utils/ApiErrorHander.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const healthCheck = asyncHandler(async (req, res) => {});

export { healthCheck };
