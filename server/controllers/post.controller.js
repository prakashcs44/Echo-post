const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model.js");
const cloudinary = require("cloudinary");

exports.getAllPost = catchAsyncError(async (req, res, next) => {
  const query = req.query.user ? { user: req.query.user } : {};
  
  const page = parseInt(req.query.page) || 1;

  const limit = parseInt(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  const posts = await Post.find(query)
    .populate("user", "name avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
 
  const totalDocuments = await Post.countDocuments(query);

  const hasMore = skip + posts.length < totalDocuments;

  res.status(200).json({
    success: true,
    posts,
    hasMore,
  });
});

exports.getPost = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let post = await Post.findById(id)
    .populate("user", "name avatar")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "name avatar",
      },
    });

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  post.comments.sort((a, b) => b.createdAt - a.createdAt);

  res.status(200).json({ success: true, post });
});

exports.addPost = catchAsyncError(async (req, res, next) => {
  const { content, file } = req.body;
  const newPost = { content, user: req.user._id };

  if (file && file !== "") {
    const mycloud = await cloudinary.v2.uploader.upload(file, {
      folder: "echo_post_user_files",
    });
    newPost.file = { public_id: mycloud.public_id, url: mycloud.secure_url };
  }

  let post = await Post.create(newPost);

  post = await post.populate("user", "name avatar");

  res.status(200).json({ success: true, post });
});

exports.deletePost = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  if (post.file?.public_id) {
    await cloudinary.v2.uploader.destroy(post.file.public_id);
  }

  await Comment.deleteMany({ _id: { $in: post.comments } });

  await Post.deleteOne({ _id: id });

  res
    .status(200)
    .json({ success: true, message: "Post deleted successfully", id });
});

exports.updatePost = catchAsyncError(async (req, res, next) => {
  const { postId, content, file } = req.body;

  let post = await Post.findById(postId);
  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }
  const updatedPost = { content };

  if (file && post.file) {
    await cloudinary.v2.uploader.destroy(post.file.public_id);
    const mycloud = await cloudinary.v2.uploader.upload(file, {
      folder: "echo_post_user_files",
    });
    updatedPost.file = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };
  }

  post = await Post.findByIdAndUpdate(postId, updatedPost, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  post = await post.populate("user", "name avatar");

  res.status(200).json({ success: true, post });
});

exports.likePost = catchAsyncError(async (req, res, next) => {
  const { postId } = req.body;
  const post = await Post.findById(postId).populate("user", "name avatar");
  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  post.likes.push(req.user._id);

  await post.save();

  res.status(200).json({ success: true, post });
});

exports.dislikePost = catchAsyncError(async (req, res, next) => {
  const { postId } = req.body;
  const post = await Post.findById(postId).populate("user", "name avatar");
  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  post.likes = post.likes.filter((like) => !like.equals(req.user._id));

  await post.save();

  res.status(200).json({ success: true, post });
});
