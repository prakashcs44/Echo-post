import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import Comment from '../components/Comment'
import { useParams } from 'react-router-dom'
import { getPostApi } from '@/redux/api/postApi';
import toast from 'react-hot-toast';
import Loader from '../components/ui/Loader';
import PageWrapper from '@/components/layout/PageWrapper';

function ViewPost() {

  const {id} = useParams();
 
  const [loading,setLoading] = useState(false);
  const [post,setPost] = useState();

  

  useEffect(()=>{
     const fetchPost = async (id)=>{
        setLoading(true);
        try{
          const data = await getPostApi(id);
          
          setPost(data.post);
        }
        catch(err){
          toast.error(err.message);
        }
        finally{
          setLoading(false);
        }
     }
     fetchPost(id);
  },[])


  if(loading){
    return <Loader/>
  }

  

  return (
    <PageWrapper>
        {post&&<Post disableView={true} post={post}/>}
      <div className='flex flex-col items-center mt-5 space-y-10'>
        <h1 className="font-bold text-2xl border-b border-black pb-2 w-3/4 text-center ">Comments</h1>
        <div className='space-y-8 w-full px-5'>
             {post?.comments.map(comment=><Comment comment = {comment}/>)}
             {post?.comments.length===0&&<h1 className='text-center font-medium text-xl py-5'>No Comments Found</h1>}
        </div>
      </div>
    </PageWrapper>
   
  )
}

export default ViewPost
