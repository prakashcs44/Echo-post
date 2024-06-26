import axiosClient from "@/axiosClient";

export const getAllPostApi = async({page=1,user})=>{
    const limit = 5;
    let link = `/posts?limit=${limit}&page=${page}`;
    if(user){
        link = `${link}&user=${user}`;
    }

   
   

    try{
        const res =  await axiosClient.get(link);
        return res.data;
    }

    catch(err){
        
        throw new Error(err.response.data.message||"Something went wrong");
    }
}

export const getPostApi = async(id)=>{
    const link  = `/posts/${id}`;
   
    try{
        const res =  await axiosClient.get(link);
        return res.data;
    }

    catch(err){
        throw new Error(err.response.data.message||"Something went wrong");
    }
}


export const addPostApi = async(data)=>{
    const link = "/posts/add";
    try{
     const res = await axiosClient.post(link,data);
     return res.data;
    }
    catch(err){
        throw new Error(err.response.data.message||"Something went wrong");
    }
}

export const likePostApi = async(data)=>{
    const link = "/posts/like";
    try{
     const res = await axiosClient.put(link,data);
     return res.data;
    }
    catch(err){
        throw new Error(err.response.data.message||"Something went wrong");
    }
}

export const dislikePostApi = async(data)=>{
    const link = "/posts/dislike";
    try{
     const res = await axiosClient.put(link,data);
     return res.data;
    }
    catch(err){
        throw new Error(err.response.data.message||"Something went wrong");
    }
}

export const deletePostApi = async (postId)=>{
    const link = `/posts/remove/${postId}`;
    try{
        const res = await axiosClient.delete(link);
        return res.data;
       }
       catch(err){
           throw new Error(err.response.data.message||"Something went wrong");
       }

}