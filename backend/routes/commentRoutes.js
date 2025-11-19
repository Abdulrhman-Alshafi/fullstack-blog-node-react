import express from "express";
import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/commentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true }); // mergeParams allows access to parent route params (e.g., blogId)

// Get all comments for a blog
router.get("/", getComments);

// Create a new comment
router.post("/", protect, createComment);

// Delete a comment by ID
router.delete("/:id", protect, deleteComment);

export default router;
