import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]); // All posts for feed
  const [userPosts, setUserPosts] = useState([]); // Specific user posts
  const [loadingPosts, setLoadingPosts] = useState(false); // For feed posts
  const [loadingUserPosts, setLoadingUserPosts] = useState(false); // For user-specific posts

  // Fetch all posts (for feed)
  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const { data } = await axios.get('/api/posts');
      setPosts(data);
    } catch (error) {
      console.error(
        'Error fetching posts:',
        error.response?.data?.message || error.message,
      );
    }
    setLoadingPosts(false);
  };

  // Fetch posts for a specific user
  const fetchUserPosts = async (userId) => {
    setLoadingUserPosts(true);
    try {
      const { data } = await axios.get(`/api/posts/user/${userId}`);
      setUserPosts(data);
    } catch (error) {
      console.error(
        'Error fetching user posts:',
        error.response?.data?.message || error.message,
      );
    }
    setLoadingUserPosts(false);
  };

  const createPost = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('caption', '');

      const { data } = await axios.post('/api/posts/create', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setPosts((prevPosts) => [data.post, ...prevPosts]);
    } catch (error) {
      console.error(
        'Error creating post:',
        error.response?.data?.message || error.message,
      );
    }
  };

  useEffect(() => {
    fetchPosts(); // Auto-fetch posts on mount
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        userPosts,
        loadingPosts,
        loadingUserPosts,
        fetchUserPosts,
        createPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
