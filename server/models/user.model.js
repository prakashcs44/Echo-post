const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required:[true,"Please Enter your name"],
      maxLength:[30,"Name should not have more than 30 characters"],
      minLength:[3,"Name should not have less than 3 characters"]

    },
    email: {
      type: String,
      required: [true,"Please enter your email"],
      unique: true,
      trim: true,
      validate:[validator.isEmail,"Please enter a valid email"]
    },
    password: {
      type: String,
      required: [true,"Please enter your password"],
      minLength:[8,"Password should be greater than 8 characters"],
      select:false,
  
    },
    avatar: {
      type: String,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    location: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    interests: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    savedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],

  },
  {
    timestamps: true,
  }
);



userSchema.pre("save",async function(next){
 
    if(!this.isModified("password")){
        return next();
     }

    try{
        this.password =  await bcrypt.hash(this.password,10);
        return next();
    }
    catch(err){
        return next(err);
    }
 });
 

 userSchema.methods.comparePassword =  async function(password){
    return await bcrypt.compare(password,this.password);
}


userSchema.methods.getJWTToken = function(){
  const payload = {
     id:this._id,
  }

  return jwt.sign(payload,process.env.JWT_SECRET,{
     expiresIn:process.env.JWT_EXPIRE,
  });

}



module.exports = mongoose.model("User", userSchema);
