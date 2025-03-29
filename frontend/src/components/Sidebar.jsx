import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import { useUser } from "../context/UserContext";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logoutUser } = useUser();

  const handleModalChange = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-black w-72 text-white p-6 fixed left-0 top-0">
      <h1 className="font-mono text-2xl mb-4">Instagram</h1>

      <div className="flex flex-col flex-grow justify-between">
        {[
          { icon: Home, label: "Home", link: "/" },
          { icon: Search, label: "Search", link: "/search" },
          { icon: Compass, label: "Explore", link: "/explore" },
          { icon: Video, label: "Reels", link: "/reels" },
          { icon: MessageCircle, label: "Messages", link: "/messages" },
          { icon: Heart, label: "Notifications", link: "/notifications" },
          { icon: Plus, label: "Create", link: "/create" },
          { icon: BarChart, label: "Dashboard", link: "/dashboard" },
          { icon: User, label: "Profile", link: "/profile" },
        ].map(({ icon: Icon, label, link }) => (
          <Link
            to={link}
            key={label}
            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300/20"
          >
            <Icon size={24} />
            <span>{label}</span>
          </Link>
        ))}
      </div>

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
            <button className="flex items-center gap-3 p-3 w-full hover:bg-gray-700">
              <Settings size={20} />
              <span>Settings</span>
            </button>
            <button className="flex items-center gap-3 p-3 w-full hover:bg-gray-700">
              <Settings size={20} />
              <span>Settings</span>
            </button>
            <button className="flex items-center gap-3 p-3 w-full hover:bg-gray-700">
              <Settings size={20} />
              <span>Settings</span>
            </button>
            <button className="flex items-center gap-3 p-3 w-full hover:bg-gray-700">
              <Settings size={20} />
              <span>Settings</span>
            </button>
            <button onClick={logoutUser} className="flex items-center gap-3 p-3 w-full hover:bg-gray-700">
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
