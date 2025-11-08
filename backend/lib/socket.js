import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middlewares/socket.middleware.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const onlineUsers = new Map(); // key: socket.id, value: username

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.user.username);
  onlineUsers.set(socket.id, socket.user.username);

  io.emit("userConnected", {
    username: socket.user.username,
    onlineUsers: onlineUsers.size,
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.user.username);
    onlineUsers.delete(socket.id);
    io.emit("userDisconnected", {
      username: socket.user.username,
      onlineUsers: onlineUsers.size,
    });
  });
});

export { app, server, io };
