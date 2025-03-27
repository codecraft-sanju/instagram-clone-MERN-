import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

// Cloudinary Storage Setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'instagram-clone-stories', // this folder be created in cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'mov'],
    resource_type: 'auto',
  },
});

export const upload = multer({ storage });
