"use client";
import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const images = [
  "https://as2.ftcdn.net/v2/jpg/04/73/72/11/1000_F_473721132_I9LNMCvx7Du6EdJNH91EywcNHzgtEclz.jpg",
  "https://as2.ftcdn.net/v2/jpg/04/62/81/03/1000_F_462810332_YCLTHJnoAguHv1Zuh5LsfnMTgL4QqkDj.jpg",
  "https://as1.ftcdn.net/v2/jpg/01/07/15/04/1000_F_107150476_KXeV3O5D6OFj3nr1e0G9IT6VhlYlw2Y7.jpg",
  "https://as1.ftcdn.net/v2/jpg/00/64/74/76/1000_F_64747679_kIHp9yHHRQpihAVAp2tsOunbiqKRhflI.jpg",
];

const PropertyCard = () => {
  return (
    <div className="card bg-transparent shadow-none w-[173px]  min-[834px]:w-[331px] ">
      <div className="card-body text-center p-0 ">
        <h6 className="card-title text-[16px] min-[834px]:text-[24px] text-[#f8f9fb]">
          Family House Luxury
        </h6>

        <figure className="">
          <Swiper
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="rounded-lg custom-swiper"
          >
            {images.map((src, i) => (
              <SwiperSlide key={i}>
                <img
                  src={src}
                  alt={`slide-${i}`}
                  loading="lazy"
                  className="object-cover w-[172px] h-[124px] min-[834px]:w-[331px] min-[834px]:h-[240px] rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </figure>

        <div className="card-actions mt-2">
          <Link to="/listings">
            <button className="bg-white text-[#0d0d12] w-[173px] h-[32px] min-[834px]:w-[331px] rounded-[64px]">
              Explore Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
