import express from "express";
import "dotenv/config";

import { connectDB } from "./lib/db.js";

import userRouter from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
