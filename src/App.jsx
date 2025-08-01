import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FileUpload from "./pages/FileUpload";
import ResumeHistoryPage from "./pages/ResumeHistoryPage";

function App() {
  const { isLoggedIn, loading } = useAuth();

  // Show loading screen while checking token
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-blue-600">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <Routes>
        {/* Auth Pages */}
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/file-upload"
          element={isLoggedIn ? <FileUpload /> : <Navigate to="/login" />}
        />
        <Route
          path="/resume-history"
          element={isLoggedIn ? <ResumeHistoryPage /> : <Navigate to="/login" />}
        />

        {/* Root & Fallback Routes */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
