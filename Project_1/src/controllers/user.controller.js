import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiErrorHandler } from '../utils/ApiErrorHander.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

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
  const { username, email, password, fullname } = req.body;
  console.log(req.body);
  if (
    [fullname, email, username, password].some((field) => field.trim() === '')
  ) {
    throw new ApiErrorHandler(400, 'All fields are required');
  }
  // 3. Check if user already exixts:(username,email)
  const exitsUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (exitsUser) {
    throw new ApiErrorHandler(
      409,
      'User with email or username already exists'
    );
  }
  // 4.Check images , check for avatar (multer provide req.files)
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiErrorHandler(400, 'Avatar file is required');
  }
  // 5. Upload them to cloudinary,
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  // check avatar upload or not on cloudinary
  if (!avatar) {
    throw new ApiErrorHandler(400, 'Avatar file is required');
  }
  // 6. Create user object-create entry in database
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken '
  );

  if (!createdUser) {
    throw new ApiErrorHandler(
      500,
      'Something went wrong while registering  the user'
    );
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, 'User register succesfully'));
});

export { registerUser };

// if (fullname === '') {
//     throw new ApiErrorHandler(400, 'Full name is required');
//   }
