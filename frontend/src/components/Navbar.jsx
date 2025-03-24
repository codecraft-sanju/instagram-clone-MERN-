import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between bg-gray-900 text-white p-4">
      <h1 className="text-lg font-bold">Instagram Clone</h1>
      {user ? (
        <div className="space-x-4">
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;
