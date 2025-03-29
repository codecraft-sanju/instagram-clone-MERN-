import { Heart, MessageCircle, Plus } from "lucide-react";

const Post = () => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg w-full max-w-xl mb-6 border-b border-gray-700 pb-6 mt-5">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
        <span className="font-semibold">Username</span>
      </div>

      {/* Post Image/Video Placeholder */}
      <div className="mt-3 bg-gray-700 h-96 rounded-lg"></div>

      {/* Icons: Close Together */}
      <div className="flex items-center gap-3 mt-3">
        <Heart size={24} className="cursor-pointer" />
        <MessageCircle size={24} className="cursor-pointer" />
        <Plus size={24} className="cursor-pointer" />
      </div>

      {/* Likes & Description */}
      <p className="text-sm mt-2">Liked by <b>user1</b> and others</p>
    </div>
  );
};

export default Post;
