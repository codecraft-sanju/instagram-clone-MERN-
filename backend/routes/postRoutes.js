import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { upload } from '../config/multerConfig.js';
import { createPost } from '../controllers/postController.js';

const router = express.Router();

router.post('/create', isAuth, upload.single('file'), createPost);

export default router;
