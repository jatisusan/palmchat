import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import { useAuth } from "../context/context";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const { authUser } = useAuth();
  console.log(messages)

  useEffect(() => {
    axiosInstance
      .get("/chats")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-3">
      {messages.map((msg) => {
        const isSent = msg.sender._id === authUser.id;
        return (
          <div
            key={msg._id}
            className={`flex flex-col ${isSent ? "items-end" : "items-start"}`}
          >
            <div className="text-xs text-gray-400 mb-1">
              {msg.sender.username}
            </div>
            <div
              className={`chat-bubble ${
                isSent ? "chat-bubble-sent" : "chat-bubble-received"
              }`}
            >
              {msg.message}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
