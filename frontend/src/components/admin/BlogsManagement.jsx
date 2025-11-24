import { useState, useEffect } from "react";
import { getBlogs, deleteBlog } from "../../api/api";
import Loading from "../Loading";
import ErrorUI from "../ErrorUI";
import AdminBlogCard from "./AdminBlogCard";

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
      load();
    } catch (err) {
      alert("Failed to delete", err);
    }
  };

  if (loading) return <Loading />;

  if (error) return <ErrorUI error={error} onRetry={load} />;

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">All Blogs</h1>

      <div className="space-y-6">
        {blogs.map((blog) => (
          <AdminBlogCard
            blog={blog}
            handleDelete={handleDelete}
            key={blog._id}
          />
        ))}
      </div>
    </div>
  );
}
