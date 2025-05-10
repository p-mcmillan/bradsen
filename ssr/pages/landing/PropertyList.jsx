import React from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard";
import { listings } from "../../constants/index";

const PropertyList = () => {
  return (
    <div className="px-4 min-[834px]:px-8 min-[1440px]:px-16 min-[1440px]:py-12 min-[834px]:py-8 py-6 mx-auto">
      <h1 className="font-semibold text-center mb-6 text-[24px] min-[834px]:text-[40px] max-w-[709px] mx-auto">
        Turning Your Real Estate Dreams Into Reality
      </h1>

      {/* Filter tabs (non-functional for now) */}
      <div className="flex justify-center space-x-2 mb-6 bg-gray-100 rounded-full p-2 text-sm">
        <Link
          to="/listings"
          className="bg-white px-4 py-1 rounded-full shadow inline-block text-center"
        >
          All Properties
        </Link>
        {/* <button>For Rent</button>
        <button>For Sale</button>
        <button>For Buy</button> */}
      </div>

      {/* Render Property Cards */}
      <div className="grid grid-cols-1 min-[834px]:grid-cols-2 min-[1440px]:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Link key={listing.id} to={`/property/${listing.id}`}>
            <PropertyCard listing={listing} />
          </Link>
        ))}
      </div>

      {/* Footer */}
      <p className="text-sm text-center mt-8 px-4 text-gray-600">
        Passionate about connecting people with their dream properties, we
        combine expertise and integrity
      </p>
      <div className="text-center mt-4">
        <button className="border border-black px-6 py-2 rounded-full mt-2 hover:bg-black hover:text-white transition">
          See Details
        </button>
      </div>
    </div>
  );
};

export default PropertyList;
