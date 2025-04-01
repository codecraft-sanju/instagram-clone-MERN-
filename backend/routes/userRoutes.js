import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateProfilePicture,
 
} from '../controllers/userController.js';



import { isAuth } from '../middlewares/isAuth.js';
import { upload } from '../config/multerConfig.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', isAuth, getUserProfile);
router.put(
  '/profile-picture',
  isAuth,
  upload.single('file'),
  updateProfilePicture,
);



export default router;
