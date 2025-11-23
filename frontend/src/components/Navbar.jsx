// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Safely parse user from localStorage
  let user = null;
  try {
    const stored = localStorage.getItem("userInfo");
    if (stored) user = JSON.parse(stored);
  } catch (err) {
    console.error("Failed to parse userInfo");
  }

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    navigate("/login");
    setMobileOpen(false);
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight hover:text-indigo-200 transition"
          >
            MyBlog
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="hover:text-indigo-200 transition font-medium"
            >
              Home
            </Link>

            {user ? (
              <>
                {/* Regular User Links */}
                <Link
                  to="/dashboard"
                  className="hover:text-indigo-200 transition font-medium"
                >
                  Dashboard
                </Link>

                {/* Admin Panel - Only for Admins */}
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition shadow-md"
                  >
                    Admin Panel
                  </Link>
                )}

                {/* User Greeting */}
                <span className="text-indigo-100">Hello, {user.name}</span>

                {/* Logout Button */}
                <button
                  onClick={logoutHandler}
                  className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-medium transition shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-indigo-200 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md hover:bg-indigo-700 transition"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <MobileMenu
          user={user}
          close={() => setMobileOpen(false)}
          logout={logoutHandler}
        />
      )}
    </nav>
  );
}
