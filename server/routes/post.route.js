const router = require("express").Router();
const fileUploader = require("../middleware/fileUploader.js");
const isUserAuthenticated = require("../middleware/auth.js");
const { getPost, addPost, deletePost, updatePost, likePost, getAllPost, dislikePost } = require("../controllers/post.controller.js");
router.get("/",isUserAuthenticated,getAllPost);
router.get("/:id",isUserAuthenticated,getPost);
router.post("/add",isUserAuthenticated,fileUploader.single("file"),addPost);
router.delete("/remove",isUserAuthenticated,deletePost);
router.put("/update",isUserAuthenticated,fileUploader.single("file"),updatePost);
router.put("/like",isUserAuthenticated,likePost);
router.put("/dislike",isUserAuthenticated,dislikePost);

module.exports = router;