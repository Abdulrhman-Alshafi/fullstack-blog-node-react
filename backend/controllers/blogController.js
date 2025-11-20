import Blog from "../models/Blog.js";

//get all blogs function
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .populate("author", "name")
      .populate("category", "name slug")
      .populate("tags", "name slug")
      .sort({ createdAt: -1 });
    return res.json(blogs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//get blog by id function
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name")
      .populate("category", "name")
      .populate("tags", "name");

    if (blog && blog.published) {
      return res.json(blog);
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//create Blog function
const createBlog = async (req, res) => {
  try {
    const { title, content, category, tags, image } = req.body;

    const blog = await Blog.create({
      title,
      content,
      author: req.user._id,
      category,
      tags,
      image,
    });

    const createdBlog = await Blog.findById(blog._id)
      .populate("author", "name")
      .populate("category")
      .populate("tags");

    return res.status(201).json(createdBlog);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//update blog function
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("author", "name")
      .populate("category")
      .populate("tags");
    return res.json(updatedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//delete blog function
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await blog.deleteOne();
    return res.json({ message: "Blog removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//get my bolgs function
const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .populate("category")
      .populate("tags");
    return res.json({ blogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs,
};
