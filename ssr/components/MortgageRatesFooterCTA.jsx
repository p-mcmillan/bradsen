import { Link } from "react-router-dom";

export default function MortgageRatesFooterCTA() {
  return (
    <div className="mx-auto mt-24 px-4 sm:px-6 lg:px-8 mb-20 max-w-7xl">
      <div className="mt-12 bg-white border rounded-xl p-6 shadow text-center animate-fade-in">
        <h2 className="text-2xl font-semibold mb-2">What’s Next?</h2>
        <p className="text-gray-700 mb-4">
          Now that you’ve compared rates, estimate your monthly payments and
          total cost with our mortgage calculator.
        </p>
        <Link
          to="/mortgage-calculator"
          className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition"
        >
          Calculate Your Payments
        </Link>
      </div>
    </div>
  );
}
