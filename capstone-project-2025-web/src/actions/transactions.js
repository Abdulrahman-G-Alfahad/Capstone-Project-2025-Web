"use server";

import { baseUrl, getHeaders } from "./config";
import { getUser } from "./token";

export async function getTransactions(businessId) {
  console.log("Fetching transactions for business ID:", businessId);
  try {
    const response = await fetch(
      `${baseUrl}/transactions/business/${businessId}`,
      {
        method: "GET",
        headers: await getHeaders({ auth: true }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();
    // console.log(data.transactions);
    return {
      transactions: Array.isArray(data.transactions) ? data.transactions : [],
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { transactions: [] };
  }
}

export async function getUserLocal() {
  const user = await getUser();
  return user;
}
