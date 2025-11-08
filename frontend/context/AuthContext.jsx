import { useState, useEffect } from "react";
import { AuthContext } from "./context";
import { connectSocket, disconnectSocket } from "../lib/socket";

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    if (authUser) connectSocket();
    else disconnectSocket();
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
