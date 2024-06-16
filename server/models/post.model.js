const mongoose = require("mongoose");
const Comment = require("../models/comment.model");
const Schema = mongoose.Schema;



const postSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    file: {
      public_id:{
        type: String,
        
    },
    url:{
        type: String,
       
    }
    },
  
   
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);



postSchema.pre('remove', async function(next) {
  try {
    // Find all comments associated with the post and delete them
    await Comment.deleteMany({ post: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Post", postSchema);
