import express from "express";
import { getTags, createTag, deleteTag } from "../controllers/tagController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

//get tags
router.get("/", getTags);

//create tag
router.post("/", protect, createTag);

//delete tag
router.delete("/:id", protect, deleteTag);
export default router;
