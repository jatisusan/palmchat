import { Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import axiosInstance from "../lib/axios";
import { useAuth } from "../context/context";

const App = () => {
  const { authUser, setAuthUser } = useAuth();

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
              <LoginPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !authUser ? (
              <RegisterPage />
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
