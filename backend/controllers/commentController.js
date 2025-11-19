import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";

//get comments function
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    return res.json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//create comment function
const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const comment = await Comment.create({
      content,
      author: req.user._id,
      blog: req.params.blogId,
    });

    const populated = await Comment.findById(comment._id).populate(
      "author",
      "name"
    );

    return res.status(201).json(populated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//delete comment function
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    return res.json({ message: "Comment removed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { getComments, createComment, deleteComment };
