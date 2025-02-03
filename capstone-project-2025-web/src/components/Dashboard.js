"use client";

import { useState } from "react";
import { Search, Grid, User, Wifi, Settings, LogOut } from "lucide-react";

const transactions = [
  {
    name: "Ahmed Abdullah",
    location: "Kaifan",
    amount: "15KD",
    status: "Success",
  },
  {
    name: "Abdullah Mohammmmed",
    location: "Kaifan",
    amount: "10KD",
    status: "Failed",
  },
  {
    name: "Noura Mohammed",
    location: "Kaifan",
    amount: "15KD",
    status: "Success",
  },
  {
    name: "Fatma Abdullah",
    location: "Kaifan",
    amount: "30KD",
    status: "Success",
  },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 p-4">
      {/* Sidebar */}
      <aside className="bg-[#1F1D35] text-white w-64 flex flex-col justify-between rounded-2xl shadow-xl overflow-hidden">
        <div>
          <nav className="mt-4">
            <ul className="space-y-2">
              <li className="flex items-center px-6 py-3 hover:bg-[#292846] cursor-pointer rounded-lg mx-4">
                <Grid className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </li>
              <li className="flex items-center px-6 py-3 hover:bg-[#292846] cursor-pointer rounded-lg mx-4">
                <User className="w-5 h-5 mr-3" />
                <span>Face ID Users</span>
              </li>
              <li className="flex items-center px-6 py-3 hover:bg-[#292846] cursor-pointer rounded-lg mx-4">
                <Wifi className="w-5 h-5 mr-3" />
                <span>NFC Users</span>
              </li>
              <li className="flex items-center px-6 py-3 hover:bg-[#292846] cursor-pointer rounded-lg mx-4">
                <Settings className="w-5 h-5 mr-3" />
                <span>Settings</span>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mb-6 px-4">
          <div className="flex items-center px-6 py-3 hover:bg-[#292846] cursor-pointer rounded-lg">
            <LogOut className="w-5 h-5 mr-3" />
            <span>Log out</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
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
                className="border p-2 pl-10 rounded-md w-60 text-sm shadow-sm"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            </div>
          </div>

          <table className="w-full text-left border-collapse ">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-gray-500">Customer Name</th>
                <th className="px-4 py-2 text-gray-500">Location</th>
                <th className="px-4 py-2 text-gray-500">Amount</th>
                <th className="px-4 py-2 text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {transaction.name}
                  </td>
                  <td className="px-4 py-2 text-gray-500">
                    {transaction.location}
                  </td>
                  <td className="px-4 py-2 font-semibold text-black">
                    {transaction.amount}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.status === "Success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
