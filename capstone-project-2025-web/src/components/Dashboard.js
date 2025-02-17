"use client";

import { useState, useEffect } from "react";
import { Grid, Settings, LogOut, Store } from "lucide-react";
import { logout } from "../actions/auth";
import { getTransactions, getUserLocal } from "../actions/transactions";
import { getBusinessBranches } from "../actions/branches";
import Transaction from "./transactions";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard({ switchPage }) {
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const fetchData = async () => {
      try {
        const user = await getUserLocal();
        if (!user?.userId) return;

        const [branchesData, transactionsData] = await Promise.all([
          getBusinessBranches(user.userId),
          getTransactions(user.userId),
        ]);

        setBranches(
          Array.isArray(branchesData.associateList)
            ? branchesData.associateList
            : []
        );

        setTransactions(
          Array.isArray(transactionsData.transactions)
            ? transactionsData.transactions
            : []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      switchPage("login");
    } else {
      alert("Logout failed. Please try again.");
    }
  };

  const filteredTransactions = search
    ? transactions.filter((t) =>
        t?.transactionDate?.toLowerCase().includes(search.toLowerCase())
      )
    : transactions;

  const userData = [
    { name: "QR Code Users", value: 505 },
    { name: "Face ID Users", value: 1000 },
  ];

  const COLORS = ["#0D9488", "#a78bfa"];

  return (
    <div className="flex min-h-screen bg-[#151d30] p-6">
      {/* Sidebar with  */}

      <aside className="bg-[#1b233a] text-white w-64 h-[90vh] flex flex-col justify-between rounded-2xl shadow-xl overflow-hidden border border-[#3c4661]">
        <div>
          <div className="flex items-center justify-center p-4">
            <img
              src="https://i.postimg.cc/wTkmQqCt/logo3.png"
              alt="Logo"
              className="h-20 w-auto"
            />
          </div>

          <nav className="mt-2">
            {" "}
            <ul className="space-y-2">
              <li className="flex items-center px-6 py-3 hover:bg-[#292846] cursor-pointer rounded-lg mx-4">
                <Grid className="w-5 h-5 mr-3 text-[#a78bfa]" />
                <span className="font-semibold">Dashboard</span>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mb-6 px-4">
          <div className="flex items-center px-6 py-3 hover:bg-[#292846] cursor-pointer rounded-lg">
            <Settings className="w-5 h-5 mr-3 text-[#a78bfa]" />
            <span className="font-semibold">Settings</span>
          </div>
          <div
            className="flex items-center px-6 py-3 hover:bg-[#292846] cursor-pointer rounded-lg"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3 text-[#a78bfa]" />
            <span className="font-semibold">Log out</span>
          </div>
        </div>
      </aside>
      <div className="flex flex-col w-full ml-6 mt-8">
        <h2 className="text-2xl font-semibold text-white mb-6 text-left">
          Coded Canteen
        </h2>
        <div className="flex flex-row gap-6">
          {/* Graph section */}
          <div className="flex-1 bg-[#1b233a] p-6 rounded-2xl shadow-lg border border-[#4a5473] h-full w-">
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
                <Tooltip
                  content={({ payload }) =>
                    payload && payload.length ? (
                      <div className="text-white text-sm font-semibold">
                        Value: {payload[0].value}
                      </div>
                    ) : null
                  }
                  cursor={{ fill: "transparent" }}
                />
                <Bar
                  dataKey="value"
                  fill="#a78bfa"
                  barSize={35}
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/*pie chart section*/}
          <div className="bg-[#1b233a] p-6 rounded-2xl shadow-md w-80 border border-[#4a5473]">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={userData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  label
                  stroke="none"
                >
                  {userData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  itemStyle={{ color: "white" }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex justify-between items-center text-white mt-4 text-sm">
              {userData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index] }}
                  ></span>
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*transactions*/}
        <div className="flex flex-row gap-6 mt-4">
          <div className="flex-[3.5] bg-[#1b233a] p-6 rounded-2xl shadow-lg border border-[#4a5473] h-full">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Transactions
            </h2>
            <div className="grid grid-cols-4 text-white text-sm font-semibold p-1 rounded-lg">
              <div className="text-left">Method</div>
              <div className="text-center">Amount</div>
              <div className="text-center">Date and Time</div>
              <div className="text-right">Status</div>
            </div>
            <div className="space-y-4 mt-3">
              {filteredTransactions.map((transaction) => (
                <Transaction
                  key={transaction.transactionId}
                  transaction={transaction}
                />
              ))}
            </div>
          </div>

          {/*busniess branches*/}
          <div className="flex-1 bg-[#1b233a] p-6 rounded-2xl shadow-lg border border-[#4a5473] h-full">
            <h2 className="text-lg font-semibold text-white mb-4">
              Business Branches
            </h2>
            <ul className="space-y-3">
              {branches.map((branch) => (
                <li
                  key={branch.id}
                  className="p-3 bg-[#a78bfa] rounded-lg text-white flex items-center hover:bg-[#5d22b8]"
                >
                  <Store className="w-5 h-5 mr-2 text-white" />
                  {branch.fullName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
