const Comment = ({ comment, handleDelete, userInfo }) => {
  return (
    <div
      key={comment._id}
      className="flex space-x-4 border-b border-gray-200 pb-6 last:border-0"
    >
      <div className="w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
        {comment.author?.name?.charAt(0).toUpperCase() || "?"}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-800">
              {comment.author?.name || "Anonymous"}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
          {userInfo?._id === comment.author?._id && (
            <button
              onClick={() => handleDelete(comment._id)}
              className="text-red-500 text-sm hover:underline"
            >
              Delete
            </button>
          )}
        </div>
        <p className="mt-2 text-gray-700 leading-relaxed">{comment.content}</p>
      </div>
    </div>
  );
};
export default Comment;
