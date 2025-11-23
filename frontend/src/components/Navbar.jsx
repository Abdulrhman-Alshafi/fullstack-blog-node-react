import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const navigate = useNavigate();
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("userInfo"));
  } catch {
    user = null;
  }

  const [open, setOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          MyBlog
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
        >
          {!open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:underline">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <span>Hello, {user.name}</span>
              <button
                onClick={logoutHandler}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {open && (
        <MobileMenu
          user={user}
          close={() => setOpen(false)}
          logout={logoutHandler}
        />
      )}
    </nav>
  );
}
