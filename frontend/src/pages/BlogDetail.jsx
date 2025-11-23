import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CommentList from "../components/CommentList";
import Loading from "../components/Loading";
import { getBlogById, getComments } from "../api/api";
import BlogDetailCard from "../components/BlogDetailCard";

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
      <BlogDetailCard blog={blog} />

      <CommentList
        blogId={id}
        comments={comments}
        onCommentAdded={(newComment) => setComments([newComment, ...comments])}
      />
    </div>
  );
}
