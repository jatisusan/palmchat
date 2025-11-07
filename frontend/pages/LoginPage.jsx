import { useState } from "react";
import axiosInstance from "../lib/axios";
import { useAuth } from "../context/context";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setAuthUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      setAuthUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      console.error("Login failed:", error?.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 bg-surface rounded-lg w-full h-full md:max-w-md md:h-auto p-8 max-sm:p-4">
      <h2 className="text-xl font-semibold">Log in to your account</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center space-y-5 "
      >
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

        <button type="submit" className="btn w-full mt-4" disabled={isLoading}>
          {isLoading ? "Please wait..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-textMuted">
        Don't have an account?{" "}
        <a href="/register" className="text-primary hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
