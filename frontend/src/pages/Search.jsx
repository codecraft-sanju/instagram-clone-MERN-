import React, { useState } from "react";
import { X } from "lucide-react"; // Cross Icon

const initialUsers = [
  { username: "sanjay_singh_chouhan_joyala", profilePic: "" },
  { username: "Ox_chirag_0x", profilePic: "" },
];

const Search = () => {
  const [users, setUsers] = useState(initialUsers);

  // Function to remove user from recent searches
  const removeUser = (username) => {
    setUsers(users.filter((user) => user.username !== username));
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-950 p-6 text-white">
      <div className="w-full max-w-lg">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search"
          className="w-full p-3 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        {/* Recent Searches */}
        <div className="mt-6 bg-gray-900 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-400">Recent Searches</h2>
            {users.length > 0 && (
              <button
                onClick={() => setUsers([])}
                className="text-gray-400 hover:text-white text-sm"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.username}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.profilePic}
                    alt={user.username}
                    className="w-10 h-10 rounded-full bg-gray-600"
                  />
                  <span className="text-white text-lg">{user.username}</span>
                </div>
                <X
                  size={20}
                  className="text-gray-400 hover:text-white cursor-pointer"
                  onClick={() => removeUser(user.username)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
