import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 overflow-hidden">
      {/* Futuristic subtle glow pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-purple-700/30 via-indigo-600/20 to-transparent rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-400/20 via-purple-500/10 to-transparent rounded-full blur-2xl opacity-25" />
      </div>

      {/* Dashboard Card */}
      <div className="bg-[#1e1f2f] border border-gray-700/50 backdrop-blur-md rounded-2xl shadow-lg p-8 max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          Welcome to the Dashboard
        </h1>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/file-upload")}
            className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
          >
            Upload Your Resume
          </button>

          <button
            onClick={() => navigate("/resume-history")}
            className="bg-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-200"
          >
            View Uploaded Resumes
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
