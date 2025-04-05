import express from 'express';
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from '../controllers/followController.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

// Follow a user
router.post('/follow/:id', isAuth, followUser);

// Unfollow a user
router.delete('/unfollow/:id', isAuth, unfollowUser);

// Get followers of a user
router.get('/followers/:id', isAuth, getFollowers);

// Get following of a user
router.get('/following/:id', isAuth, getFollowing);

export default router;
