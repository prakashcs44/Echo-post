const router = require("express").Router();
const {registerUser, loginUser, logoutUser, getUserDetails, updatePassword, updateProfile, getLoggedInUserDetails, getFollowers, getFollowing, followUser, unfollowUser} = require("../controllers/user.controller.js");
const avatarUploader = require("../middleware/avatarUploader.js");
const isUserAuthenticated = require("../middleware/auth.js");



router.post("/register",avatarUploader.single("avatar"),registerUser);
router.post("/login",loginUser);
router.post("/me/logout",logoutUser);
router.get("/me",isUserAuthenticated,getLoggedInUserDetails);
router.put("/me/update-password",isUserAuthenticated,updatePassword);
router.put("/me/update-profile",isUserAuthenticated,avatarUploader.single("avatar"),updateProfile);
router.get("/:id",isUserAuthenticated,getUserDetails);
router.get("/:id/following",isUserAuthenticated,getFollowing);
router.get("/:id/followers",isUserAuthenticated,getFollowers);
router.put("/follow",isUserAuthenticated,followUser);
router.put("/unfollow",isUserAuthenticated,unfollowUser);

module.exports = router;