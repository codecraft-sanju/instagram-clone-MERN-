import jwt from 'jsonwebtoken'; // Importing JWT for token verification
import { User } from '../models/userModel.js'; // Importing User model to fetch user details

// Middleware to check if the user is authenticated
export const isAuth = async (req, res, next) => {
  try {
    // 1. Extract the token from cookies
    const token = req.cookies.token;

    // 2. If no token is found, return a 403 (Forbidden) response
    if (!token) {
      return res
        .status(403)
        .json({ message: 'Unauthorized: No token provided' });
    }

    // 3. Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. If token verification fails, return a 403 response
    if (!decoded) {
      return res.status(403).json({ message: 'Token expired' });
    }

    // 5. Fetch the user from the database using the decoded user ID
    req.user = await User.findById(decoded.id);

    // 6. If user is found, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // 7. Handle any server errors
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
