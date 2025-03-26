import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, logoutUser } = useUser();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-3xl font-bold mb-4">Profile</h1>
            {user ? (
                <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
                    <p className="text-lg font-semibold">Name: <span className="font-normal">{user.user.name}</span></p>
                    <p className="text-lg font-semibold">Username: <span className="font-normal">{user.user.username}</span></p>
                    <p className="text-lg font-semibold">Email: <span className="font-normal">{user.user.email}</span></p>
                    <button 
                        onClick={logoutUser} 
                        className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p className="text-lg">Loading...</p>
            )}
        </div>
    );
};

export default Profile;