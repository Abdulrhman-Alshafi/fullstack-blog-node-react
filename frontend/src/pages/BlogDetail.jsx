import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CommentList from "../components/CommentList";
import Loading from "../components/Loading";
import { getBlogById, getComments } from "../api/api";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlogAndComments = async () => {
      try {
        const blogRes = await getBlogById(id);
        const commentsRes = await getComments(id);
        setBlog(blogRes);
        setComments(commentsRes);
      } catch (err) {
        console.error("Failed to fetch blog or comments:", err);
      }
    };

    fetchBlogAndComments();
  }, [id]);

  if (!blog) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-10">
      <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-96 object-cover"
          />
        )}
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="text-gray-600 mb-6">
            By <strong>{blog.author.name}</strong> |{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>

      <CommentList
        blogId={id}
        comments={comments}
        onCommentAdded={(newComment) => setComments([newComment, ...comments])}
      />
    </div>
  );
}
