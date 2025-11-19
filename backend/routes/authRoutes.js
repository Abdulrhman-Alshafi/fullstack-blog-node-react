import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

//register
router.post("/register", registerUser);
//login
router.post("/login", loginUser);
//protect
router.get("/profile", protect, getUserProfile);

export default router;
