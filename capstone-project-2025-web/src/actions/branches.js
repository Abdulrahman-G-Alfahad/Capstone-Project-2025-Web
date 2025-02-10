"use server";

import { baseUrl, getHeaders } from "./config";

export async function getBusinessBranches(businessId) {
  console.log(businessId);
  try {
    const response = await fetch(
      `${baseUrl}/business/profile/${businessId}/associates`,
      {
        method: "GET",
        headers: await getHeaders({ auth: true }),
      }
    );

    const res = await response.json()

    console.log(res.associateList);

    if (!response.ok) {
      throw new Error(`Failed to fetch branches: ${response.statusText}`);
    }

    return res;
  } catch (error) {
    console.error("Error fetching business branches:", error);
    return { message: "Error fetching branches", associateList: [] };
  }
}
