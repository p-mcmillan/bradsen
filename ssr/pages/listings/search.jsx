import React from "react";
import { backgroundImages } from "../../constants/index";

const SearchSection = () => {
  return (
    <section className="relative h-[664px] bg-cover bg-center flex items-center justify-center text-white ">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-60"
        style={{
          backgroundImage: `url(${backgroundImages.listings})`,
        }}
      />

      <div className="relative z-10 w-full min-[834px]:w-[576px] min-[1440px]:w-[1000px] text-center">
        <h4 className="mb-2 min-[1440px]:text-[64px] min-[834px]:text-[40px]">
          Find Your Perfect Home
        </h4>
        <p className=" mb-6 min-[834px]:text-[18px]">
          Be the first to see what’s just hit the market. Fresh opportunities
          await as we bring you the latest properties.
        </p>
      </div>
    </section>
  );
};

export default SearchSection;
