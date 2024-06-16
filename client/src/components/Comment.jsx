import React from "react";
import profileImg from "../assets/default_user.jpg";
import { timeAgo } from "@/helpers/dateHelper";
function Comment({comment}) {
 
  
  

  return (
    <div className=" mx-auto transition-all  border pl-3 pt-2">
      <header className="flex gap-4">
        <img src={comment?.user.avatar.url||profileImg} alt="user" className=" size-12 rounded-full object-cover" />
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
