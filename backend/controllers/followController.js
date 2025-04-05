import { User } from '../models/userModel.js';

// 1️ Follow a user
export const followUser = async (req, res) => {
  try {
    const userToFollowId = req.params.id;
    const currentUserId = req.user._id;

    if (userToFollowId === currentUserId.toString()) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    const userToFollow = await User.findById(userToFollowId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userToFollow.followers.includes(currentUserId)) {
      return res.status(400).json({ message: 'Already following this user' });
    }

    userToFollow.followers.push(currentUserId);
    currentUser.following.push(userToFollowId);

    await userToFollow.save();
    await currentUser.save();

    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    console.error('Follow Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 2️ Unfollow a user
export const unfollowUser = async (req, res) => {
  try {
    const userToUnfollowId = req.params.id;
    const currentUserId = req.user._id;

    const userToUnfollow = await User.findById(userToUnfollowId);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUserId.toString(),
    );
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userToUnfollowId.toString(),
    );

    await userToUnfollow.save();
    await currentUser.save();

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error('Unfollow Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 3️ Get followers of a user
export const getFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate(
      'followers',
      'username profilePicture',
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.followers);
  } catch (error) {
    console.error('Get Followers Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 4️ Get following of a user
export const getFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate(
      'following',
      'username profilePicture',
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.following);
  } catch (error) {
    console.error('Get Following Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
