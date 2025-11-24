import express from "express";
import { protect, admin } from "../middleware/auth.js";
import {
  getUsers,
  deleteUser,
  toggleAdmin,
} from "../controllers/userController.js";

const router = express.Router();

router.use(protect, admin);

router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.patch("/:id/toggle-admin", toggleAdmin);

export default router;
