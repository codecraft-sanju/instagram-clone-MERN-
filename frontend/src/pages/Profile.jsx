import { useState } from "react";
import { Grid, Bookmark, Camera, User, CameraIcon, LoaderCircle } from "lucide-react";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const { user , updateProfilePic, btnLoading} = useUser();

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await updateProfilePic(file);
      window.location.reload();
    }
  }

  return (
    <div className="text-white bg-black min-h-screen">
      {/* Profile Info */}
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center gap-6">
        <div className="w-24 h-24 relative bg-gray-500 rounded-full group">
  <img
    className="w-full h-full object-cover rounded-full"
    src={user.user.profilePicture.url}
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
            <h2 className="text-xl font-semibold">sanjuuu_x18</h2>
            <p className="text-gray-400 text-sm">@sanju_x18</p>
            <p className="mt-1">In a world full of trends, I remain classic.</p>
            <div className="flex gap-4 mt-2">
              <span>21 posts</span>
              <span>742 followers</span>
              <span>751 following</span>
            </div>
          </div>
        </div>

        {/* Stories Highlights */}
        <div className="flex gap-3 mt-6">
          <div className="w-16 h-16 bg-gray-500 rounded-full"></div>
          <div className="w-16 h-16 bg-gray-500 rounded-full"></div>
          <div className="w-16 h-16 bg-gray-500 rounded-full"></div>
          <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center text-xl">
            +
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-around mt-6 border-t border-gray-700 pt-3">
          <button onClick={() => setActiveTab("posts")}>
            <Grid size={24} />
          </button>
          <button onClick={() => setActiveTab("reels")}>
            <Camera size={24} />
          </button>
          <button onClick={() => setActiveTab("saved")}>
            <Bookmark size={24} />
          </button>
          <button onClick={() => setActiveTab("tagged")}>
            <User size={24} />
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-3 gap-1 mt-4">
          <div className="h-32 bg-gray-600"></div>
          <div className="h-32 bg-gray-600"></div>
          <div className="h-32 bg-gray-600"></div>
          <div className="h-32 bg-gray-600"></div>
          <div className="h-32 bg-gray-600"></div>
          <div className="h-32 bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
