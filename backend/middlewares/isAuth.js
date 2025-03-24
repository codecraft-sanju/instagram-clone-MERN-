import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(403)
        .json({ message: 'Unauthorized: No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or Expired Token' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
