const PropertyCard = ({ listing }) => {
  const imagesObj = listing.image ?? {};
  const targetFile = '1777 Caledonia-18.webp';

  const matchedKey = Object.keys(imagesObj).find((key) =>
    key.endsWith(targetFile)
  );

  const imageUrl = matchedKey ? imagesObj[matchedKey] : null;

  return (
    <div className="mb-6 bg-white rounded-xl shadow p-3 max-w-">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={listing.title}
          loading="lazy"
          className="w-full h-[180px] object-cover rounded-md"
        />
        <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-full shadow">
          For Sale
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">{listing.title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {listing.address?.street}, {listing.address?.city}
        </p>
        <div className="flex justify-between text-sm mt-3 text-gray-700">
          <span>🛏️ {listing.features?.beds} Beds</span>
          <span>🛁 {listing.features?.baths} Baths</span>
          <span>📐 {listing.features?.area} sq</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
