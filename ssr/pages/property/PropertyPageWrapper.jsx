import { lazy, Suspense, useEffect, useState } from "react";

const PropertyDetail = lazy(() => import("./PropertyDetail"));

export default function PropertyPageWrapper() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <Suspense fallback={<div className="p-8">Loading property...</div>}>
      <PropertyDetail />
    </Suspense>
  );
}
