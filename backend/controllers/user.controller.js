import bcrypt from "bcryptjs";

import ApiError from "../lib/apiError.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(400, "Email already in use");

    const newUser = await User.create({ username, email, password });
    generateToken(newUser._id, res);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        id: newUser._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(400, "Invalid credentials");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ApiError(400, "Invalid credentials");

    generateToken(user._id, res);
    res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logout successful" });
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new ApiError(404, "User not found");

    if (email) {
      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists._id.toString() !== user._id.toString()) {
        throw new ApiError(400, "Email already in use");
      }
    }

    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }
    await user.save();
    res.status(200).json({
      message: "User updated successfully",
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) throw new ApiError(404, "User not found");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
