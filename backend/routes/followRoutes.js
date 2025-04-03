import express from 'express';
import {
  followUser,
  unfollowUser,
  getFollowData,
} from '../controllers/followController.js';
import { isAuth } from '../middlewares/isAuth.js';


const router = express.Router();

router.post('/:userId',isAuth, followUser);
router.post('/unfollow/:userId', isAuth, unfollowUser);
router.get('/followdata/:userId', isAuth, getFollowData);

export default router;
