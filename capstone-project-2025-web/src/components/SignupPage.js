"use client";

import { useState } from "react";
import { signup } from "../actions/auth"; 

export default function SignUp({ switchPage }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username,
      name,
      email,
      password,
      address,
      businessId,
      bankAccount,
    };

    const success = await signup(userData);
    setLoading(false);

    if (success) {
      switchPage("dashboard"); // redirect to dashboard after signup
    } else {
      alert("Signup failed. Please try again.");
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
          {/* Form Fields */}
          <div>
            <label className="block text-sm font-medium text-black">
              username
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
            <label className="block text-sm font-medium text-black">name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
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

          <div>
            <label className="block text-sm font-medium text-black">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Business ID
            </label>
            <input
              type="text"
              value={businessId}
              onChange={(e) => setBusinessId(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Bank Account Number
            </label>
            <input
              type="text"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg text-black"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-[#FF3A79] rounded-lg hover:bg-[#FF3366]"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => switchPage("login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
