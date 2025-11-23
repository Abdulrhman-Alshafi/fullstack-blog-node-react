import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Comment from "./Comment";
import { createComment, deleteComment, getComments } from "../api/api";

export default function CommentList({ blogId, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  // Yup Schema
  const schema = yup.object({
    content: yup
      .string()
      .trim()
      .required("Comment cannot be empty")
      .min(2, "Comment must be at least 2 characters"),
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { content: "" },
  });

  // Fetch Comments
  useEffect(() => {
    const fetchAllComments = async () => {
      setFetching(true);
      try {
        const data = await getComments(blogId);
        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchAllComments();
  }, [blogId]);

  // Submit Comment
  const onSubmit = async ({ content }) => {
    setLoading(true);
    try {
      const newComment = await createComment(blogId, { content });
      setComments((prev) => [newComment, ...prev]);

      reset();
    } catch (err) {
      alert(err.message || "Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  // Delete Comment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    try {
      await deleteComment(blogId, id);
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete comment");
    }
  };

  return (
    <div className="mt-12 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      {userInfo ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-10">
          <div className="flex items-start space-x-4">
            {/* Avatar */}
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              {userInfo.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <textarea
                {...register("content")}
                placeholder="Write your comment..."
                rows="4"
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                  errors.content
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
              />

              {/* Validation Error */}
              {errors.content && (
                <p className="text-red-600 mt-1 text-sm">
                  {errors.content.message}
                </p>
              )}

              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
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

      {/* Comment List */}
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
              key={comment._id}
              comment={comment}
              userInfo={userInfo}
              handleDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
