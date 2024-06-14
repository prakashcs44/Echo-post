import axiosClient from "@/axiosClient";

export const loginApi = async (data)=>{
  const link = "/users/login";
  
  try{
     const res =  await axiosClient.post(link,data);
     return res.data;

  }
  catch(err){
     throw new Error(err.response.data.message||"Something went wrong");
     
  }

};

export const registerApi = async (data)=>{
    const link  = "/users/register";
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
          },
    }
    try{
        const res =  await axiosClient.post(link,data,config);
        return res.data;
   
     }
     catch(err){
      throw new Error(err.response.data.message||"Something went wrong");
     }
}


export const logoutApi = async ()=>{
    const link = "/users/me/logout";
    
    try{
       const res =  await axiosClient.post(link);
       return res.data;
  
    }
    catch(err){
      throw new Error(err.response.data.message||"Something went wrong");
    }
  
  };
  
export const getLoggedInUserApi = async ()=>{
   const link = "/users/me";
   
   try{
      const res =  await axiosClient.get(link);
      return res.data;
 
   }
   catch(err){
     throw new Error(err.response.data.message||"Something went wrong");
   }
 
};

export const updateProfileApi = async (data)=>{
   const link = "/users/me/update-profile";
   const config = {
      headers: {
          "Content-Type": "multipart/form-data",
        },
  }
   try{
      const res =  await axiosClient.put(link,data,config);
      return res.data;
 
   }
   catch(err){
     throw new Error(err.response.data.message||"Something went wrong");
   }
 
};
