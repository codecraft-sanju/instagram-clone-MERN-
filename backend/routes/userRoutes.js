import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateProfilePicture,
} from '../controllers/userController.js';
import { followUser } from '../controllers/followController.js';
import { unfollowUser } from '../controllers/unfollowController.js';
import { isAuth } from '../middlewares/isAuth.js';
import { getFollowersAndFollowing } from '../controllers/followList.js'
import { upload } from '../config/multerConfig.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', isAuth, getUserProfile);
router.put("/profile-picture",isAuth,upload.single("file"),updateProfilePicture)

router.post('/follow/:id', isAuth, followUser);
router.post('/unfollow/:id', isAuth, unfollowUser);
router.get('/follow-list/:id', isAuth, getFollowersAndFollowing);



export default router;
