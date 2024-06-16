require("dotenv").config();
const express = require("express");
const app = express();
const Database = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.route");
const postRoutes  = require("./routes/post.route");
const commentRoutes  = require("./routes/comment.route.js");
const errorMiddleware = require("./middleware/error.js");
const PORT = process.env.PORT||4000;
const MONGODB_URI = process.env.MONGODB_URI||"mongodb://127.0.0.1:27017/social_media_app";
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());




app.use(cors({
    origin:process.env.CLIENT_ORIGIN||"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","DELETE","PUT"]
    
}));



const db = new Database(MONGODB_URI);

db.connect();

app.get("/",(req,res)=>res.json({message:"SERVER UP AND RUNNING..."}));

app.use("/users",userRoutes);
app.use("/posts",postRoutes);
app.use("/comments",commentRoutes);
app.use(errorMiddleware);

app.listen(PORT,()=>console.log(`SERVER STARTED AT PORT:${PORT}`));



