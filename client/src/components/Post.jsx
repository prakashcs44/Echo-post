import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import AddComment from "./AddComment";
import AddLike from "./AddLike";
import { timeAgo, dayMonthYear } from "@/helpers/dateHelper";
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar";

function Post({ disableView, post }) {
  
  return (
    <div className=" mx-auto transition-all  border">
      <header className="flex gap-4 px-4 pt-4">
      <Avatar>
          <AvatarImage src = {post?.user.avatar.url}/>
          <AvatarFallback>{post?.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <Link
            to={`/user/${post?.user._id}`}
            className=" font-bold hover:underline transition-all"
          >
            {post?.user.name}
          </Link>
          <p>
            {disableView
              ? dayMonthYear(post?.createdAt)
              : timeAgo(post?.createdAt)}
          </p>
        </div>
        {!disableView && (
          <Button className=" ml-auto mr-10">
            <Link to={`/post/${post._id}`}>View</Link>
          </Button>
        )}
      </header>
      {post?.file&&(
         <div className="py-10">
         <img src={post?.file?.url} alt = "post file" className="w-full h-auto max-h-[85vh] object-cover"/>
         </div>
      )}
      
      
      <main className="py-6 px-4">{post.content}</main>
      <div>
        <AddLike likes={post?.likes} postId={post._id} />

        <AddComment totalComment={post?.comments.length} postId={post._id} />
      </div>
    </div>
  );
}

export default Post;
