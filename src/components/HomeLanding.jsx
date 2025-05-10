import * as React from "react";
import { HomeHeading } from "./HomeHeading";
import PropertyCard from "./PropertyCard";
import { backgroundImages } from "../../ssr/constants/index";

function HomeLanding() {
  return (
    // <main className="relative flex flex-col h-[1037px] bg-black overflow-hidden min-[834px]:h-[1194px] min-[1440px]:w-screen ">
    <main className="relative flex flex-col min-h-screen w-screen bg-black overflow-hidden">
      {/* Fluid background image */}
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-[48.5%_center] 
             bg-cover min-[1440px]:bg-cover -0 min-[1440px]:w-screen"
        style={{ backgroundImage: `url(${backgroundImages.landing02})` }}
      />

      <div className="absolute top-[15vh] min-[1440px]:top-[5vh] left-0 min-[1440px]:left-[-30px] w-full flex justify-center z-10 pointer-events-none">
        <h1 className="text-[120px] min-[834px]:text-[150px] font-bold text-[#f8f9fb] leading-none whitespace-nowrap ">
          BRADSEN
        </h1>
      </div>
      {/* Optional fade mask image on top */}
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-[48.5%_center] 
             bg-cover min-[1440px]:bg-cover z-20 min-[1440px]:w-screen"
        style={{ backgroundImage: `url(${backgroundImages.landing01})` }}
      />

      {/* Content container */}

      <section className="relative z-30 mt-auto mb-6 min-[834px]:mb-8 px-4 sm:px-8 lg:px-16">
        <div className="flex flex-row justify-between items-start max-[833px]:flex-col gap-8 max-w-[1440px] mx-auto">
          <div className="flex-1">
            <HomeHeading />
          </div>
          <div className="flex-1 flex justify-end pt-[21px]">
            <PropertyCard />
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomeLanding;
