import React, { useEffect, lazy, Suspense } from "react";

import HeroAboutSection from "./HeroAboutSection";

const InvestmentSection = lazy(() => import("./InvestmentSection"));
const ExperienceSection = lazy(() => import("./ExperienceSection"));
const TeamSection = lazy(() => import("./TeamSection"));

import { agentInfo, aboutUsImages } from "../../constants";
const { investment, modernCondo, classicHome } = aboutUsImages;

const index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeroAboutSection />
      <div className="px-4 min-[834px]:px-8 min-[1440px]:px-16 max-w-[1344px] mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <InvestmentSection image={investment} />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <ExperienceSection
            modernCondoImage={modernCondo}
            classicHomeImage={classicHome}
          />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <TeamSection agentInfo={agentInfo} />
        </Suspense>
      </div>
    </div>
  );
};

export default index;
