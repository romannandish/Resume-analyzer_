import React, { useState, useEffect } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BackgroundWrapper from "../components/BackgroundWrapper"; // ✅ import the wrapper

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", formData);
      alert("Registration successful! You can now login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <BackgroundWrapper>
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6 border border-white/20"
        aria-label="Register Form"
      >
        <h2 className="text-3xl font-bold text-center text-white">Create Account</h2>

        <div className="space-y-1">
          <label htmlFor="username" className="block text-sm font-medium text-gray-200">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-2 bg-black/20 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 bg-black/20 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-200">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            className="w-full px-4 py-2 bg-black/20 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:shadow-[0_0_10px_#8b5cf6] transition-all duration-300"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-300">
          Already have an account?{" "}
          <span
            className="text-indigo-400 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </BackgroundWrapper>
  );
}

export default Register;
