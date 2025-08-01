import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const navLinkClasses =
    "hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded transition-colors duration-300";

  const navLinks = isLoggedIn ? (
    <>
      <Link
        to="/dashboard"
        className={navLinkClasses}
        onClick={() => setMobileMenuOpen(false)}
      >
        Dashboard
      </Link>
      <button
        onClick={handleLogout}
        className={`${navLinkClasses} text-red-400 hover:text-red-500 focus:ring-red-400`}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        to="/login"
        className={navLinkClasses}
        onClick={() => setMobileMenuOpen(false)}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={navLinkClasses}
        onClick={() => setMobileMenuOpen(false)}
      >
        Register
      </Link>
    </>
  );

  return (
    <nav
      className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white shadow-md sticky top-0 z-50"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight hover:text-cyan-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
        >
          Resume Analyzer
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-lg font-semibold">
          {navLinks}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            className="focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded transition-transform duration-200 hover:scale-110"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden bg-[#302b63]/90 backdrop-blur-md px-6 pt-4 pb-6 space-y-4 text-lg font-semibold rounded-b-xl shadow-inner transition-all duration-300"
          role="menu"
          aria-label="Mobile navigation menu"
        >
          {React.Children.map(navLinks, (child) =>
            React.cloneElement(child, {
              className: `${child.props.className} block w-full text-left`,
              onClick: () => setMobileMenuOpen(false),
              role: "menuitem",
              tabIndex: 0,
            })
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
