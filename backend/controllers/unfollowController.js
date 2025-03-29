export const unfollowUser = async (req, res) => {
  try {
    const { id } = req.params; // the id of the user to unfollow
    const currentUser = req.user._id; // logged-in user

    if (id === currentUser.toString()) {
      return res.status(400).json({ message: "You can't unfollow yourself" });
    }

    const userToUnfollow = await User.findById(id);
    const user = await User.findById(currentUser);

    if (!userToUnfollow || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if not following
    if (!user.following.includes(id)) {
      return res
        .status(400)
        .json({ message: "You're not following this user" });
    }

    // Remove from following list
    user.following = user.following.filter(
      (userId) => userId.toString() !== id,
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (userId) => userId.toString() !== currentUser.toString(),
    );

    await user.save();
    await userToUnfollow.save();

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error('Unfollow Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
