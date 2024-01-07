import mongoose, { isValidObjectId } from 'mongoose';
import { Comment } from '../models/playlist.model.js';
import { ApiErrorHandler } from '../utils/ApiErrorHander.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create Playlist
const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
});

// Get User Playlist
const getUserPlaylist = asyncHandler(async (req, res) => {
  const { userId } = req.params;
});

// Get Playlist By Id
const getPlaylistById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
});

// Add Video To Playlist
const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
});

// Remove video from the playlist
const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
});

// Delete Playlist
const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
});

// Update Playlist
const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
});

export {
  createPlaylist,
  getUserPlaylist,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
