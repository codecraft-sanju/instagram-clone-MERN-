import React, { useState, useEffect } from 'react';
import {
  Grid,
  Bookmark,
  Camera,
  User,
  CameraIcon,
  LoaderCircle,
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { usePost } from '../context/PostContext';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const { user, updateProfilePic, btnLoading } = useUser();
  const { userPosts, fetchUserPosts } = usePost(); // 🔹 Change here

  useEffect(() => {
    if (user?.user?._id) {
      fetchUserPosts(user.user._id);
    }
  }, [user?.user?._id]);

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await updateProfilePic(file);
    }
  };

  return (
    <div className="text-white bg-black min-h-screen flex flex-col items-center px-4">
      {/* Profile Info */}
      <div className="max-w-4xl w-full p-6  rounded-lg shadow-lg mt-6">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-28 h-28 relative bg-gray-500 rounded-full group overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-full"
              src={user?.user?.profilePicture?.url || 'default-profile.png'}
              alt="profilepicture"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <label className="cursor-pointer flex items-center justify-center">
                {btnLoading ? (
                  <LoaderCircle className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <CameraIcon className="text-white" size={24} />
                )}
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  disabled={btnLoading}
                  onChange={handleProfilePictureChange}
                />
              </label>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {user?.user?.username || 'Unknown'}
            </h2>
            <p className="text-gray-400 text-sm">
              @{user?.user?.username || 'unknown'}
            </p>
            <p className="mt-2 text-gray-300">
              {user?.user?.bio || 'No bio available'}
            </p>
            <div className="flex justify-center md:justify-start gap-6 mt-3 text-gray-300">
              <span>{userPosts?.length || 0} Posts</span> {/* 🔹 Change here */}
              <span>{user?.user?.followers?.length || 0} Followers</span>
              <span>{user?.user?.following?.length || 0} Following</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-around mt-6 border-t border-gray-700 pt-3">
          <button className="p-2" onClick={() => setActiveTab('posts')}>
            <Grid size={24} className="text-white" />
          </button>
          <button className="p-2" onClick={() => setActiveTab('reels')}>
            <Camera size={24} className="text-white" />
          </button>
          <button className="p-2" onClick={() => setActiveTab('saved')}>
            <Bookmark size={24} className="text-white" />
          </button>
          <button className="p-2" onClick={() => setActiveTab('tagged')}>
            <User size={24} className="text-white" />
          </button>
        </div>

        {/* Posts Grid */}
        {activeTab === 'posts' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 mt-4">
            {userPosts?.length > 0 ? ( //  Change here
              userPosts.map((post) => (
                <img
                  key={post._id}
                  src={post.image}
                  alt="Post"
                  className="h-60 w-full object-cover cursor-pointer rounded-md hover:opacity-80 transition-opacity"
                />
              ))
            ) : (
              <p className="text-center text-gray-400 col-span-full mt-4">
                No posts yet
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
