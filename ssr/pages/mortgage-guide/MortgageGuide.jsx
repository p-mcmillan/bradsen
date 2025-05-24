import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How does my credit score affect my mortgage rate?",
    answer:
      "A higher credit score usually helps you qualify for better interest rates, as lenders see you as less risky. Lower scores may mean higher rates or more restrictions.",
  },
  {
    question: "Should I get pre-approved before looking at homes?",
    answer:
      "Yes — a pre-approval gives you a clear idea of your budget and shows sellers you're a serious buyer. It also helps you lock in a rate while you shop.",
  },
  {
    question: "What’s the difference between amortization and term?",
    answer:
      "Amortization is the total length of your mortgage (e.g. 25 years), while the term is how long your current rate is locked in (e.g. 5 years fixed).",
  },
];

export default function MortgageGuide() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4 text-center">Mortgage Guide</h1>
      <p className="text-gray-700 mb-6 text-center">
        Understand mortgage rates, calculate your payments, and make confident
        decisions.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">
          What is a Mortgage Rate?
        </h2>
        <p className="text-gray-600">
          A mortgage rate is the interest you pay on your home loan. It can be
          fixed or variable and is usually tied to a specific term (e.g., 5
          years fixed).
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">
          What is a Mortgage Payment?
        </h2>
        <p className="text-gray-600">
          Your mortgage payment is the amount you owe each month — this includes
          both the principal and interest, based on your rate, amortization, and
          loan size.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Step-by-Step</h2>

        <div className="bg-white shadow rounded p-4 mb-6">
          <h3 className="text-xl font-medium">1. Compare Mortgage Rates</h3>
          <p className="text-gray-600 mb-2">
            Start by exploring the best available rates from top lenders in
            Canada.
          </p>
          <Link
            to="/mortgage-rates"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full  hover:bg-blue-700"
          >
            View Rates
          </Link>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="text-xl font-medium">2. Calculate Your Payments</h3>
          <p className="text-gray-600 mb-2">
            Use our calculator to estimate what you’ll pay each month based on
            your rate and down payment.
          </p>
          <Link
            to="/mortgage-calculator"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-full  hover:bg-green-700"
          >
            Use Calculator
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded shadow-sm bg-white overflow-hidden transition"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-4 py-3 flex justify-between items-center"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-sm">{faq.question}</span>
                <span
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <ion-icon
                    name="chevron-down-outline"
                    class="text-xl"
                  ></ion-icon>
                </span>
              </button>

              <div
                className={`px-4 text-sm text-gray-600 transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-40 py-2 opacity-100"
                    : "max-h-0 overflow-hidden opacity-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
