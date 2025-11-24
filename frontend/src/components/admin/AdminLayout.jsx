import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const menu = [
  { path: "/admin", label: "Dashboard" },
  { path: "/admin/blogs", label: "All Blogs" },
  { path: "/admin/categories", label: "Categories" },
  { path: "/admin/tags", label: "Tags" },
  { path: "/admin/users", label: "Users" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={` fixed z-30 inset-y-0 left-0 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0 mt-14" : "-translate-x-full"
        }`}
      >
        <div className="p-6 text-2xl font-bold border-b border-gray-800 flex justify-between items-center">
          Admin Panel
          <button
            className="lg:hidden text-gray-400"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white shadow-lg"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-800">
          <p className="text-sm text-gray-400 mb-3">
            Logged in as{" "}
            <strong className="text-white">{userInfo.name || "Admin"}</strong>
          </p>
          <button
            onClick={logout}
            className="text-red-400 hover:text-red-300 font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:pl-24">
        <header className="p-4 bg-gray-100 border-b border-gray-200 flex items-center justify-between lg:hidden">
          <button
            className="text-gray-700 text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <span className="font-bold text-lg">Admin Panel</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
