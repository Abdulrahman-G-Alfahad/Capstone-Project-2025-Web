"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Example signup logic (replace this with your actual logic)
    const success = true; // Assume signup is always successful
    setLoading(false);

    if (success) {
      router.push("/dashboard"); // Navigate to dashboard after successful signup
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1F1D35]">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="mb-4 text-2xl font-semibold text-center">LOGO</h1>
        <h2 className="text-lg font-medium text-center text-gray-600">
          Welcome, sign up here
        </h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-[#FF3A79] rounded-lg hover:bg-[#FF3366] focus:outline-none focus:ring focus:ring-pink-300"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a
            onClick={() => router.push("/login")}
            className="text-blue-500 hover:underline focus:outline-none cursor-pointer"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
