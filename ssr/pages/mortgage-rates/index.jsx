import React, { useEffect, lazy, Suspense } from "react";
import MortgageRatesFooterCTA from "../../components/MortgageRatesFooterCTA";

const MortgageRates = lazy(() => import("./mortgageRates"));

const index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Suspense
        fallback={<span className="loading loading-dots loading-xl"></span>}
      >
        <MortgageRates />
        <MortgageRatesFooterCTA />
      </Suspense>
    </div>
  );
};

export default index;
