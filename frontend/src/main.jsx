import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { PostProvider } from './context/PostContext.jsx';
import { Provider } from 'react-redux'; // Import Redux Provider
import store from './redux/store'; // Import Redux Store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PostProvider>
        <App />
      </PostProvider>
    </Provider>
  </StrictMode>,
);
