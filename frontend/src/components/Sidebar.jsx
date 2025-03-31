import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Search,
  Compass,
  Video,
  MessageCircle,
  Heart,
  Plus,
  BarChart,
  User,
  Menu,
  LogOut,
  Settings,
  Camera,
  Image as Gallery,
  Loader2, // Loading Icon
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { usePost } from '../context/PostContext';

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { logoutUser } = useUser();
  const { createPost } = usePost();

  const handleModalChange = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleCreateModalChange = () => {
    setIsCreateModalOpen((prev) => !prev);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      await createPost(file);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  // 📸 Camera Open Function
  const openCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setIsCameraOpen(false);
    }
  };

  // 📸 Capture Photo
  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      setLoading(true);

      try {
        await createPost(blob);
        setIsCameraOpen(false);
      } catch (error) {
        console.error('Error creating post:', error);
      } finally {
        setLoading(false);
      }
    }, 'image/jpeg');
  };

  return (
    <div className="flex flex-col h-screen bg-black w-72 text-white p-6 fixed left-0 top-0">
      <h1 className="font-mono text-2xl mb-4">Instagram</h1>

      <div className="flex flex-col flex-grow justify-between">
        {[
          { icon: Home, label: 'Home', link: '/' },
          { icon: Search, label: 'Search', link: '/search' },
          { icon: Compass, label: 'Explore', link: '/explore' },
          { icon: Video, label: 'Reels', link: '/reels' },
          { icon: MessageCircle, label: 'Messages', link: '/messages' },
          { icon: Heart, label: 'Notifications', link: '/notifications' },
          {
            icon: Plus,
            label: 'Create',
            link: '#',
            onClick: handleCreateModalChange,
          },
          { icon: BarChart, label: 'Dashboard', link: '/dashboard' },
          { icon: User, label: 'Profile', link: '/profile' },
        ].map(({ icon: Icon, label, link, onClick }) => (
          <Link
            to={link}
            key={label}
            onClick={onClick}
            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300/20"
          >
            <Icon size={24} />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* Create Post Modal */}
      {isCreateModalOpen && (
        <div className="absolute left-2 bottom-60 w-52 bg-gray-900 text-white rounded-lg shadow-lg py-2">
          {loading ? (
            <div className="flex justify-center items-center p-3">
              <Loader2 className="animate-spin" size={24} />
              <span className="ml-2">Uploading...</span>
            </div>
          ) : (
            <>
              <button className="flex items-center gap-3 p-3 w-full hover:bg-gray-700">
                <label className="cursor-pointer flex items-center gap-3 w-full">
                  <Gallery size={20} />
                  <span>Gallery</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </button>
              <button
                onClick={openCamera}
                className="flex items-center gap-3 p-3 w-full hover:bg-gray-700"
              >
                <Camera size={20} />
                <span>Camera</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Camera Modal */}
      {isCameraOpen && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white p-4 rounded-lg shadow-lg flex flex-col items-center">
          <video ref={videoRef} autoPlay className="w-64 h-48 rounded-lg" />
          <canvas ref={canvasRef} className="hidden" />
          <button
            onClick={capturePhoto}
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            Capture & Post
          </button>
          <button
            onClick={() => setIsCameraOpen(false)}
            className="mt-2 text-red-500"
          >
            Close
          </button>
        </div>
      )}

      {/* More Button */}
      <div
        className="relative hover:bg-gray-300/20 p-2 text-white rounded-lg cursor-pointer"
        onClick={handleModalChange}
      >
        <div className="flex items-center gap-3">
          <Menu size={24} />
          <span>More</span>
        </div>

        {/* Modal (Settings & Logout) */}
        {isModalOpen && (
          <div className="absolute left-0 bottom-10 w-52 bg-gray-900 text-white rounded-lg shadow-lg py-2">
            <button className="flex items-center gap-3 p-3 w-full hover:bg-gray-700">
              <Settings size={20} />
              <span>Settings</span>
            </button>
            <button
              onClick={logoutUser}
              className="flex items-center gap-3 p-3 w-full hover:bg-gray-700"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
