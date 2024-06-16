import React from "react";
import profileImg from "../assets/default_user.jpg";
import { timeAgo } from "@/helpers/dateHelper";
import { Avatar,AvatarFallback, AvatarImage } from "./ui/avatar";
function Comment({comment}) {
 
  
  

  return (
    <div className=" mx-auto transition-all  border pl-3 pt-2">
      <header className="flex gap-4">
        <Avatar>
          <AvatarImage src = {comment?.user.avatar.url}/>
          <AvatarFallback>{comment?.user.name[0]}</AvatarFallback>
        </Avatar>
       
        <div>
          <button className=" font-bold hover:underline transition-all">
             {comment?.user.name}
          </button>
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
