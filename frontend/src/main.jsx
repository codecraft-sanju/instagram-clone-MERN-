import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { PostProvider } from './context/PostContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <PostProvider>
        {' '}
        {/* Wrap App inside PostProvider */}
        <App />
      </PostProvider>
    </UserProvider>
  </StrictMode>,
);
