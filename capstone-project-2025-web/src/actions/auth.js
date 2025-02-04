"use server";

import { redirect } from "next/navigation";
import { baseUrl, getHeaders } from "./config";
import { deleteToken, setToken } from "./token";

/**
 * Login Function
 * @param {Object} data - The login data (email and password).
 */
export async function login(data) {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: await getHeaders({ auth: false }),
      body: JSON.stringify(data),
    });

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");

    if (!response.ok || !isJson) {
      throw new Error("Invalid or empty response from server.");
    }

    const { token } = await response.json();
    await setToken(token); // Save token in local storage or cookies
    return true; // Login successful
  } catch (error) {
    console.error("Login Error:", error.message);
    return false;
  }
}

/**
 * Signup Function
 * @param {Object} data - The signup data (full name, email, password, etc.).
 */
export async function signup(data) {
  console.log(data)
  try {
    const response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");

    if (!response.ok) {
      const errorData = isJson ? await response.json() : {};
      throw new Error(errorData.message || "Signup failed.");
    }

    if (!isJson) {
      throw new Error("Server returned an empty response.");
    }

    const { token } = await response.json();
    await setToken(token); // Save token
    return true;
  } catch (error) {
    console.error("Signup Error:", error.message);
    return false;
  }
}

/**
 * Logout Function
 */
export async function logout() {
  try {
    await deleteToken(); // Clear token from storage
    redirect("/"); // Redirect to the home page
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
}
