import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  getMyBlogs,
  updateBlog,
} from "../controllers/blogController";
import { protect } from "../middleware/auth";

const router = express.Router();

// get all blogs
router.get("/", getBlogs);

// create a new blog (protected)
router.post("/", protect, createBlog);

// Get blogs of the logged-in user
router.get("/myblogs", protect, getMyBlogs);

//get a single blog by id
router.get("/:id", getBlogById);

// Update a blog by ID
router.put("/:id", protect, updateBlog);

// delte a blog by ID
router.delete("/:id", protect, deleteBlog);

export default router;
