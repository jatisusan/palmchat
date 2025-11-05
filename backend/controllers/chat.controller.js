import ApiError from "../lib/apiError.js";
import Chat from "../models/chat.model.js";

export const sendMessage = async (req, res, next) => {
  const { message } = req.body;

  try {
    const newMessage = await Chat.create({ sender: req.user._id, message });
    if (!newMessage) throw new ApiError(500, "Failed to send message.");
    res.status(201).json({ message: "Message sent successfully." });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Chat.find({})
      .populate("sender", "username")
      .sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const getChatCount = async (req, res, next) => {
  try {
    const chatCount = await Chat.countDocuments();
    res.status(200).json({ chatCount });
  } catch (error) {
    next(error);
  }
};
