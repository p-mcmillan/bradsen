import React from "react";

const AboutUsLanding = () => {
  return (
    <main className="px-4 min-[834px]:px-8 min-[1440px]:px-16 min-[1440px]:py-12 min-[834px]:py-8 py-6 min-[1440px]:h-[843px] flex items-center justify-center">
      <div
        className="
    
     w-full
     mx-auto
     flex flex-col
     gap-8
     min-[1440px]:flex-row
     min-[1440px]:gap-16
   "
      >
        {/* Heading - Left on desktop */}
        <div className="min-[1440px]:w-full">
          <h4 className="text-[32px] min-[834px]:text-[40px] min-[1440px]:text-[64px] font-bold">
            About Us
          </h4>
        </div>

        {/* Content - Right on desktop */}
        <div className=" flex flex-col gap-8">
          {/* Paragraph */}
          <p className="text-base min-[834px]:text-[18px] leading-relaxed min-[1440px]:pt-8  ">
            We believe that finding the perfect property is more than just a
            transaction—it’s a life-changing journey. Since our inception, we
            have dedicated ourselves to transforming the way people buy, sell,
            and invest.
            <br />
            <br />
            With a focus on trust, innovation, and customer satisfaction, we aim
            to provide a seamless experience for every client. Whether you’re
            searching for your dream home, selling a beloved property, or
            investing in lucrative opportunities—our extensive portfolio spans
            residential, commercial, and investment properties.
          </p>

          {/* Images side by side */}
          <div className="flex flex-row justify-center gap-4 min-[834px]:flex-row min-[834px]:gap-6">
            <img
              src="https://onekindesign.com/wp-content/uploads/2014/07/Narrabundah-House-Adam-Dettrick-Architects-05-1-Kindesign.jpg"
              alt="house-image-1"
              loading="lazy"
              className="w-[170.5px] h-[136px] min-[834px]:w-[375px] min-[834px]:h-[334px] object-cover rounded-lg shadow-lg"
            />
            <img
              src="https://onekindesign.com/wp-content/uploads/2019/12/Pacific-Northwest-Style-House-Coates-Design-Architects-22-1-Kindesign.jpg"
              alt="house-image-2"
              loading="lazy"
              className="w-[170.5px] h-[136px] min-[834px]:w-[375px] min-[834px]:h-[334px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutUsLanding;
