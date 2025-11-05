import express from "express";
import {
  deleteUser,
  getUsers,
  login,
  logout,
  register,
  updateUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/all-users", authenticate, getUsers);
router.put("/update-profile", authenticate, updateUser);
router.delete("/delete-account", authenticate, deleteUser);

export default router;
