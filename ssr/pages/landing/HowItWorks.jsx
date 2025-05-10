import React from "react";

const HowItWorks = () => {
  return (
    <section className="w-full mx-auto px-4 min-[834px]:px-8 min-[1440px]:px-16 min-[1440px]:py-12 min-[834px]:py-8 py-6">
      <h3 className=" mb-12">How it Works?</h3>
      <div className="flex flex-col min-[1440px]:flex-row gap-12 min-[1440px]:h-[637px]">
        <div className="flex-1 space-y-16 min-[1440px]:h-[637px]  ">
          {/* Step 1 */}
          <div className="border-b border-solid border-gray-300 ">
            <h3 className="flex items-center">
              <span className="mr-4">01</span> Find Your Ideal Property
            </h3>
          </div>

          {/* Step 2 */}
          <div className="border-b border-solid border-gray-300">
            <h3 className=" flex items-center">
              <span className=" mr-4">02</span> Schedule a Viewing
            </h3>
          </div>

          {/* Step 3 */}
          <div className="border-b border-solid border-gray-300">
            <h3 className="flex items-center">
              <span className=" mr-4">03</span> Close the Deal
            </h3>
          </div>
        </div>
        {/* Image */}
        <div className="flex-1 min-[1440px]:h-[637px]">
          <img
            loading="lazy"
            src="https://onekindesign.com/wp-content/uploads/2019/12/Pacific-Northwest-Style-House-Coates-Design-Architects-02-1-Kindesign.jpg"
            alt="Family in front of new home"
            className="rounded-lg shadow-lg w-full mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
