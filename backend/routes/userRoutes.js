import express from "express";
import { protect, admin } from "../middleware/auth.js";
import {
  getUsers,
  deleteUser,
  toggleAdmin,
} from "../controllers/userController.js";

const router = express.Router();

router.use(protect, admin);

//get all users
router.get("/", getUsers);

//delete user by id
router.delete("/:id", deleteUser);
//toggle admin roll by id
router.patch("/:id/toggle-admin", toggleAdmin);

export default router;
