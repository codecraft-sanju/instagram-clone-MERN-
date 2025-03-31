import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all posts (for feed)
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/posts'); // Backend route should match
      setPosts(data);
    } catch (error) {
      console.error(
        'Error fetching posts:',
        error.response?.data?.message || error.message,
      );
    }
    setLoading(false);
  };

  // Fetch posts for a specific user
  const fetchUserPosts = async (userId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/posts/user/${userId}`);
      setPosts(data);
    } catch (error) {
      console.error(
        'Error fetching user posts:',
        error.response?.data?.message || error.message,
      );
    }
    setLoading(false);
  };

 const createPost = async (file) => {
   try {
     const formData = new FormData();
     formData.append('file', file); 
     formData.append('caption', ''); 

     const { data } = await axios.post('/api/posts/create', formData, {
       withCredentials: true,
       headers: {
         'Content-Type': 'multipart/form-data',
       },
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
    fetchPosts(); // Auto-fetch posts on component mount
  }, []);

  return (
    <PostContext.Provider
      value={{ posts, loading, fetchUserPosts, createPost }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
