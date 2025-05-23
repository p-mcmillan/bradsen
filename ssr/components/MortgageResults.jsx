import React from "react";
import { Pie, Bar } from "react-chartjs-2";

export default function MortgageResults({ state }) {
  const { results, paymentFrequency } = state;

  if (!results) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 className="text-lg font-semibold">Mortgage Calculation Results</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <p>
            <strong>Mortgage Payment:</strong> ${results.mortgagePayment}{" "}
            {paymentFrequency}
          </p>
          <p>
            <strong>Total Loan Cost:</strong> ${results.totalCost}
          </p>
          <p>
            <strong>Total Interest:</strong> ${results.totalInterest}
          </p>
          <p>
            <strong>Total Payments:</strong> {results.totalPayments}
          </p>
          <p>
            <strong>Payoff Date:</strong> {results.payoffDate}
          </p>
        </div>

        <div className="p-4 border rounded overflow-x-auto">
          <h3 className="font-medium mb-2">Pie Chart</h3>
          <div className="max-w-xs mx-auto">
            <Pie data={results.pieData} />
          </div>
        </div>
      </div>

      <div className="p-4 border rounded overflow-x-auto">
        <h3 className="font-medium mb-2">Balance + Interest Over Time</h3>
        <div className="max-w-full">
          <Bar data={results.chartData} />
        </div>
      </div>
    </div>
  );
}
