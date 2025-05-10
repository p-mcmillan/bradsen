import React from "react";

const InvestmentSection = ({ image }) => {
  return (
    <section className="mx-auto text-gray-800 px-4 py-8">
      <div className="flex flex-col min-[1440px]:flex-row justify-between gap-8">
        {/* Left: Text */}
        <div className="flex flex-col min-[1440px]:w-[678px] gap-4">
          <h4 className="min-[834px]:text-[40px] font-bold">
            Your Investment, Our Priority
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Real estate decisions represent life’s most significant investments.
            From first-time homebuyers to seasoned investors, our experienced
            agents provide personalized guidance throughout your journey.
          </p>
        </div>

        {/* Right: Image */}
        <div className="min-[1440px]:w-[582px] w-full">
          <img
            src={image}
            alt="Sunlit dining room"
            className="w-full h-auto rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default InvestmentSection;
