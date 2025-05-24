import { Link } from "react-router-dom";

function CTABox() {
  return (
    <div className="mt-12 bg-white p-6 rounded-xl border shadow text-center">
      <h2 className="text-xl font-semibold mb-2">
        Ready to See Your Payments?
      </h2>
      <p className="text-gray-700 mb-4">
        Now that you've found the best rate, calculate your exact monthly
        payments based on your situation.
      </p>
      <Link
        to="/mortgage-calculator"
        className="inline-block px-5 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition"
      >
        Try the Calculator
      </Link>
    </div>
  );
}
