export const followUser = async (req, res) => {
  try {
    const { id } = req.params; // the id of the user to follow
    const currentUser = req.user._id; // logged-in user

    if (id === currentUser.toString()) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    const userToFollow = await User.findById(id);
    const user = await User.findById(currentUser);

    if (!userToFollow || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already following
    if (user.following.includes(id)) {
      return res.status(400).json({ message: 'Already following this user' });
    }

    user.following.push(id);
    userToFollow.followers.push(currentUser);

    await user.save();
    await userToFollow.save();

    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    console.error('Follow Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
