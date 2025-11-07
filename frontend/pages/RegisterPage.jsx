import { useState } from "react";
import axiosInstance from "../lib/axios";
import { useAuth } from "../context/context";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setAuthUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/users/register", {
        username,
        email,
        password,
      });
      setAuthUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 bg-surface rounded-lg w-full h-full md:max-w-md md:h-auto p-8 max-sm:p-4">
      <h2 className="text-xl font-semibold">Create your account</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center space-y-5 "
      >
        <div className="flex flex-col w-full">
          <label className="input-label">Username</label>
          <input
            type="text"
            value={username}
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="input-label">Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="input-label">Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>

        <button type="submit" className="btn w-full mt-4">
          {isLoading ? "Please wait..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-textMuted">
        Don't have an account?{" "}
        <a href="/login" className="text-primary hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default RegisterPage;
