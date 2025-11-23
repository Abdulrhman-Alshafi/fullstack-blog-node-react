import { Link } from "react-router-dom";

export default function MobileMenu({ user, close, logout }) {
  return (
    <div className="md:hidden mt-3 bg-indigo-700 p-4 rounded-lg space-y-3 container mx-auto">
      <Link to="/" onClick={close} className="block">
        Home
      </Link>

      {user ? (
        <>
          <Link to="/dashboard" onClick={close} className="block">
            Dashboard
          </Link>

          <div>Hello, {user.name}</div>

          <button
            onClick={() => {
              logout();
              close();
            }}
            className="w-full text-left bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" onClick={close} className="block">
            Login
          </Link>
          <Link to="/register" onClick={close} className="block">
            Register
          </Link>
        </>
      )}
    </div>
  );
}
