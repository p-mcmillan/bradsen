import React, { useEffect, lazy, Suspense } from "react";
import MortgageGuideHero from "./MortgageGuideHero";

const MortgageGuide = lazy(() => import("./MortgageGuide"));

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <MortgageGuideHero />
      <Suspense
        fallback={<span className="loading loading-dots loading-xl"></span>}
      >
        <MortgageGuide />
      </Suspense>
    </div>
  );
};

export default Index;
