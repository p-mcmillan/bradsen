import React from "react";

const ExperienceSection = ({ modernCondoImage, classicHomeImage }) => {
  return (
    <section className="mx-auto text-gray-800 pb-6 max-w-[1344px]">
      <h4 className="text-right font-semibold pt-6 min-[834px]:text-[40px]">
        Excellence Through Experience
      </h4>

      <div className="flex flex-col min-[1440px]:flex-row min-[1440px]:justify-between">
        <div className="min-[834px]:w-[538px] ">
          <img
            src={modernCondoImage} // adjust path as needed
            alt="Modern Condo"
            loading="lazy"
            className="w-full h-auto rounded mb-8 mt-6"
          />

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1">
              Local Market Expertise
            </h3>
            <p className="text-sm text-gray-700">
              Our agents live and breathe the communities they serve, offering
              insider knowledge that gives our clients a competitive edge.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1">
              Innovative Technology
            </h3>
            <p className="text-sm text-gray-700">
              We leverage cutting-edge tools and marketing strategies to ensure
              your property reaches the right buyers
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1">
              Client-First Approach
            </h3>
            <p className="text-sm text-gray-700">
              Your goals become our goals, with responsive communication and
              tailored solutions matching your unique needs.
            </p>
          </div>
        </div>{" "}
        <div className="min-[1440px]:w-[646px]">
          <img
            src={classicHomeImage} // adjust path as needed
            alt="Classic Home"
            loading="lazy"
            className="w-full h-auto rounded pt-6"
          />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
