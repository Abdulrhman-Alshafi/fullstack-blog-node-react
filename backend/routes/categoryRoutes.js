import express from "express";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// gets categories
router.get("/", getCategories);

//create category
router.post("/", protect, createCategory);

//delete
router.delete("/:id", protect, deleteCategory);

export default router;
