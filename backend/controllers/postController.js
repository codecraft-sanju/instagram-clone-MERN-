import { Post } from '../models/postModel.js';

// Post Create Controller (Image/Video Upload)
export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }
    const post = await Post.create({
      caption,
      image: req.file.path, // Cloudinary URL
      user: req.user._id,
    });

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
