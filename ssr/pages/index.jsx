import "./index.css";
import React, { useEffect, lazy, Suspense } from "react";

import HomeLanding from "../../src/components/HomeLanding";

import Cookies from "js-cookie";

const AboutUsLanding = lazy(() => import("./landing/AboutUs"));
const PropertyList = lazy(() => import("./landing/PropertyList"));

const HowItWorks = lazy(() => import("./landing/HowItWorks"));

export const initializeGA = () => {
  const consent = Cookies.get("cookie_consent");

  if (consent && JSON.parse(consent).analytics) {
    window.gtag("config", "G-8CTXFDYJ61");
  }
};
export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HomeLanding />

      <Suspense fallback={<div>Loading...</div>}>
        <AboutUsLanding />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <PropertyList />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <HowItWorks />
      </Suspense>
    </div>
  );
}
