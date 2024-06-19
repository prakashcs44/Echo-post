import React from "react";
import { timeAgo } from "@/helpers/dateHelper";
import { Avatar,AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
function Comment({comment}) {
 
  
  

  return (
    <div className=" mx-auto transition-all  border pl-3 pt-2">
      <header className="flex gap-4">
        <Avatar>
          <AvatarImage src = {comment?.user.avatar.url}/>
          <AvatarFallback>{comment?.user.name[0]}</AvatarFallback>
        </Avatar>
       
        <div>
          <Link to={`/user/${comment?.user._id}`} className=" font-bold hover:underline transition-all">
             {comment?.user.name}
          </Link>
          <p>{timeAgo(comment?.createdAt)}</p>
        </div>
      </header>
      <main className="py-6 px-4">
         {comment?.content}
      </main>
    </div>
  );
}

export default Comment;
