import { useEffect, Suspense, lazy } from 'react';

import ContactUs from './ContactUsHero';

const ContactUsSection = lazy(() => import('./ContactUsSection'));

const index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=" ">
      <ContactUs />

      <Suspense
        fallback={<span className="loading loading-dots loading-xl"></span>}
      >
        <ContactUsSection />
      </Suspense>
    </div>
  );
};

export default index;
