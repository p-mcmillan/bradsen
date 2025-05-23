import React, { useState, useEffect, useRef } from "react";
import "chart.js/auto";

import { useSearchParams } from "react-router-dom";
import MortgageForm from "../../components/MortgageForm";
import MortgageResults from "../../components/MortgageResults";
import AmortizationTable from "../../components/AmortizationTable";
import { mortgageCalculator } from "../../constants";

export default function MortgageCalculator() {
  const resultRef = useRef();
  const [searchParams] = useSearchParams();

  const [state, setState] = useState({
    mortgageAmount: 300000,
    amortizationMonths: 300,
    interestRate: 3.33,
    paymentFrequency: "Monthly",
    firstPaymentDate: new Date().toISOString().split("T")[0],
    extraPayment: 0,
    paymentInterval: 0,
    extraAnnualPayment: 0,
    results: null,
  });

  useEffect(() => {
    const getParam = (key, fallback) =>
      parseFloat(searchParams.get(key)) || fallback;
    setState((prev) => ({
      ...prev,
      mortgageAmount: getParam("mo", prev.mortgageAmount),
      amortizationMonths: getParam("ma", prev.amortizationMonths),
      interestRate: getParam("ir", prev.interestRate),
      extraPayment: getParam("ep", prev.extraPayment),
      extraAnnualPayment: getParam("ea", prev.extraAnnualPayment),
      paymentInterval: getParam("pi", prev.paymentInterval),
      paymentFrequency: searchParams.get("pf") || prev.paymentFrequency,
      firstPaymentDate: searchParams.get("fp") || prev.firstPaymentDate,
    }));
  }, [searchParams]);

  // const downloadPDF = async () => {
  //   const jsPDF = (await import("jspdf")).default;
  //   const html2canvas = (await import("html2canvas")).default;

  //   if (!resultRef.current) return;

  //   // ✅ 1. Clone the content
  //   const clone = resultRef.current.cloneNode(true);

  //   // ✅ 2. Strip Tailwind classes to avoid oklch-related styles
  //   clone.querySelectorAll("[class]").forEach((el) => {
  //     el.removeAttribute("class");
  //   });

  //   // ✅ 3. Insert into hidden sandbox
  //   const sandbox = document.createElement("div");
  //   sandbox.style.all = "initial";
  //   sandbox.style.position = "absolute";
  //   sandbox.style.top = "-10000px";
  //   sandbox.style.left = "-10000px";
  //   sandbox.style.zIndex = "-9999";
  //   sandbox.style.backgroundColor = "#ffffff";
  //   sandbox.appendChild(clone);
  //   document.body.appendChild(sandbox);

  //   try {
  //     const canvas = await html2canvas(clone, {
  //       scale: 2,
  //       useCORS: true,
  //       backgroundColor: "#ffffff",
  //     });

  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF({
  //       orientation: "portrait",
  //       unit: "pt",
  //       format: "a4",
  //     });

  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     pdf.save("mortgage-results.pdf");
  //   } catch (err) {
  //     console.error("PDF generation failed:", err);
  //   } finally {
  //     document.body.removeChild(sandbox);
  //   }
  // };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-24 mb-9">
      <div className="text-center mb-6">
        <img
          src={mortgageCalculator.maple_icon}
          alt="Leaf"
          className="mx-auto w-12 h-12"
        />
        <h1 className="text-3xl sm:text-4xl font-bold mt-2">
          Canadian Mortgage Calculator
        </h1>
      </div>

      <MortgageForm state={state} setState={setState} />

      {state.results && (
        <>
          <div ref={resultRef} className="bg-white text-black p-4">
            <MortgageResults state={state} />
            <AmortizationTable data={state.results.amortizationSchedule} />
          </div>

          {/* <button
            onClick={downloadPDF}
            className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded shadow"
          >
            Download PDF
          </button> */}
        </>
      )}
    </div>
  );
}
