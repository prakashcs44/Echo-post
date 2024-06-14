const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const Comment = require("../models/comment.model");
const Post = require("../models/post.model.js");

exports.getComment = catchAsyncError(async (req,res,next)=>{
   const {id}  = req.params;
  
    const comment = await Comment.findById(id).populate("user","name avatar");

    if(!comment){
       return next(new ErrorHandler("Comment not found",404));
    }

   comment.user.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${comment.user.avatar}`
   res.status(200).json({success:true,comment});
});


exports.addComment = catchAsyncError(async (req,res,next)=>{
   const {postId,content} = req.body;
   

   const post = await Post.findById(postId);
   if(!post){
      return next(new ErrorHandler("Post not found",404));
   }

   const comment = await Comment.create({
    content,
    post:postId,
    user:req.user._id,
   });

   post.comments.push(comment._id);

   await post.save();

   comment.user.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${comment.user.avatar}`

   res.status(200).json({
    success:true,
    comment,
   });
   

});




exports.deleteComment = catchAsyncError(async (req,res,next)=>{

   const {commentId} = req.body;
   
    await Comment.findByIdAndDelete(commentId);

   res.status(200).json({
    success:true,
    message:"Comment deleted successfully",
   });

});



exports.updateComment = catchAsyncError(async (req,res,next)=>{
   const {content,commentId} = req.body;

   const comment = await Comment.findByIdAndUpdate(commentId,{content},{
    new:true,
    runValidators:true,
   useFindAndModify:true
   });
    
   comment.user.avatar = `${req.protocol}://${req.headers.host}/uploads/user_avatars/${comment.user.avatar}`
   res.status(200).json({
    success:true,
    comment,
   });

});