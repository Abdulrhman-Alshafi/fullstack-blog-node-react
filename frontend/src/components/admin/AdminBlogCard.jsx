import React from "react";

const AdminBlogCard = ({ blog, handleDelete }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center">
      <div>
        <h3 className="text-2xl font-bold text-gray-800">{blog.title}</h3>
        <p className="text-gray-600">by {blog.author?.name || "Unknown"}</p>
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
  );
};

export default AdminBlogCard;
