import axiosClient from "@/axiosClient";


export const addCommentApi = async (data)=>{
  const link = "/comments/add";
  try{
   const res = await axiosClient.post(link,data);
   return res.data;
  }
  catch(err){
    throw new Error(err.response.data.message||"Something went wrong");
  }
}