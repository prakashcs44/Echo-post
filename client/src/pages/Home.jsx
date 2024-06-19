import Post from "@/components/Post";
import Loader from "@/components/ui/Loader";
import { getAllPost,resetPosts} from "@/redux/slices/postSlice";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import noDataImg from "../assets/no_data.jpg";
import PageWrapper from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { GETTING_POSTS_PENDING } from "@/redux/constants/postConstants";

function Home() {
  const { posts, hasMore,status} = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [page,setPage] = useState(1);
  useEffect(() => {
    dispatch(getAllPost({ page }));
    return ()=>{
      dispatch(resetPosts());
    }
  }, []);


  const pageChange = ()=>{
     setPage(page=>page+1);
     dispatch(getAllPost({page:page+1}));
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
          <Post post={post} key={post._id} />
        ))}
        {hasMore && (
          <div className="flex justify-center">
            <Button onClick = {pageChange} disabled = {status===GETTING_POSTS_PENDING}>Load more posts</Button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default Home;
