import { User } from '../models/userModel.js';


export const followUser = async (req, res) => {
  try {
    const { userId } = req.params; 
    const currentUserId = req.user.id; 

    if (currentUserId === userId) {
      return res.status(400).json({ message: 'You cannot follow yourself' });
    }

    const userToFollow = await User.findById(userId);
    const followingUser = await User.findById(currentUserId);

    if (!userToFollow || !followingUser) {
      return res.status(404).json({ message: 'User not found' });
    }


    if (!followingUser.following.includes(userId)) {
      followingUser.following.push(userId);
      userToFollow.followers.push(currentUserId);

      await followingUser.save();
      await userToFollow.save();

      return res.status(200).json({ message: 'Followed Successfully' });
    } else {
      return res.status(400).json({ message: 'Already Following' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    const userToUnfollow = await User.findById(userId);
    const followingUser = await User.findById(currentUserId);

    if (!userToUnfollow || !followingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (followingUser.following.includes(userId)) {
      followingUser.following = followingUser.following.filter(
        (id) => id.toString() !== userId,
      );
      userToUnfollow.followers = userToUnfollow.followers.filter(
        (id) => id.toString() !== currentUserId,
      );

      await followingUser.save();
      await userToUnfollow.save();

      return res.status(200).json({ message: 'Unfollowed Successfully' });
    } else {
      return res.status(400).json({ message: 'Not Following' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Followers & Following List
export const getFollowData = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .populate('followers', 'username profilePicture')
      .populate('following', 'username profilePicture');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      followers: user.followers,
      following: user.following,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
