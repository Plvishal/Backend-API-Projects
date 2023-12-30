import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiErrorHandler } from '../utils/ApiErrorHander.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';

// Token
const generateAccessAnsRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err0r) {
    throw new ApiErrorHandler(
      500,
      'Something went wrong while generating refresh and access token'
    );
  }
};

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

  if (
    [fullname, email, username, password].some((field) => field.trim() === '')
  ) {
    throw new ApiErrorHandler(400, 'All fields are required');
  }
  // 3. Check if user already exixts:(username,email)
  const exitsUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (exitsUser) {
    throw new ApiErrorHandler(
      409,
      'User with email or username already exists'
    );
  }
  // 4.Check images , check for avatar (multer provide req.files)
  const avatarLocalPath = req.files?.avatar[0]?.path; //req.files.avatar[0].path
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0];
  }
  if (!avatarLocalPath) {
    throw new ApiErrorHandler(400, 'Avatar file is required');
  }
  // 5. Upload them to cloudinary,
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  // console.log(avatar);

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  // console.log(coverImage);
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
// Login ***********************************************************

const loginUser = asyncHandler(async (req, res) => {
  // 1.req.body-> data
  //2. username or email
  // 3.find the user
  // 4. password check
  // 5.access and refresh token
  // 6. send in cookie
  // 1.req.body-> data
  const { email, username, password } = req.body;
  if (!username && !email) {
    throw new ApiErrorHandler(400, 'username or email is required');
  }
  // 3.find the user
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiErrorHandler(400, 'User does not exixt');
  }
  // 4. password check
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiErrorHandler(401, 'Invalid user credentials');
  }
  // 5.access and refresh token
  const { accessToken, refreshToken } = await generateAccessAnsRefreshToken(
    user._id
  );

  // 6. send in cookie

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );
  const option = {
    httpOnly: true,
    secure: true,
  };
  console.log(loggedInUser);
  return res
    .status(200)
    .cookie('accessToken', accessToken, option)
    .cookie('refreshToken', refreshToken, option)
    .json(
      new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken })
    );
});
// logout
const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie('accessToken', option)
    .clearCookie('refreshToken', option)
    .json(new ApiResponse(200, {}, 'User logged Out'));
});

// Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (incomingRefreshToken) {
    throw new ApiErrorHandler(401, 'Unauthorized access');
  }
  try {
    const decodedToken = jwt.verify(incomingRefreshToken, REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiErrorHandler(401, 'Invalid refresh Token');
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiErrorHandler(401, 'Refresh Toekn expired or used');
    }

    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newRefreshToken } =
      await generateAccessAnsRefreshToken(user._id);
    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          'Access Token Refreshed'
        )
      );
  } catch (error) {
    throw new ApiErrorHandler(401, error?.message, 'Invalid refresh token');
  }
});
export { registerUser, loginUser, logoutUser ,refreshAccessToken};

// if (fullname === '') {
//     throw new ApiErrorHandler(400, 'Full name is required');
//   }
