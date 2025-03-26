import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Loading from "./components/Loading";

function App() {
    const { isAuth,loading } = useUser();
    return (
        <UserProvider>
            {loading ? <Loading /> :
                <Router>
                    <Routes>
                        <Route path="/" element={isAuth ? <Home /> : <Login />} />
                        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
                        <Route path="/register" element={isAuth? <Home/> : <Register />} />
                        <Route path="/profile" element={isAuth ? <Profile
                        /> : <Login />
                        } />
                    </Routes>
                </Router>
            }
        </UserProvider>
    );
}

export default App;

