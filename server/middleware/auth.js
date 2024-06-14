const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError  = require("./catchAsyncError.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const isUserAuthenticated = catchAsyncError(async (req,res,next)=>{
    
    const token = req.cookies?.token;
   if(!token){
    return next(new ErrorHandler("Please login to access this resource"),401);
   }

   
   
   const decodedData =  jwt.verify(token,process.env.JWT_SECRET);
  
   req.user = await User.findById(decodedData.id);
   
   return next();

});

module.exports = isUserAuthenticated;

