import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  //  Create Post Function
  const createPost = async (formData) => {
    try {
      const res = await axios.post('/api/posts/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPosts((prev) => [res.data.post, ...prev]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  //  Fetch Posts Function
  const getPosts = async () => {
    try {
      const res = await axios.get('/api/posts');
      setPosts(res.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <PostContext.Provider value={{ posts, createPost, getPosts }}>
      {children}
    </PostContext.Provider>
  );
};

//  Custom Hook to use PostContext
export const usePost = () => useContext(PostContext);
