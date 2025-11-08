import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
