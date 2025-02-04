"use server";

import { baseUrl, getHeaders } from "./config";

export async function getTransactions() {
  try {
    const response = await fetch(`${baseUrl}/business/profile/5/transactions`, {
      method: "GET", 
      headers: await getHeaders({ auth: true }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();
    return Array.isArray(data) ? data : []; //returns an array
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return []; 
  }
}
