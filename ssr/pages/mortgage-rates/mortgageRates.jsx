import React, { useState } from "react";
import axios from "axios";
import { mortgageCalculator } from "../../constants";
import CityAutocomplete from "../../components/CitySelector";

const terms = [
  { value: "12", label: "1 Year" },
  { value: "24", label: "2 Years" },
  { value: "36", label: "3 Years" },
  { value: "48", label: "4 Years" },
  { value: "60", label: "5 Years" },
  { value: "120", label: "10 Years" },
];

const amortizationOptions = Array.from({ length: 30 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}-year`,
}));

const occupancyOptions = [
  { key: "owner", value: 1, label: "Owner-occupied" },
  { key: "owner-rental", value: 1, label: "Owner-occupied and rental" },
  { key: "rental", value: 0, label: "Rental" },
  { key: "second-home", value: 0, label: "Second home" },
];

const transactionOptions = [
  { value: "purchase", label: "Buying a home" },
  { value: "renewal", label: "Renewing" },
  { value: "refinance", label: "Refinancing" },
  { value: "heloc", label: "Home equity line of credit" },
];

export default function MortgageRates() {
  const [params, setParams] = useState({
    city: "",
    province: "",
    term: "",
    type: "fixed",
    amortization: "",
    homePrice: "",
    downPaymentAmount: "",
    isOwnerOccupied: "",
    scenario: "purchase",
  });

  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cachedKey, setCachedKey] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const fetchRates = async () => {
    const {
      city,
      province,
      homePrice,
      downPaymentAmount,
      term,
      amortization,
      type,
      isOwnerOccupied,
      scenario,
    } = params;

    if (
      !city ||
      !province ||
      !homePrice ||
      !downPaymentAmount ||
      !term ||
      !amortization ||
      !type ||
      !isOwnerOccupied ||
      !scenario
    ) {
      alert("Please complete all required fields.");
      return;
    }

    const downPaymentPercent = (downPaymentAmount / homePrice).toFixed(4);
    const key = `${city}-${province}-${term}-${type}-${homePrice}-${downPaymentPercent}-${amortization}-${isOwnerOccupied}-${scenario}`;

    if (key === cachedKey) return; // already fetched

    setLoading(true);

    try {
      const response = await axios.get(
        "https://api.ratehub.ca/mortgage-rates/all/purchase-rates",
        {
          params: {
            city,
            province,
            term,
            type,
            amortization,
            homePrice,
            downPaymentAmount,
            downPaymentPercent,
            isBigBank: 0,
            isCashBack: 0,
            isOpen: 0,
            isOwnerOccupied,
            isPreApproval: 0,
            language: "en",
            scenario,
          },
        }
      );

      const rawRates = response.data?.data?.rates || [];
      const providerMap = response.data?.data?.providers || {};

      const grouped = rawRates.reduce((acc, item) => {
        const key = item.provider;
        if (!acc[key]) acc[key] = [];
        acc[key].push({
          id: item.id,
          rate: item.value,
          type: item.type,
          term: `${item.term / 12} yr`,
          description: item.description,
          href: `https://www.ratehub.ca${item.href}`,
        });
        return acc;
      }, {});

      const merged = Object.entries(grouped).map(([providerSlug, rates]) => {
        const meta = providerMap[providerSlug] || {};
        return {
          slug: providerSlug,
          name: meta.name || providerSlug,
          logo: meta.logo || null,
          rates,
        };
      });

      setRates(merged);
      setCachedKey(key);
    } catch (err) {
      console.error("Error fetching rates", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsed =
      name === "homePrice" || name === "downPaymentAmount"
        ? parseFloat(value)
        : value;
    setParams((prev) => ({
      ...prev,
      [name]: parsed,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-24 mb-9">
      <div className="text-center mb-6">
        <img
          src={mortgageCalculator.maple_icon}
          alt="Leaf"
          className="mx-auto w-12 h-12"
        />
        <h1 className="text-3xl sm:text-4xl font-bold mt-2">
          Compare Canadian Mortgage Rates
        </h1>
      </div>

      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
        onSubmit={(e) => {
          e.preventDefault();
          setHasSubmitted(true);
          fetchRates();
        }}
      >
        <CityAutocomplete
          onSelect={({ city, province }) =>
            setParams((prev) => ({ ...prev, city, province }))
          }
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="homePrice"
          value={params.homePrice}
          onChange={handleChange}
          placeholder="Purchase Price"
          required
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="downPaymentAmount"
          value={params.downPaymentAmount}
          onChange={handleChange}
          placeholder="Down Payment"
          required
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="term"
          value={params.term}
          onChange={handleChange}
          required
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Term</option>
          {terms.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <select
          name="type"
          value={params.type}
          onChange={handleChange}
          required
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Type *</option>
          <option value="fixed">Fixed</option>
          <option value="variable">Variable</option>
        </select>
        <select
          name="amortization"
          value={params.amortization}
          onChange={handleChange}
          required
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Amortization</option>
          {amortizationOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          name="isOwnerOccupied"
          value={params.isOwnerOccupied}
          onChange={(e) =>
            setParams((prev) => ({
              ...prev,
              isOwnerOccupied: Number(e.target.value),
            }))
          }
          required
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Occupancy</option>
          {occupancyOptions.map((opt) => (
            <option key={opt.key} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          name="scenario"
          value={params.scenario}
          onChange={handleChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {transactionOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="sm:col-span-2 flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 text-base font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
          >
            Get Rates
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : hasSubmitted && rates.length === 0 ? (
        <p className="text-center text-gray-600">No results found.</p>
      ) : (
        <div className="space-y-4">
          {rates.map((entry, idx) => (
            <div
              key={idx}
              className="p-4 border rounded bg-white shadow space-y-2 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center space-x-4">
                {entry.logo && (
                  <img
                    src={entry.logo}
                    alt={entry.name}
                    className="w-16 h-16 object-contain"
                  />
                )}
                <h2 className="text-lg font-semibold">{entry.name}</h2>
              </div>

              <div className="text-sm mt-2 sm:mt-0">
                <ul className="space-y-1">
                  {entry.rates.map((rate) => (
                    <li key={rate.id}>
                      <a
                        href={rate.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {rate.description} — {rate.rate}% ({rate.term},{" "}
                        {rate.type})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
