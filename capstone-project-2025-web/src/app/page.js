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
        <LoginPage switchPage={(page) => setCurrentPage(page)} />
      )}
      {currentPage === "signup" && (
        <SignupPage switchPage={(page) => setCurrentPage(page)} />
      )}
      {currentPage === "dashboard" && (
        <Dashboard switchPage={(page) => setCurrentPage(page)} />
      )}
    </div>
  );
}
