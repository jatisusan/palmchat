import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../lib/apiError.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      ?.split("=")[1];

    if (!token)
      throw new ApiError(401, "Socket Unauthorized - No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      throw new ApiError(401, "Socket Unauthorized - Invalid token");

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) throw new ApiError(401, "Socket Unauthorized - User not found");

    socket.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
