import axiosClient from "@/axiosClient";


export const getUserApi = async (id)=>{
    const link = `/users/${id}`;
    try{
        const res =  await axiosClient.get(link);
        return res.data;
   
     }
     catch(err){
        throw new Error(err.response.data.message||"Something went wrong");
        
     }
}


export const getFollowersApi = async (id)=>{
   const link = `/users/${id}/followers`;
   try{
      const res = await axiosClient.get(link);
      return res.data;
   }
   catch(err){
      throw new Error(err.response.data.message||"Something went wrong");
   }
}


export const getFollowingApi = async (id)=>{
   const link = `/users/${id}/following`;
   try{
      const res = await axiosClient.get(link);
      return res.data;
   }
   catch(err){
      throw new Error(err.response.data.message||"Something went wrong");
   }
}

export const followUserApi = async (data)=>{
   const link = `/users/follow`;
   try{
      const res = await axiosClient.put(link,data);
      return res.data;
   }
   catch(err){
      throw new Error(err.response.data.message||"Something went wrong");
   }
}

export const unfollowUserApi = async (data)=>{
   const link = `/users/unfollow`;
   try{
      const res = await axiosClient.put(link,data);
      return res.data;
   }
   catch(err){
      throw new Error(err.response.data.message||"Something went wrong");
   }
}