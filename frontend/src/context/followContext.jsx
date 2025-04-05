import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

// Create a new context for Follow functionality
const FollowContext = createContext();
const API = 'http://localhost:5000/api';

// FollowProvider component to wrap around parts of the app that need follow data
export const FollowProvider = ({ children }) => {
  // Destructure required functions from UserContext
  const { user, fetchUser, fetchAllUsers } = useUser();

  // State to track loading during follow/unfollow actions
  const [followLoading, setFollowLoading] = useState(false);

  // Check if the logged-in user is following another user by ID
  const isFollowing = (id) => {
    return user?.user?.following?.includes(id); // Check from current user's following list
  };

  // Function to follow a user
  const followUser = async (userId) => {
    try {
      setFollowLoading(true);

      // Send follow request to backend
      await axios.post(
        `${API}/follow/follow/${userId}`,
        {},
        { withCredentials: true },
      );

      // Reload the page and refresh user data
      window.location.reload();
      await fetchUser();
      await fetchAllUsers();
    } catch (error) {
      console.error('Error following user:', error);
    } finally {
      setFollowLoading(false);
    }
  };

  // Function to unfollow a user
  const unfollowUser = async (userId) => {
    try {
      setFollowLoading(true);

      // Send unfollow request to backend
      await axios.delete(`${API}/follow/unfollow/${userId}`, {
        withCredentials: true,
      });

      // Reload the page and refresh user data
      window.location.reload();
      await fetchUser();
      await fetchAllUsers();
    } catch (error) {
      console.error('Error unfollowing user:', error);
    } finally {
      setFollowLoading(false);
    }
  };

  // Provide follow-related functions and state to context consumers
  return (
    <FollowContext.Provider
      value={{ followUser, unfollowUser, isFollowing, followLoading }}
    >
      {children}
    </FollowContext.Provider>
  );
};

// Custom hook to use FollowContext easily
export const useFollow = () => useContext(FollowContext);
