import React from "react";
import { agentInfo } from "../../constants";
import ContactUsForm from "../../components/ContactUsForm";
const { phoneLink, phone, brokerage, email } = agentInfo;

const ContactUsSection = () => {
  return (
    <section className=" mx-auto pb-6  min-[1440px]:pt-6 text-[#1a1a1a] px-4 min-[834px]:px-8 min-[1440px]:px-16">
      <div className="flex flex-col justify-between gap-4 min-[1440px]:flex-row">
        <div className="min-[1440px]:w-[628px]">
          {/* Header */}
          <h2 className="font-bold mb-2 min-[834px]:text-[40px] min-[1440px]:text-[64px] leading-tight">
            Contact Our Real Estate Experts
          </h2>
          <p className=" text-gray-600 mb-4 min-[834px]:text-[18px]">
            If you're looking for your dream home, need help selling your
            property, or simply have questions about the market, our team is
            here to assist you.
          </p>
          {/* Benefits */}
          <ul className="space-y-3 mb-6 min-[834px]:text-[18px]">
            <li className="flex items-start gap-2">
              <span className="text-green-500 ">✓</span>
              <p>Explore properties tailored to your needs</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 ">✓</span>
              <p>Get expert advice on buying, selling, or renting</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 ">✓</span>
              <p>Access exclusive market insights and opportunities</p>
            </li>
          </ul>
        </div>

        <ContactUsForm />
      </div>
      {/* Location */}
      <h3 className="font-semibold mb-2 min-[834px]:text-[40px] min-[1440px]:text-[64px]">
        Location
      </h3>

      <div className="w-full max-w-[1344px] mx-auto">
        <div className="flex flex-col justify-center gap-4 min-[1440px]:flex-row">
          {/* Map */}
          <div className="rounded-lg overflow-hidden mb-6 flex-1">
            <iframe
              title="Google Map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                `${brokerage.address.street}, ${brokerage.address.city}, ${brokerage.address.province}, ${brokerage.address.country}`
              )}&z=15&output=embed`}
              width="100%"
              height="100%"
              className="rounded-lg mt-4"
              loading="lazy"
            />
          </div>

          {/* Contact Info */}
          <div className="text-gray-700 flex-1">
            <div className="bg-white rounded-xl shadow p-4 mb-6">
              <p className="font-semibold">📞 Call Us</p>
              <a href={`tel:${phoneLink}`}>{phone}</a>
            </div>
            <div className="bg-white rounded-xl shadow p-4 mb-6">
              <p className="font-semibold">📍 Visit Us</p>
              <p>
                {brokerage.address.street}, {brokerage.address.city},{" "}
                {brokerage.address.province} {brokerage.address.postalCode}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 mb-6">
              <p className="flex items-center font-semibold mb-2">
                <span className="text-xl mr-2">✉️</span> Email
              </p>
              <div className="text-gray-600 space-y-1">
                <p>{email}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 mb-6">
              <p className="font-semibold">🕐 Office Hours</p>
              <p>Mon–Fri: 9:00 AM – 6:00 PM</p>
              <p>Sat: 10:00 AM – 4:00 PM</p>
              <p>Sun: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
