const router = require("express").Router();
const isUserAuthenticated = require("../middleware/auth.js");
const { getPost, addPost, deletePost, updatePost, likePost, getAllPost, dislikePost } = require("../controllers/post.controller.js");
router.get("/",isUserAuthenticated,getAllPost);
router.get("/:id",isUserAuthenticated,getPost);
router.post("/add",isUserAuthenticated,addPost);
router.delete("/remove/:id",isUserAuthenticated,deletePost);
router.put("/update",isUserAuthenticated,updatePost);
router.put("/like",isUserAuthenticated,likePost);
router.put("/dislike",isUserAuthenticated,dislikePost);

module.exports = router;