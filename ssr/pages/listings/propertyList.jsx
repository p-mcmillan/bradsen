import React from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard";
import { listings } from "../../constants/index";

const PropertyList = () => {
  return (
    <div className="px-4 min-[834px]:px-8 min-[1440px]:px-16 min-[1440px]:py-12 min-[834px]:py-8 py-6 ">
      <div className="grid grid-cols-1 min-[834px]:grid-cols-2 min-[1440px]:grid-cols-3 gap-6">
        {/* Render Property Cards */}
        {listings.map((listing) => (
          <Link key={listing.id} to={`/property/${listing.id}`}>
            <PropertyCard key={listing.id} listing={listing} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
