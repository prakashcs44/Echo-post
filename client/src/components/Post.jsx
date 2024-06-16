import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import AddComment from "./AddComment";
import AddLike from "./AddLike";
import { timeAgo, dayMonthYear } from "@/helpers/dateHelper";
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar";

function Post({ disableView, post }) {
  
  return (
    <div className=" mx-auto transition-all  border pl-3 pt-2">
      <header className="flex gap-4">
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
      <main className="py-6 px-4">{post.content}</main>
      <div>
        <AddLike likes={post?.likes} postId={post._id} />

        <AddComment totalComment={post?.comments.length} postId={post._id} />
      </div>
    </div>
  );
}

export default Post;
