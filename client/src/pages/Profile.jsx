import React, { useEffect, useState } from "react";
import defaultCoverImg from "../assets/default_cover.jpg";
import defaultUserImg from "../assets/default_user.jpg";
import { Button } from "@/components/ui/button";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Post from "@/components/Post";
import MyDialog from "@/components/MyDialog";
import { useSelector } from "react-redux";
import { getUserApi } from "@/redux/api/userApi";
import Loader from "@/components/ui/Loader";
import PageWrapper from "@/components/layout/PageWrapper";
import toast from "react-hot-toast";
import Follow from "@/components/Follow";
import EditProfile from "@/components/EditProfile";
import { dayMonthYear } from "@/helpers/dateHelper";
import { Avatar,AvatarImage,AvatarFallback } from "@/components/ui/avatar";

function Profile() {
  const { id } = useParams();

  const { userData } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  

  useEffect(() => {
    const fetchUserData = async (id) => {
      setLoading(true);
      try {
        const data = await getUserApi(id);
        setUser(data.user);
      } catch (err) {
         toast.error(err.message);
      }
      finally{
        setLoading(false);
      }
      
    };
     fetchUserData(id);
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <PageWrapper>
      <div className=" h-48 border">
        <img src={defaultCoverImg} className="h-full w-full object-cover" />
      </div>
      <div className="flex justify-between pl-2 md:px-5  py-5">
        <div className=" -translate-y-20">
        <Avatar className = "size-32 md:size-36">
          <AvatarImage src = {user?.avatar.url}/>
          <AvatarFallback className = "text-3xl">{user?.name[0]}</AvatarFallback>
        </Avatar>
          <h1 className="font-bold text-lg">{user?.name}</h1>
          <p className="py-3 font-medium">{user?.bio}</p>
          <span className="flex gap-2 items-center">
            <FaRegCalendarAlt />
            <p>Joined {dayMonthYear(user?.createdAt)}</p>
          </span>
          <span className="flex md:gap-3 md:flex-row flex-col mt-4 md:mt-0">
            <Link to={`/user/${id}/following`} className="hover:underline">
              {user?.following?.length} followings
            </Link>
            <Link to={`/user/${id}/follower`} className="hover:underline">
              {user?.followers?.length} followers
            </Link>
          </span>
        </div>
        {userData._id === id?(
           <EditProfile/>
        ):(
          <Follow user = {id}/>
        )}
      </div>
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl border-b border-black pb-2 w-3/4 text-center ">
          Posts
        </h1>
        <div className=" py-5 space-y-10 w-full px-5 ">
          {user?.posts.map(post=><Post post={post} key={post._id}/>)}
          {user?.posts.length===0&&<h1 className='text-center font-medium text-xl py-5'>No Post Found</h1>}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Profile;
