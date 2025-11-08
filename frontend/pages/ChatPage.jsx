import { useEffect } from "react";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import socket from "../lib/socket";
import { useState } from "react";

const ChatPage = ({ logout }) => {
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    socket.on("userConnected", (data) => {
      setTotalUsers(data.onlineUsers);
    });

    socket.on("userDisconnected", (data) => {
      setTotalUsers(data.onlineUsers);
    });

    return () => {
      socket.off("userConnected");
      socket.off("userDisconnected");
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-full md:max-w-3xl md:h-[600px] bg-gray-800 border border-gray-700 rounded-lg relative">
      {/* Header with title and logout */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Online users: {totalUsers}</h2>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-700">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatPage;
