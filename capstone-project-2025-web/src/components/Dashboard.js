"use client";

import { useState, useEffect } from "react";
import { Search, Grid, Settings, LogOut } from "lucide-react";
import { logout } from "../actions/auth";
import { getTransactions } from "../actions/transactions";
import { getBusinessBranches } from "../actions/branches";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard({ switchPage }) {
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [Branches, setBranches] = useState([
  ]);

  const weeklyData = [
    { day: "Sunday", value: 70 },
    { day: "Monday", value: 90 },
    { day: "Tuesday", value: 50 },
    { day: "Wednesday", value: 60 },
    { day: "Thursday", value: 80 },
    { day: "Friday", value: 100 },
    { day: "Saturday", value: 30 },
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await getBusinessBranches(1);
        setBranches(Array.isArray(data.branchList) ? data.branchList : []);
      } catch (error) {
        console.error("Error fetching branches:", error);
        setBranches([]);
      }
    };
    fetchBranches();
  }, []);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      switchPage("login");
    } else {
      alert("Logout failed. Please try again.");
    }
  };

  const filteredTransactions = transactions.filter((t) =>
    t?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 p-4">
      {/* Sidebar */}
      <aside className="bg-[#1b233a] text-white w-64 flex flex-col justify-between rounded-2xl shadow-xl overflow-hidden">
        <div>
          <nav className="mt-4">
            <ul className="space-y-2">
              <li className="flex items-center px-6 py-3 hover:bg-[#292846] cursor-pointer rounded-lg mx-4">
                <Grid className="w-5 h-5 mr-3" />
                <span>Analytics</span>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mb-6 px-4">
          <div className="flex items-center px-6 py-3 hover:bg-[#292846] cursor-pointer rounded-lg">
            <Settings className="w-5 h-5 mr-3" />
            <span>Settings</span>
          </div>
          <div
            className="flex items-center px-6 py-3 hover:bg-[#292846] cursor-pointer rounded-lg"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Log out</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Graph Section */}
        <h2 className="text-2xl font-semibold text-black mb-4">
          Business Name
        </h2>
        <div className="bg-[#1b233a] p-6 rounded-lg shadow-md w-full max-w-[calc(100%-16rem)] self-center border border-gray-200">
          <h2 className="text-xl font-semibold text-white mb-4">
            Weekly Activity
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={weeklyData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
              <XAxis dataKey="day" stroke="#4A5568" />
              <YAxis stroke="#4A5568" />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#a68bff"
                barSize={35}
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <main className="flex flex-1 gap-6 flex-wrap">
          {/* Transactions Section */}
          <div className="flex-1 bg-[#1b233a] p-6 rounded-lg shadow-lg ml-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Transactions
            </h2>
            <input
              type="text"
              placeholder="Search transactions"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 pl-10 rounded-md w-60 text-sm shadow-sm"
            />
            <ul>
              {filteredTransactions.map((transaction, index) => (
                <li key={index}>{transaction.name}</li>
              ))}
            </ul>
          </div>

          {/* Branches Section */}
          <div className="w-80 bg-[#1b233a] shadow-lg rounded-lg p-4 h-full overflow-y-auto">
            <h2 className="text-lg font-semibold text-white mb-4">
              Business Branches
            </h2>
            <ul className="space-y-3">
              {Branches.map((branch) => (
                <li key={branch.id} className="p-3 bg-[#a68bff] rounded-lg">
                  <span className="font-medium text-white">{branch.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
