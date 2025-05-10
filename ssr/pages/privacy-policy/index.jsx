import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 text-gray-800 pt-[96px] pb-6">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At DwellFinder, we value your privacy. This Privacy Policy outlines how
        we collect, use, and protect your data.
      </p>
      <h2 className="text-xl font-semibold mt-6">Cookies</h2>
      <p className="mb-4">
        We use cookies to enhance your browsing experience. You may choose which
        cookies to accept by category:
      </p>
      <ul className="list-disc list-inside">
        <li>
          <strong>Analytics:</strong> Helps us understand how users interact
          with our website.
        </li>
        <li>
          <strong>Marketing:</strong> Used to deliver relevant advertising
          content.
        </li>
        <li>
          <strong>Preferences:</strong> Stores your site preferences like
          language or layout.
        </li>
      </ul>
      {/* Add more sections as needed */}
    </div>
  );
};

export default PrivacyPolicy;
