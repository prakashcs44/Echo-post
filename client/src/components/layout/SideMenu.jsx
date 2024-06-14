import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

import MyDialog from "../MyDialog";
import { useSelector } from "react-redux";
import AddPost from "../AddPost";



function SideMenu() {

  const {userData} = useSelector(state=>state.auth);

  const menuItems = [
    {
      title: "Home",
      icon: <AiOutlineHome />,
      redirect: "/home",
    },
  
    {
      title: "Profile",
      icon: <CgProfile />,
      redirect: `/user/${userData._id}`,
    },
    {
      title: "Following",
      icon: <LiaUserFriendsSolid />,
      redirect: `/user/${userData._id}/following`,
    },
  ];

  

  return (
    <div className="px-10 py-10 shadow-md h-full border bg-white">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            className="text-xl hover:text-blue-500 transition-colors"
            key={item.title}
          >
            <NavLink end to={item.redirect} className = {({isActive})=>isActive?"flex gap-2 items-center text-blue-600":"flex gap-2 items-center"}>
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    <AddPost/>
    </div>
  );
}

export default SideMenu;
