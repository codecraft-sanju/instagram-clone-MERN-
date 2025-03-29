export const getFollowersAndFollowing = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .populate('followers', 'name username')
      .populate('following', 'name username');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      followers: user.followers,
      following: user.following,
    });
  } catch (error) {
    console.error('Follow List Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
