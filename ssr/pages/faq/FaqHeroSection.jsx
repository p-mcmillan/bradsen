import React from "react";
import { backgroundImages } from "../../constants/index";

const FaqHeroSection = () => {
  return (
    <section className="relative h-[450px] w-full text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-100"
        style={{
          backgroundImage: `url(${backgroundImages.faq})`,
        }}
      />

      {/* Overlay Content */}
      <div
        className="relative z-10 h-full flex flex-col justify-end px-4 min-[834px]:px-8 min-[1440px]:px-16
 pb-6"
      >
        {/* Main Text */}
        <div className="">
          <h2 className="min-[1440px]:text-[64px] min-[834px]:text-[40px] font-semibold mb-2">
            Have Questions? We’ve Got Answers
          </h2>
          <p className="min-[834px]:text-[18px] text-gray-200">
            Quick Answers to Your Common Questions
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqHeroSection;
