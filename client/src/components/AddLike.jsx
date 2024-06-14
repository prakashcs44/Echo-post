import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { dislikePostApi, likePostApi } from "@/redux/api/postApi";
import toast from "react-hot-toast";
function AddLike({ postId, likes }) {
  const { userData } = useSelector((state) => state.auth);
  const [likedState, setLikedState] = useState({
    liked: likes.includes(userData._id),
    totalLikes: likes.length,
  });

  useEffect(() => {
    setLikedState({
      liked: likes.includes(userData._id),
      totalLikes: likes.length,
    });
  }, [likes]);

  const likeHandler = async () => {
    try {
      if (likedState.liked) {
        await dislikePostApi({postId});
        setLikedState(({ liked, totalLikes }) => ({
          liked: !liked,
          totalLikes: totalLikes - 1,
        }));
      } else {
        await likePostApi({postId});
        setLikedState(({ liked, totalLikes }) => ({
          liked: !liked,
          totalLikes: totalLikes + 1,
        }));
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Button
      variant="ghost"
      className="rounded-full space-x-2"
      onClick={likeHandler}
    >
      {likedState.liked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}

      <p>{likedState.totalLikes}</p>
    </Button>
  );
}

export default AddLike;
