import { useState } from "react";
import axiosInstance from "../lib/axios";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      await axiosInstance.post("/chats/send", { message });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input"
      />
      <button onClick={handleSend} className="btn">
        Send
      </button>
    </div>
  );
};

export default MessageInput;
