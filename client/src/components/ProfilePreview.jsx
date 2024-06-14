import React from "react";
import defaultUserImg from "../assets/default_user.jpg";
import { Link } from "react-router-dom";
import Follow from "./Follow";
import { useSelector } from "react-redux";
function ProfilePreview({ user, onFollowing }) {
  const {userData} = useSelector(state=>state.auth);

  return (
    <div className="flex justify-between items-center px-4 py-2 border cursor-pointer hover:bg-slate-50">
      <div className="flex gap-3 items-center font-medium">
        <img
          src={user?.avatar || defaultUserImg}
          className="rounded-full size-14"
        />
        <Link to={`/user/${user?._id}`} className="hover:underline">{user?.name}</Link>
      </div>
      {userData._id!==user?._id&&(
       <Follow user = {user?._id}/>
      )}
    </div>
  );
}

export default ProfilePreview;
