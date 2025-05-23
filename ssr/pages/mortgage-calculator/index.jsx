import React, { useEffect, lazy, Suspense } from "react";
// import FaqHeroSection from "./FaqHeroSection";

const MortgageCalculator = lazy(() => import("./mortgageCalculator"));

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
        <MortgageCalculator />
      </Suspense>
    </div>
  );
};

export default index;
