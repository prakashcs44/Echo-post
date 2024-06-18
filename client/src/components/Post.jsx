import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import AddComment from "./AddComment";
import AddLike from "./AddLike";
import DeletePost from "./DeletePost";
import { timeAgo, dayMonthYear } from "@/helpers/dateHelper";
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar";
import { useSelector } from "react-redux";

function Post({ disableView, post }) {
  
  const {userData} = useSelector(state=>state.auth);

  return (
    <div className=" mx-auto transition-all  border">
      <header className="flex justify-between px-4   pt-4">
        <div className="flex gap-4">
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
        </div>
         <div className="flex items-center gap-10">
         {!disableView && (
          <Button >
            <Link to={`/post/${post._id}`}>View</Link>
          </Button>
        )}
        {
          userData?._id===post?.user._id&&(
             <DeletePost postId = {post?._id}/>
          )
        }
         </div>
      
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
