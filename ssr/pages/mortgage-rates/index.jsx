import React, { useEffect, lazy, Suspense } from "react";
import MortgageRates from "./mortgageRates";
// import FaqHeroSection from "./FaqHeroSection";

const MortgageCalculator = lazy(() => import("./mortgageRates"));

const index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {/* <FaqHeroSection /> */}

      <Suspense
        fallback={<span className="loading loading-dots loading-xl"></span>}
      >
        <MortgageRates />
      </Suspense>
    </div>
  );
};

export default index;
