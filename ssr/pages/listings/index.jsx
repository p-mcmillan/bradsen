import React, { useEffect, lazy, Suspense } from "react";

import SearchSection from "./search";

const PropertyList = lazy(() => import("./propertyList"));

const index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <SearchSection />

      <Suspense
        fallback={<span className="loading loading-dots loading-xl"></span>}
      >
        <PropertyList />
      </Suspense>
    </div>
  );
};

export default index;
