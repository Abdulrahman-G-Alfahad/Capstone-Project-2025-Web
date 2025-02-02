"use client";

import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import SignupPage from "@/components/SignupPage";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <div>
      {currentPage === "login" && (
        <LoginPage switchPage={() => setCurrentPage("signup")} />
      )}
      {currentPage === "signup" && (
        <SignupPage switchPage={() => setCurrentPage("dashboard")} />
      )}
      {currentPage === "dashboard" && <Dashboard />}
    </div>
  );
}
