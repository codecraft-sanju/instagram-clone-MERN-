import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { upload } from '../config/multerConfig.js';
import {
  createPost,
  getAllPosts,
  getUserPosts,
} from '../controllers/postController.js';

const router = express.Router();

router.post('/create', isAuth, upload.single('file'), createPost);
router.get('/', isAuth, getAllPosts); 
router.get('/user/:userId', isAuth, getUserPosts); 

export default router;
