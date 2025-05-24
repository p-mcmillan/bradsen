import React, { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How do I schedule a property viewing?",
    answer:
      "You can schedule a viewing by reaching out to me directly. Just give me a call, text, or use the contact form on any listing — I'll coordinate a time that works best for you.",
  },
  {
    question: "Are all the property listings verified?",
    answer:
      "Yes — I personally review and verify every listing to make sure you're getting accurate and up-to-date information you can trust.",
  },
  {
    question: "What fees are involved in buying a property?",
    answer:
      "Besides the purchase price, typical costs include legal fees, home inspections, and closing costs. I’ll walk you through everything upfront so there are no surprises.",
  },
  {
    question: "Can I get assistance with home financing?",
    answer:
      "Definitely. I can connect you with trusted mortgage brokers and help you understand what financing options are available based on your situation.",
  },
  {
    question: "What if I can't find the property I’m looking for?",
    answer:
      "Let me know what you’re after — I often have access to upcoming listings or can help scout off-market opportunities based on your needs.",
  },
  {
    question: "Is there customer support if I encounter an issue?",
    answer:
      "I’m your main point of contact, so if anything comes up — questions, concerns, or issues — just reach out. I’m here to help every step of the way.",
  },
];

const FaqAccordionSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="max-w-[1344px] mx-auto px-4 py-12 space-y-4 text-gray-800">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border shadow-sm transition overflow-hidden"
        >
          <button
            className="w-full flex justify-between items-center px-4 py-4 text-left"
            onClick={() => toggleIndex(index)}
            aria-expanded={openIndex === index}
          >
            <span className="text-sm font-medium">{faq.question}</span>
            {openIndex === index ? (
              <ion-icon
                name="chevron-up-outline"
                className="text-xl text-gray-600"
              ></ion-icon>
            ) : (
              <ion-icon
                name="chevron-down-outline"
                className={`text-xl text-gray-600 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
          {openIndex === index && faq.answer && (
            <div
              className={`px-4 text-sm text-gray-600 transition-all duration-300 ${
                openIndex === index
                  ? "pb-4 max-h-96 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {faq.answer}
            </div>
          )}
        </div>
      ))}

      {/* CTA box */}
      <div className="bg-white rounded-xl border shadow-sm p-6 mt-6 text-center space-y-4">
        <p className="text-sm text-gray-800">
          Still have questions? Contact our support team or explore our full FAQ
          page for more information.
        </p>
        <Link
          to="/contact-me"
          className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition"
        >
          Contact Tyler
        </Link>
      </div>
    </section>
  );
};

export default FaqAccordionSection;
