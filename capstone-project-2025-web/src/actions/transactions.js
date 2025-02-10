"use server";

import { baseUrl, getHeaders } from "./config";

export async function getTransactions(businessId) {
  try {
    const response = await fetch(`${baseUrl}/profile/${businessId}/transactions`, {
      method: "GET",
      headers: await getHeaders({ auth: true }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();
    return Array.isArray(data) ? data : []; 
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}
