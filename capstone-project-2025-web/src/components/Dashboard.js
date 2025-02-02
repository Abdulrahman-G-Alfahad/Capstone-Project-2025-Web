"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const transactions = [
  {
    name: "Ahmed Abdullah",
    location: "Sabah Al-Salem",
    amount: "15KD",
    status: "Success",
    avatar: "👨🏻",
  },
  {
    name: "Abdullah Mohammmmed",
    location: "Kaifan",
    amount: "10KD",
    status: "Failed",
    avatar: "👴",
  },
  {
    name: "Noura Mohammed",
    location: "Ardiya",
    amount: "15KD",
    status: "Success",
    avatar: "👩🏻",
  },
  {
    name: "Fatma Abdullah",
    location: "Hawally",
    amount: "30KD",
    status: "Success",
    avatar: "👩🏼",
  },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">
            Recent Transactions
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search transactions"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 pl-10 rounded-md w-60 text-sm"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg overflow-hidden">
          {filteredTransactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border-b last:border-none bg-white hover:bg-gray-100 transition"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{transaction.avatar}</span>
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {transaction.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-black">
                  {transaction.amount}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    transaction.status === "Success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
