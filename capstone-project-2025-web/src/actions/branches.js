"use server";

import { baseUrl, getHeaders } from "./config";

export async function getBusinessBranches(businessId) {
  try {
    const response = await fetch(
      `${baseUrl}/profile/${businessId}/associates`,
      {
        method: "GET",
        headers: await getHeaders({ auth: true }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch branches: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching business branches:", error);
    return { message: "Error fetching branches", branchList: [] };
  }
}
