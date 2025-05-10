import React from "react";
import { backgroundImages } from "../../constants/index";

const HeroAboutSection = () => {
  return (
    <section className="relative flex flex-col h-screen max-h-[664px] w-full text-white bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-100"
        style={{
          backgroundImage: `url(${backgroundImages.aboutUs})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full py-4 px-4 min-[834px]:px-8 min-[1440px]:px-16">
        {/* Header */}

        {/* About Us Section */}
        <div className=" relative mt-auto flex flex-col min-[834px]:flex-row min-[834px]:justify-between">
          <h1
            className="
             font-bold min-[834px]:text-[32px] min-[1440px]:text-[64px]  "
          >
            About Me
          </h1>

          <p className="text-gray-200 leading-relaxed min-[1440px]:w-[602px] min-[834px]:w-[550px] min-[834px]:text-[18px] ">
            Our reputation stands on trust, expertise, and unparalleled service
            in the real estate market. Our team combines deep local market
            knowledge with innovative technology to deliver exceptional results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroAboutSection;
