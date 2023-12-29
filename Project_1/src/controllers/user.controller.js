import { asyncHandler } from '../utils/asyncHandler.js';

const registerUser = asyncHandler(async (req, res) => {
  // 1.get user details from the frontend
  // 2. validation- Not empty
  // 3. Check if user already exixts:(username,email)
  // 4.Check images , check for avatar
  // 5. Upload them to cloudinary, check avatar upload or not on cloudinary
  // 6. Create user object-create entry in database
  // 7. remove password and refresh token field from the response
  // 8. Chech for user creation
  // 9. return response
});

export { registerUser };
