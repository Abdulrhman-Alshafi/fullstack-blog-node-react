const MyBlogCard = ({ blog, handleEdit, handleDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center">
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
  );
};

export default MyBlogCard;
