import { useState, useEffect } from "react";
import BlogForm from "../components/BlogForm";
import Loading from "../components/Loading";
import MyBlogCard from "../components/MyBlogCard";
import ErrorUI from "../components/ErrorUI";
import { deleteBlog, getMyBlogs } from "../api/api";

export default function Dashboard() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getMyBlogs();
      setMyBlogs(Array.isArray(res) ? res : res.blogs || []);
    } catch (err) {
      console.error("Failed to load blogs:", err);
      setError("Failed to load your blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load blogs on component mount
  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
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

  // Loading UI
  if (loading) {
    return <Loading />;
  }

  // Error UI
  if (error) {
    return <ErrorUI error={error} onRetry={fetchMyBlogs} />;
  }

  // Main UI
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
            <MyBlogCard
              key={blog._id}
              blog={blog}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-500">You have no blogs yet.</p>
        )}
      </div>
    </div>
  );
}
