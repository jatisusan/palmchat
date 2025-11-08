import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import { useAuth } from "../context/context";
import socket from "../lib/socket";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    // Fetch initial messages
    axiosInstance
      .get("/chats")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));

    // Listen for new messages from socket
    socket.on("newMessage", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    socket.on("userConnected", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          _id: `join-${Date.now()}`,
          system: true,
          text: `${data.username} joined the chat.`,
        },
      ]);
    });

    socket.on("userDisconnected", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          _id: `leave-${Date.now()}`,
          system: true,
          text: `${data.username} left the chat.`,
        },
      ]);
    });

    return () => {
      socket.off("newMessage");
      socket.off("userConnected");
      socket.off("userDisconnected");
    };
  }, []);

  return (
    <div className="space-y-3">
      {messages.map((msg) => {
        if (msg.system) {
          return (
            <div
              key={msg._id}
              className="flex justify-center text-gray-400 text-sm italic"
            >
              {msg.text}
            </div>
          );
        }
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
