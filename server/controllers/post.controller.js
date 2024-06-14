const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const Post = require("../models/post.model");
const fs = require("fs");
const path = require("path");



exports.getAllPost = catchAsyncError(async (req, res, next) => {
  let posts = await Post.find().populate("user", "name avatar");

  posts = JSON.parse(JSON.stringify(posts));

  posts.forEach((post) => {
    post.user.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${post.user.avatar}`;
  });
  res.status(200).json({
    success: true,
    posts,
  });
});



exports.getPost = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let post = await Post.findById(id)
    .populate('user', 'name avatar')
    .populate({
        path: 'comments',
        populate: {
            path: 'user',
            select: 'name avatar'
        }
    })
   //same reference problem
  post = JSON.parse(JSON.stringify(post));


  post.user.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${post.user.avatar}`;

  post.comments.forEach((comment) => {
    
    comment.user.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${comment.user.avatar}`;
    console.log(comment.user.avatar)
  })

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  res.status(200).json({ success: true, post });
});

exports.addPost = catchAsyncError(async (req, res, next) => {
  const { content } = req.body;
  const file = req.file?.filename;
  let post = await Post.create({
    content,
    user: req.user._id,
    file,
  });

  post = await post.populate("user", "name avatar");

  post.user.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${post.user.avatar}`;
  res.status(200).json({ success: true, post });
});

exports.deletePost = catchAsyncError(async (req, res, next) => {
  const { postId } = req.body;
  const post = await Post.findById(postId);
  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  if (post.file) {
    const filePath = path.resolve(
      __dirname,
      "../uploads/user_files",
      post.file
    );
    fs.rmSync(filePath);
  }

  await Post.deleteOne({ _id: postId });

  res.status(200).json({ success: true, message: "Post deleted successfully" });
});

exports.updatePost = catchAsyncError(async (req, res, next) => {
  const { postId, content } = req.body;
  const file = req.file?.filename;
  let post = await Post.findById(postId);
  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  if (file && post.file) {
    const filePath = path.resolve(
      __dirname,
      "../uploads/user_files",
      post.file
    );
    fs.rmSync(filePath);
  }

  post = await Post.findByIdAndUpdate(
    postId,
    { content, file },
    { new: true, runValidators: true, useFindAndModify: true }
  );

  post = await post.populate("user", "name avatar");
  post.user.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${post.user.avatar}`;
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
  post.user.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${post.user.avatar}`;
  res.status(200).json({ success: true, post });
});


exports.dislikePost  = catchAsyncError(async (req, res, next) => {
  const { postId } = req.body;
  const post = await Post.findById(postId).populate("user", "name avatar");
  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }
  
  post.likes = post.likes.filter((like)=>!like.equals(req.user._id));
 
  await post.save();
  post.user.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${post.user.avatar}`;
  res.status(200).json({ success: true, post });
});

