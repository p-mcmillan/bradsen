import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ResponsiveCarousel from "../../components/ResponsiveCarousel";
import { agentInfo } from "../../constants";

const fetchListings = async () => {
  const res = await fetch("/api/listings");
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
};

export default function PropertyDetail({ is404, setPageContext }) {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["listings"],
    queryFn: fetchListings,
  });

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">Error loading property</div>;

  const listing = data.find((item) => String(item.id) === id);

  // Inform SSR that this is a 404
  if (!listing && setPageContext) {
    setPageContext({ is404: true });
    return <div className="p-8">Property not found.</div>;
  }

  if (!listing) return <div className="p-8">Property not found.</div>;

  const {
    living_area,
    bedrooms_total,
    bathrooms_total_integer,
    parking_total,
    appliances = [],
    street_number,
    street_name,
    street_suffix,
    city,
    province,
    postal_code,
    latitude,
    longitude,
    photos_count,
    raw_data,
    list_price,
    description,
    year_built,
  } = listing;

  const imageGallery = (raw_data?.Media || [])
    .filter((m) => m.MediaCategory === "Property Photo")
    .map((m) => ({
      original: m.MediaURL,
      thumbnail: m.MediaURL,
    }));

  console.log("IMAGES", imageGallery);

  const rawPrice = parseFloat(list_price) || 0;
  const numericArea = parseFloat(living_area) || 0;
  const pricePerSqFt = numericArea ? (rawPrice / numericArea).toFixed(2) : null;

  const address = {
    street: `${street_number} ${street_name} ${street_suffix}`.trim(),
    city,
    province,
    postalCode: postal_code,
    coordinates: {
      latitude,
      longitude,
    },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-gray-800 m-16 ">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-4">
        Property / My House /{" "}
        <span className="text-black font-semibold">{address.street}</span>
      </nav>

      {/* Hero image gallery */}

      <div className="p-6">
        <ResponsiveCarousel galleryImages={imageGallery} />
      </div>

      {/* Title and address */}
      <h1 className="text-xl font-semibold mb-1">{address.street}</h1>
      <p className="text-gray-600 text-sm mb-4">
        {address.street}, {address.city}, {address.province}
      </p>

      {/* Price & tags */}
      <div className="mb-4">
        <p className="text-2xl font-bold">
          {rawPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        {pricePerSqFt && (
          <p className="text-xs text-gray-500">${pricePerSqFt}/sq ft</p>
        )}
      </div>

      {/* Feature icons */}
      <div className="grid grid-cols-3 gap-3 text-xs mb-6">
        <div>🛁 {bathrooms_total_integer} Baths</div>
        <div>🛏️ {bedrooms_total} Beds</div>
        <div>📏 {living_area} Sq Ft</div>
        <div>🛋️ 1 Kitchen</div>
        <div>🚗 {parking_total} Parking</div>
      </div>

      <div>
        <strong>Appliances:</strong> {appliances.join(", ")}
      </div>

      {/* Agent Card */}
      <div className="bg-gray-100 rounded-xl p-4 mb-6">
        <div className="flex items-center mb-4">
          <img
            src={agentInfo.agentImage}
            alt="Agent"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="font-semibold text-sm">{agentInfo.name}</p>
            <p className="text-gray-500 text-sm">{agentInfo.phone}</p>
          </div>
        </div>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-full text-sm">
            <ion-icon name="calendar-outline"></ion-icon> Schedule a Tour
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-black py-2 rounded-full text-sm">
            <ion-icon name="send-outline"></ion-icon> Contact {agentInfo.name}
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
        <div className="grid grid-cols-2 gap-2">
          <div>
            <strong>Style:</strong>{" "}
            {(listing.architectural_style || []).join(", ") || "N/A"}
          </div>
          <div>
            <strong>Year Built:</strong> {year_built || "N/A"}
          </div>
          <div>
            <strong>Foundation:</strong>{" "}
            {(listing.foundation_details || []).join(", ") || "N/A"}
          </div>
          <div>
            <strong>Heating:</strong>{" "}
            {(listing.heating || []).join(", ") || "N/A"}
          </div>
          <div>
            <strong>Fireplace:</strong> {listing.fireplaces_total ?? "N/A"}
          </div>
          <div>
            <strong>Appliances:</strong> {appliances.join(", ") || "N/A"}
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
          <p>
            {/* <strong>Area:</strong> {features?.area || "N/A"} */}
            <br />
          </p>
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
