import { Post } from '../models/postModel.js';
import cloudinary from 'cloudinary'; // Cloudinary config import

export const createPost = async (req, res) => {
  try {
    const { caption, comments } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: 'instagram-clone-posts',
      resource_type: 'auto', // Auto-detect file type (image/video)
    });

    // Convert comments into proper format (if provided)
    let formattedComments = [];
    if (comments && Array.isArray(comments)) {
      formattedComments = comments.map((comment) => ({
        user: req.user._id,
        text: comment.text,
        createdAt: new Date(),
      }));
    }

    const post = await Post.create({
      caption,
      image: uploadedImage.secure_url, // Cloudinary URL
      user: req.user._id,
      comments: formattedComments,
    });

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
