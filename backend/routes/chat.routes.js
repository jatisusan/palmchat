import express from "express";
import {
  getChatCount,
  getMessages,
  sendMessage,
} from "../controllers/chat.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, getMessages);

router.post("/send", authenticate, sendMessage);

router.get("/count", authenticate, getChatCount);

export default router;
