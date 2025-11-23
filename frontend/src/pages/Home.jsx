import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Loading from "../components/Loading";
import { getBlogs } from "../api/api";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getBlogs();
      setBlogs(res);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setError("Failed to load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Loading UI
  if (loading) {
    return <Loading />;
  }

  // Error UI
  if (error) {
    return <ErrorUI error={error} onRetry={fetchData} />;
  }

  // Main content UI
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
