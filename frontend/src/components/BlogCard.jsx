import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          <Link
            to={`/blog/${blog._id}`}
            className="text-indigo-600 hover:underline"
          >
            {blog.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.content.replace(/<[^>]*>/g, "").slice(0, 150)}...
        </p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>By {blog.author?.name || "Unknown"}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
