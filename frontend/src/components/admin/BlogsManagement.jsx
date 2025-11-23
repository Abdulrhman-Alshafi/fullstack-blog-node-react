import { useState, useEffect } from "react";
import { getBlogs, deleteBlog } from "../../api/api";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import ErrorUI from "../ErrorUI"; // adjust path if needed

export default function BlogsManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog permanently?")) return;
    try {
      await deleteBlog(id);
      alert("Blog deleted");
      load();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  if (loading) return <Loading />;

  if (error) return <ErrorUI error={error} onRetry={load} />;

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">All Blogs</h1>

      <div className="space-y-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{blog.title}</h3>
              <p className="text-gray-600">
                by {blog.author?.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to={`/blog/${blog._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                View
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
