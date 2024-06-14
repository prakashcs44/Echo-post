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
const path = require("path");



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());




app.use(cors({
    origin:process.env.CLIENT_ORIGIN||"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","DELETE","PUT"]
    
}));


app.use('/uploads/user_avatars', express.static(path.join(__dirname, 'uploads', 'user_avatars')));
app.use('/uploads/user_files', express.static(path.join(__dirname, 'uploads', 'user_files')));


const db = new Database(MONGODB_URI);

db.connect();

app.get("/",(req,res)=>res.json({message:"SERVER UP AND RUNNING..."}));

app.use("/users",userRoutes);
app.use("/posts",postRoutes);
app.use("/comments",commentRoutes);
app.use(errorMiddleware);

app.listen(PORT,()=>console.log(`SERVER STARTED AT PORT:${PORT}`));



