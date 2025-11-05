import ApiError from "../lib/apiError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) throw new ApiError(401, "Unauthorized - No token provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await User.findById(decoded.userId).select(
      "-password"
    );
    req.user = loggedInUser;
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized - Invalid token");
  }
};
