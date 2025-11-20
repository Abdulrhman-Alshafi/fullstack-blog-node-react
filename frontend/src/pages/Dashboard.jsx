import { useState, useEffect } from "react";
import BlogForm from "../components/BlogForm";
import apiFetch from "../api";

export default function Dashboard() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Function to fetch blogs
  const fetchMyBlogs = async () => {
    try {
      const res = await apiFetch("/blogs/myblogs");
      // Ensure res is always an array
      setMyBlogs(Array.isArray(res) ? res : res.blogs || []);
    } catch (err) {
      console.error("Failed to load blogs:", err);
    }
  };

  // Load blogs on component mount
  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg mb-6 hover:bg-indigo-700"
      >
        {showForm ? "Cancel" : "Write New Blog"}
      </button>

      {showForm && <BlogForm onSuccess={fetchMyBlogs} />}

      <h2 className="text-2xl font-bold mt-12 mb-6">My Blogs</h2>
      <div className="grid gap-6">
        {myBlogs.length > 0 ? (
          myBlogs.map((blog) => (
            <div key={blog._id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p className="text-gray-600">
                Published: {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You have no blogs yet.</p>
        )}
      </div>
    </div>
  );
}
