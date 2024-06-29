import React, { useEffect } from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "@/redux/slices/postSlice";
import { GET_POSTS_PENDING } from "@/redux/constants/postConstants";

function ViewPost() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { currentPost, status } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPost(id));
  }, []);

  if (status === GET_POSTS_PENDING) {
    return <Loader />;
  }

  return (
    <div>
      {currentPost ? (
        <>
          <Post disableView={true} post={currentPost} />
          <div className="flex flex-col items-center mt-5 space-y-10">
            <h1 className="font-bold text-2xl border-b border-black pb-2 w-3/4 text-center ">
              Comments
            </h1>
            <div className="space-y-8 w-full px-5">
              {currentPost?.comments.map((comment) => (
                <Comment comment={comment} />
              ))}
              {currentPost?.comments.length === 0 && (
                <h1 className="text-center font-medium text-xl py-5">
                  No Comments Found
                </h1>
              )}
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-center font-medium text-xl">Post not found</h1>
      )}
    </div>
  );
}

export default ViewPost;
