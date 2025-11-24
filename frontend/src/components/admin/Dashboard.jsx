import { useState, useEffect } from "react";
import { getBlogs, getCategories, getTags } from "../../api/api";
import Loading from "../Loading";
import ErrorUI from "../ErrorUI";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalCategories: 0,
    totalTags: 0,
    loading: true,
    error: null,
  });
  const navigate = useNavigate();
  const fetchStats = async () => {
    setStats((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const [blogsRes, categoriesRes, tagsRes] = await Promise.all([
        getBlogs(),
        getCategories(),
        getTags(),
      ]);

      setStats({
        totalBlogs: Array.isArray(blogsRes) ? blogsRes.length : 0,
        totalCategories: Array.isArray(categoriesRes)
          ? categoriesRes.length
          : 0,
        totalTags: Array.isArray(tagsRes) ? tagsRes.length : 0,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
      setStats((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load dashboard stats. Please try again.",
      }));
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (stats.loading) {
    return <Loading />;
  }

  if (stats.error) {
    return <ErrorUI error={stats.error} onRetry={fetchStats} />;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-5xl font-bold">{stats.totalBlogs}</div>
          <p className="text-blue-100 text-lg mt-2">Total Blogs</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-5xl font-bold">{stats.totalCategories}</div>
          <p className="text-green-100 text-lg mt-2">Categories</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-5xl font-bold">{stats.totalTags}</div>
          <p className="text-purple-100 text-lg mt-2">Tags</p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          Welcome back, Admin!
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          You're all set! Use the sidebar to manage blogs, categories, tags, and
          users. Your blog platform is running smoothly.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          className="bg-indigo-600 text-white p-6 rounded-xl shadow-lg hover:bg-indigo-700 transition font-semibold text-lg"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Create New Blog
        </button>
        <button
          className="bg-emerald-600 text-white p-6 rounded-xl shadow-lg hover:bg-emerald-700 transition font-semibold text-lg"
          onClick={() => {
            navigate("/admin/categories");
          }}
        >
          Add Category
        </button>
        <button
          className="bg-violet-600 text-white p-6 rounded-xl shadow-lg hover:bg-violet-700 transition font-semibold text-lg"
          onClick={() => {
            navigate("/admin/tags");
          }}
        >
          Add Tag
        </button>
        <button
          className="bg-amber-600 text-white p-6 rounded-xl shadow-lg hover:bg-amber-700 transition font-semibold text-lg"
          onClick={() => {
            navigate("/admin/users");
          }}
        >
          View All Users
        </button>
      </div>
    </div>
  );
}
