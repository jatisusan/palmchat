import { Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";

const App = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setAuthUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = async () => {
    await axiosInstance.post("/users/logout");
    localStorage.removeItem("user");
    setAuthUser(null);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background text-white">
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <ChatPage logout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !authUser ? (
              <LoginPage setAuthUser={setAuthUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !authUser ? (
              <RegisterPage setAuthUser={setAuthUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
