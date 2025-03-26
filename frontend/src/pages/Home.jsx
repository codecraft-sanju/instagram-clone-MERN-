import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Instagram Clone</h1>
            <button 
                onClick={() => navigate("/profile")}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
                Go to Profile
            </button>
        </div>
    );
};

export default Home;
