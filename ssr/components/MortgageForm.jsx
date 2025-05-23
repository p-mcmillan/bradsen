import { calculateMortgage } from "../../utils/calculateMortgage";

export default function MortgageForm({ state, setState }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const parsed = parseFloat(value);
    setState((prev) => ({
      ...prev,
      [name]: isNaN(parsed) ? "" : parsed,
    }));
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Mortgage Details</h2>

        <label className="block mb-2">Mortgage Amount</label>
        <input
          type="number"
          name="mortgageAmount"
          value={state.mortgageAmount}
          onChange={handleNumberChange}
          className="w-full p-2 border rounded"
          placeholder="e.g. 300000"
        />

        <label className="block mt-4 mb-2">Amortization (months)</label>
        <input
          type="number"
          name="amortizationMonths"
          value={state.amortizationMonths}
          onChange={handleNumberChange}
          className="w-full p-2 border rounded"
          placeholder="e.g. 300"
        />

        <label className="block mt-4 mb-2">Annual Interest Rate (%)</label>
        <input
          type="number"
          name="interestRate"
          value={state.interestRate}
          onChange={handleNumberChange}
          className="w-full p-2 border rounded"
          placeholder="e.g. 3.33"
        />

        <label className="block mt-4 mb-2">First Payment Date</label>
        <input
          type="date"
          name="firstPaymentDate"
          value={state.firstPaymentDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <label className="block mt-4 mb-2">Payment Frequency</label>
        <select
          name="paymentFrequency"
          value={state.paymentFrequency}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {[
            "Annually",
            "Semi-Annually",
            "Quarterly",
            "Bi-Monthly",
            "Monthly",
            "Semi-Monthly",
            "Bi-Weekly",
            "Weekly",
            "Acc. Bi-Weekly",
            "Acc. Weekly",
          ].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Extra Payments</h2>

        <label className="block mb-2">Extra Payment ($)</label>
        <input
          type="number"
          name="extraPayment"
          value={state.extraPayment}
          onChange={handleNumberChange}
          className="w-full p-2 border rounded"
        />

        <label className="block mt-4 mb-2">Payment Interval (N payments)</label>
        <input
          type="number"
          name="paymentInterval"
          value={state.paymentInterval}
          onChange={handleNumberChange}
          className="w-full p-2 border rounded"
        />

        <label className="block mt-4 mb-2">Extra Annual Payment ($)</label>
        <input
          type="number"
          name="extraAnnualPayment"
          value={state.extraAnnualPayment}
          onChange={handleNumberChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="button"
          onClick={() => {
            const results = calculateMortgage(state);
            setState((prev) => ({ ...prev, results }));
          }}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Calculate
        </button>
      </div>
    </form>
  );
}
