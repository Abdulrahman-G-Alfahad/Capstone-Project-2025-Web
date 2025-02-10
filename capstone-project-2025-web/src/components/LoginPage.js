"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../actions/auth";

export default function LoginPage({ switchPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const success = await login({ username, password });
    setLoading(false);

    if (success) {
      switchPage("dashboard");
    } else {
      setErrorMessage("Invalid login credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#151d30]">
      <div className="w-full max-w-sm p-6 bg-[#1b233a] rounded-2xl shadow-lg">
        <h1 className="mb-4 text-2xl font-semibold text-center">LOGO</h1>
        <h2 className="text-lg font-medium text-center text-gray-600">
          Welcome Back, Please login
        </h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg text-black"
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-[#a68bff] rounded-lg hover:bg-[#5d22b8]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => switchPage("signup")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
