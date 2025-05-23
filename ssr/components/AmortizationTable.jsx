import React from "react";

export default function AmortizationTable({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4">Amortization Schedule</h2>

      <div className="overflow-x-auto text-xs sm:text-sm">
        <table className="w-full border-collapse border border-gray-300 min-w-[700px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Due Date</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Extra Payment</th>
              <th className="border p-2">Interest</th>
              <th className="border p-2">Principal</th>
              <th className="border p-2">Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.index} className="text-center">
                <td className="border p-2">{row.index}</td>
                <td className="border p-2">{row.dueDate}</td>
                <td className="border p-2">${row.payment.toFixed(2)}</td>
                <td className="border p-2">${row.extraPayment.toFixed(2)}</td>
                <td className="border p-2">${row.interest.toFixed(2)}</td>
                <td className="border p-2">${row.principal.toFixed(2)}</td>
                <td className="border p-2">${row.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
