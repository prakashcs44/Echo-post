const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const User = require("../models/user.model.js");
const sendToken = require("../utils/sendToken.js");
const fs = require("fs");
const path = require("path");
const Post = require("../models/post.model.js");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const avatar = req.file?.filename;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new ErrorHandler("User with this email already exists"));
  }

  const user = await User.create({ name, email, password, avatar });
  user.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${user.avatar}`;

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

  user.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${user.avatar}`;

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
  user.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${user.avatar}`;
  res.status(200).json({
    success: true,
    user,
  });
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password").lean();

  let posts = await Post.find({ user: id }).populate("user","name avatar email").lean();
  

  posts = JSON.parse(JSON.stringify(posts));

  posts.forEach(post=>{
    post.user.avatar =  `${req.protocol}://${req.headers.host}/uploads/user_avatars/${post.user.avatar}`;
  })


  user.posts = posts;

  user.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${user.avatar}`;

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
  
  const { name, email, location, bio, interests } = req.body;
  
  const newUserData = { email, name, interests, location, bio };
  newUserData.avatar = req.file?.filename;
  if (req.user.avatar && newUserData.avatar) {
    const filePath = path.resolve(
      __dirname,
      "../uploads/user_avatars",
      req.user.avatar
    );
    fs.rmSync(filePath);
  }

  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  user.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${user.avatar}`;

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
   
  user = JSON.parse(JSON.stringify(user));
  
  user.following.forEach(f=>{
    f.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${f.avatar}`;
  })
  

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


  user = JSON.parse(JSON.stringify(user));
  
  user.followers.forEach(f=>{
    f.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${f.avatar}`;
  })
  

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
    following:req.user.following
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
    following:req.user.following
  });
});
