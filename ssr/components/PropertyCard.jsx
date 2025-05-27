const PropertyCard = ({ listing }) => {
  const media = listing.raw_data?.Media || [];

  const imageUrl =
    media.length > 0
      ? typeof media[0] === "string"
        ? media[0]
        : media[0]?.MediaURL || media[0]?.url || "/fallback.jpg"
      : "/fallback.jpg";
  return (
    <div className="mb-6 bg-white rounded-xl shadow p-3">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={listing.unparsed_address || "Listing image"}
          loading="lazy"
          className="w-full h-[180px] object-cover rounded-md"
        />
        <span
          className={`absolute top-2 left-2 px-2 py-1 rounded-full shadow
    ${
      listing.listing_status === "Sold"
        ? "bg-red-600 text-white"
        : "bg-white text-black"
    }
  `}
        >
          {listing.listing_status || "For Sale"}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">
          {listing.unparsed_address || "Unnamed Property"}
        </h3>
        <p className="text-gray-600 mt-1">
          {listing.city}, {listing.province}
        </p>
        <div className="flex justify-between mt-3 text-gray-700">
          <span>🛏️ {listing.bedrooms_total || 0} Beds</span>
          <span>🛁 {listing.bathrooms_total_integer || 0} Baths</span>
          <span>📐 {listing.living_area || "—"} sq ft</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
