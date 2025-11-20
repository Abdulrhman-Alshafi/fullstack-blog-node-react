import { useState, useEffect } from "react";
import BlogForm from "../components/BlogForm";
import apiFetch from "../api";

export default function Dashboard() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Function to fetch blogs
  const fetchMyBlogs = async () => {
    try {
      const res = await apiFetch("/blogs/myblogs");
      setMyBlogs(Array.isArray(res) ? res : res.blogs || []);
    } catch (err) {
      console.error("Failed to load blogs:", err);
    }
  };

  // Load blogs on component mount
  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await apiFetch(`/blogs/${id}`, { method: "DELETE" });
      fetchMyBlogs();
    } catch (err) {
      alert("Failed to delete blog");
      console.error(err);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setEditingBlog(null);
    setShowForm(false);
    fetchMyBlogs();
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingBlog(null); // reset editing
        }}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg mb-6 hover:bg-indigo-700"
      >
        {showForm ? "Cancel" : "Write New Blog"}
      </button>

      {showForm && (
        <BlogForm blog={editingBlog} onSuccess={handleFormSuccess} />
      )}

      <h2 className="text-2xl font-bold mt-12 mb-6">My Blogs</h2>
      <div className="grid gap-6">
        {myBlogs.length > 0 ? (
          myBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-6 rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div>
                <h3 className="text-xl font-bold">{blog.title}</h3>
                <p className="text-gray-600">
                  Published: {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-500">
                  Category: {blog.category?.name || "Uncategorized"}
                </p>
              </div>

              <div className="mt-4 sm:mt-0 space-x-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You have no blogs yet.</p>
        )}
      </div>
    </div>
  );
}
