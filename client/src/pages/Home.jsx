import Post from "@/components/Post";
import Loader from "@/components/ui/Loader";
import { getAllPost } from "@/redux/slices/postSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import noDataImg from "../assets/no_data.jpg";
import PageWrapper from "@/components/layout/PageWrapper";
import { GETTING_POSTS_PENDING } from "@/redux/constants/postConstants";

function Home() {
  const { posts, status } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost());
  }, []);

  if (status === GETTING_POSTS_PENDING) {
    return <Loader />;
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <img src={noDataImg} className=" h-[60vh]" />
        <h1 className="font-bold text-xl">No Posts yet</h1>
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className=" space-y-10">
        {posts.map((post) => (
          <Post post={post} key={post._id}/>
        ))}
      </div>
    </PageWrapper>
  );
}

export default Home;
