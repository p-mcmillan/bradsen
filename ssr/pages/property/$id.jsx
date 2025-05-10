import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { listings, agentInfo } from "../../constants";
import ResponsiveCarousel from "../../components/ResponsiveCarousel";

export default function PropertyDetail() {
  const { id } = useParams();
  const listing = listings.find((l) => String(l.id) === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!listing) return <div className="p-8">Property not found.</div>;

  const { address, features, description, image } = listing;

  const { name, phone, agentImage } = agentInfo;

  const galleryImages = Object.values(image).map((url) => ({
    src: url,
    thumbnail: url,
  }));

  const rawPrice =
    typeof listing.price === "number"
      ? listing.price
      : Number(String(listing.price).replace(/[^\d.]/g, ""));
  const priceFormatted = rawPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const numericArea = Number(String(features.area).replace(/[^\d.]/g, ""));
  const pricePerSqFt = numericArea ? (rawPrice / numericArea).toFixed(2) : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-gray-800 m-16 ">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-4">
        Property / My House /{" "}
        <span className="text-black font-semibold">{listing.title}</span>
      </nav>

      {/* Hero image gallery */}

      <div className="p-6">
        <ResponsiveCarousel galleryImages={galleryImages} />
      </div>

      {/* Title and address */}
      <h1 className="text-xl font-semibold mb-1">{listing.title}</h1>
      <p className="flex items-center text-gray-600 text-sm mb-4">
        <ion-icon name="pin-outline" className="mr-1"></ion-icon>
        {address.street}, {address.city}, {address.province}
      </p>

      {/* Price & tags */}
      <div className="mb-4">
        <p className="text-2xl font-bold">{priceFormatted}</p>
        {pricePerSqFt && (
          <p className="text-xs text-gray-500">${pricePerSqFt}/sq ft</p>
        )}
      </div>

      {/* Feature icons */}
      <div className="grid grid-cols-3 gap-3 text-xs mb-6">
        <div>🛁 {features.baths} Baths</div>
        <div>🛏️ {features.beds} Beds</div>
        <div>📏 {features.area} Sq Ft</div>
        <div>🛋️ {features.kitchens} Living Room(s)</div>
        <div>🚗 {features.garages} Garage</div>
      </div>

      {/* Agent Card */}
      <div className="bg-gray-100 rounded-xl p-4 mb-6">
        <div className="flex items-center mb-4">
          <img
            src={agentImage}
            alt="Agent"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-gray-500 text-sm">{phone}</p>
          </div>
        </div>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-full text-sm">
            <ion-icon name="calendar-outline"></ion-icon> Schedule a Tour
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-black py-2 rounded-full text-sm">
            <ion-icon name="send-outline"></ion-icon> Contact {name}
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6 rounded-xl bg-gray-50 p-4">
        <h2 className="font-semibold mb-2">Property Description</h2>
        <p className="text-gray-700 text-sm whitespace-pre-line">
          {description}
        </p>
      </div>

      {/* Facts & Features */}
      <div className="mb-6 rounded-xl bg-gray-50 p-4">
        <h2 className="font-semibold mb-2">Facts & Features</h2>
        <p className="text-gray-700 text-sm mb-4">
          The essence of modern living meets timeless design in this
          meticulously crafted home. Every inch has been carefully considered to
          enhance your sense of comfort, convenience, and luxury.
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <strong>Style:</strong> {features.style}
          </div>
          <div>
            <strong>Year Built:</strong> {features.yearBuilt}
          </div>
          <div>
            <strong>Foundation:</strong> {features.foundation}
          </div>
          <div>
            <strong>Heating:</strong> {features.heating}
          </div>
          <div>
            <strong>Fireplace:</strong> {features.fireplace}
          </div>
          <div>
            <strong>Appliances:</strong>{" "}
            {features.appliancesIncluded.join(", ")}
          </div>
        </div>
      </div>

      {/* Location map */}
      <div className="mb-6 rounded-xl bg-gray-50 p-4">
        <h2 className="font-semibold mb-2">Property Location</h2>
        <a
          href={`https://maps.google.com/?q=${address.street}, ${address.city}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-black text-white text-sm rounded-full py-2 mb-4"
        >
          <ion-icon name="map-outline"></ion-icon>
          Open in Google Maps
        </a>
        <div className="text-xs text-gray-800 space-y-2">
          <p>
            <strong>Location</strong>
            <br />
            {address.street}
          </p>
          <p>
            <strong>City</strong>
            <br />
            {address.city}
          </p>
          <p>
            <strong>State</strong>
            <br />
            {address.province}
          </p>
          <p>
            <strong>Postal Code</strong>
            <br />
            {address.postalCode}
          </p>
          {/* <p>
            <strong>Area</strong>
            <br />
            
          </p> */}
          <p>
            <strong>Country</strong>
            <br />
            Canada
          </p>
        </div>
        <iframe
          title="Google Map"
          src={`https://maps.google.com/maps?q=${address.coordinates.latitude},${address.coordinates.longitude}&z=15&output=embed`}
          width="100%"
          height="250"
          className="rounded-lg mt-4"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
