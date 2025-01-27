"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";

export default function LoginPage() {
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
      router.push("/dashboard"); // Adjust this as needed
    } else {
      setErrorMessage("Invalid login credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a202c]">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="mb-4 text-2xl font-semibold text-center">LOGO</h1>
        <h2 className="text-lg font-medium text-center text-gray-600">
          Welcome Back, Please login
        </h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-blue-500 hover:underline focus:outline-none"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
