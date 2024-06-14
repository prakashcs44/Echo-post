const sendToken = (user,statusCode,res)=>{
    const token = user.getJWTToken();
    const options = {
       httpOnly:true,
       expires:new Date(
           Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
           ),
          secure:false,
    }
   
   
   
    res.status(statusCode).cookie("token",token,options).json({
       success:true,
       user,
    });
   
   }
   
module.exports = sendToken;