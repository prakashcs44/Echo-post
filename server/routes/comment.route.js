const router = require("express").Router();
const { getComment, addComment, deleteComment, updateComment } = require("../controllers/comment.controller.js");
const isUserAuthenticated = require("../middleware/auth.js");


router.get("/:id",isUserAuthenticated,getComment);
router.post("/add",isUserAuthenticated,addComment);
router.delete("/remove",isUserAuthenticated,deleteComment);
router.put("/update",isUserAuthenticated,updateComment);



module.exports = router;