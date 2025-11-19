import express from "express";
import { getTags, createTag } from "../controllers/tagController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

//get tags
router.get("/", getTags);

//create tag
router.post("/", protect, createTag);

export default router;
