import React from "react";

export default function Transaction({ transaction }) {
  return (
    <li className="text-white p-3 border-b border-gray-700 bg-[#292846] rounded-lg">
      <div className="flex justify-between">
        <span className="font-semibold">Method: {transaction.method}</span>
        <span className="text-sm text-gray-400">{transaction.status}</span>
      </div>
      <div className="text-sm">
        Amount: <span className="font-medium">${transaction.amount}</span>
      </div>
      <div className="text-xs text-gray-400">
        Date: {new Date(transaction.transactionDate).toLocaleString()}
      </div>
    </li>
  );
}
