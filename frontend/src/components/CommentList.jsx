import { useState, useEffect } from "react";
import apiFetch from "../api";
import Comment from "./Comment";

export default function CommentList({ blogId, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      setFetching(true);
      try {
        const data = await apiFetch(`/blogs/${blogId}/comments`);
        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchComments();
  }, [blogId]);

  //ading comment
  const submitComment = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const data = await apiFetch(`/blogs/${blogId}/comments`, {
        method: "POST",
        body: JSON.stringify({ content }),
      });
      setComments([data, ...comments]);
      setContent("");
    } catch (err) {
      alert(err.message || "Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  // Delete comment function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    try {
      await apiFetch(`/blogs/${blogId}/comments/${id}`, { method: "DELETE" });
      setComments(comments.filter((comment) => comment._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete comment");
    }
  };

  return (
    <div className="mt-12 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        Comments ({comments.length})
      </h3>

      {userInfo ? (
        <form onSubmit={submitComment} className="mb-10">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              {userInfo.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your comment..."
                rows="4"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                required
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={loading || !content.trim()}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <p className="text-gray-600 mb-8 italic">
          Please log in to leave a comment.
        </p>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {fetching ? (
          <p className="text-gray-500 text-center py-8">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No comments yet. Be the first!
          </p>
        ) : (
          comments.map((comment) => (
            <Comment
              handleDelete={handleDelete}
              comment={comment}
              key={comment._id}
              userInfo={userInfo}
            />
          ))
        )}
      </div>
    </div>
  );
}
