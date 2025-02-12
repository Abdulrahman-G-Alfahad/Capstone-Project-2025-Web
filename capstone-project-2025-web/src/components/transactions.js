import React from "react";

export default function Transaction({ transaction }) {
  return (
    <div className="bg-[#151d30] p-4 rounded-lg shadow-md text-white w-full grid grid-cols-4 gap-4 items-center">
      {/* Payment Method */}
      <div className="font-bold text-left">{transaction.method}</div>

      {/* Amount */}
      <div className="font-bold text-center">{transaction.amount} KD</div>

      {/* Date and Time */}
      <div className="font-bold text-center">
        {new Date(transaction.transactionDate).toLocaleString()}
      </div>

      {/* Status */}
      <div className="text-right">
        <span
          className={`px-3 py-1 text-sm font-medium rounded-lg ${
            transaction.status === "Success"
              ? "bg-green-200 text-green-800"
              : transaction.status === "Failed"
              ? "bg-red-200 text-red-800"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          {transaction.status}
        </span>
      </div>
    </div>
  );
}
