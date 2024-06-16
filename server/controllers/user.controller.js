const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const User = require("../models/user.model.js");
const sendToken = require("../utils/sendToken.js");
const Post = require("../models/post.model.js");
const cloudinary = require("cloudinary");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new ErrorHandler("User with this email already exists"));
  }

  const newUser = { name, email, password };

  if (avatar) {
    const mycloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "echo_post_user_avatars",
      width: 150,
      crop: "scale",
    });
    newUser.avatar = { public_id: mycloud.public_id, url: mycloud.secure_url };
  }

  const user = await User.create(newUser);

  return sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password"));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password"));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password"), 401);
  }

  return sendToken(user, 200, res);
});

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
    sameSite: "None",
    secure: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

exports.getLoggedInUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");

  res.status(200).json({
    success: true,
    user,
  });
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password").lean();

  let posts = await Post.find({ user: id })
    .populate("user", "name avatar email")
    .lean();

  user.posts = posts;

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("Password does not match"), 400);
  }

  const isMatched = await user.comparePassword(oldPassword);

  if (!isMatched) {
    return next(new ErrorHandler("old password is incorrect"), 400);
  }

  user.password = newPassword;
  await user.save();

  sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email, location, bio, interests, avatar } = req.body;

  const newUserData = { email, name, interests, location, bio };

  if (avatar && avatar !== "null" && avatar !== "") {
    const user = await User.findById(req.user._id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "echo_post_user_avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

exports.getFollowing = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  await user.populate("following", "name avatar");

  res.status(200).json({
    success: true,
    following: user.following,
  });
});

exports.getFollowers = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  await user.populate("followers", "name avatar");

  res.status(200).json({
    success: true,
    followers: user.followers,
  });
});

exports.followUser = catchAsyncError(async (req, res, next) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  req.user.following.push(userId);
  user.followers.push(req.user._id);

  await user.save();
  await req.user.save();

  res.status(200).json({
    success: true,
    following: req.user.following,
  });
});

exports.unfollowUser = catchAsyncError(async (req, res, next) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  user.followers = user.followers.filter((f) => !f.equals(req.user._id));
  req.user.following = req.user.following.filter((f) => !f.equals(userId));

  await user.save();
  await req.user.save();

  res.status(200).json({
    success: true,
    following: req.user.following,
  });
});
