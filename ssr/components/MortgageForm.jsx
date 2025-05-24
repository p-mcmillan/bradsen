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
    <form className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {/* Left Column */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Mortgage Details</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1">Mortgage Amount</label>
            <input
              type="number"
              name="mortgageAmount"
              value={state.mortgageAmount}
              onChange={handleNumberChange}
              className="w-full p-2 border rounded"
              placeholder="e.g. 300000"
            />
          </div>

          <div>
            <label className="block mb-1">Amortization Period</label>
            <select
              name="amortizationMonths"
              value={state.amortizationMonths}
              onChange={handleNumberChange}
              className="w-full p-2 border rounded"
            >
              {Array.from({ length: 30 }, (_, i) => {
                const years = i + 1;
                return (
                  <option key={years} value={years * 12}>
                    {years} year{years > 1 ? "s" : ""}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block mb-1">Annual Interest Rate (%)</label>
            <input
              type="number"
              name="interestRate"
              value={state.interestRate}
              onChange={handleNumberChange}
              className="w-full p-2 border rounded"
              placeholder="e.g. 3.33"
            />
          </div>

          <div>
            <label className="block mb-1">First Payment Date</label>
            <input
              type="date"
              name="firstPaymentDate"
              value={state.firstPaymentDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Payment Frequency</label>
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
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-4">Extra Payments</h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1">Extra Payment ($)</label>
              <input
                type="number"
                name="extraPayment"
                value={state.extraPayment}
                onChange={handleNumberChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">
                Payment Interval (N payments)
              </label>
              <input
                type="number"
                name="paymentInterval"
                value={state.paymentInterval}
                onChange={handleNumberChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Extra Annual Payment ($)</label>
              <input
                type="number"
                name="extraAnnualPayment"
                value={state.extraAnnualPayment}
                onChange={handleNumberChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Button aligned to bottom on desktop, centered on mobile */}
        <div className="mt-6 md:mt-12 flex justify-center md:justify-end">
          <button
            type="button"
            onClick={() => {
              const results = calculateMortgage(state);
              setState((prev) => ({ ...prev, results }));
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Calculate
          </button>
        </div>
      </div>
    </form>
  );
}
