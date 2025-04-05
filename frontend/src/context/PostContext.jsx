import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingUserPosts, setLoadingUserPosts] = useState(false);

  // Fetch all posts (for feed)
  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const { data } = await axios.get('/api/posts');
      setPosts(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching posts');
      console.error('Error fetching posts:', error);
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
      toast.error(error.response?.data?.message || 'Error fetching user posts');
      console.error('Error fetching user posts:', error);
    }
    setLoadingUserPosts(false);
  };

  // Create a new post
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
      toast.success('Post created successfully');
      window.location.reload()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating post');
      console.error('Error creating post:', error);
    }
  };

  // Delete a post
  const deletePost = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`, { withCredentials: true });

      setPosts((prev) => prev.filter((post) => post._id !== postId));
      setUserPosts((prev) => prev.filter((post) => post._id !== postId));

      toast.success('Post deleted successfully');
      window.location.reload()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting post');
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
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
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
