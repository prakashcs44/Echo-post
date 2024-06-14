import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { followUserApi, unfollowUserApi } from "@/redux/api/userApi";
import { updateFollowing } from "@/redux/slices/authSlice"; 

function Follow({ user }) {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(() =>
    userData?.following.includes(user)
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFollowing(() => userData?.following.includes(user));
  }, [user]);

  const followHandler = async () => {
    setLoading(true);
    try {
      if (following) {
        const data = await unfollowUserApi({ userId: user });
        setFollowing(false);
        dispatch(updateFollowing(data.following));
      } else {
        const data = await followUserApi({ userId: user });
        setFollowing(true);
        dispatch(updateFollowing(data.following));
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button disabled={loading} onClick={followHandler} variant = {following?"destructive-outline":"default"}>
      {following ? "Unfollow" : "Follow"}
    </Button>
  );
}

export default Follow;
