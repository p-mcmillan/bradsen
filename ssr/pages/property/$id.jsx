import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ResponsiveCarousel from "../../components/ResponsiveCarousel";
import { agentInfo } from "../../constants";

const fetchListings = async () => {
  const res = await fetch("/api/listings", {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_PUBLIC_LISTINGS_TOKEN}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized or failed to fetch");
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

  if (!listing && setPageContext) {
    setPageContext({ is404: true });
    return <div className="p-8">Property not found.</div>;
  }
  if (!listing) return <div className="p-8">Property not found.</div>;

  const {
    street_number,
    street_name,
    street_suffix,
    city,
    province,
    postal_code,
    latitude,
    longitude,
    list_price,
    living_area,
    bedrooms_total,
    bathrooms_total_integer,
    parking_total,
    year_built,
    appliances = [],
    architectural_style = [],
    foundation_details = [],
    heating = [],
    fireplaces_total,
    pamphlet_url,
    raw_data,
    description,
  } = listing;

  const imageGallery = (raw_data?.Media || [])
    .filter((m) => m.MediaCategory === "Property Photo")
    .map((m) => ({
      original: m.MediaURL,
      thumbnail: m.MediaURL,
    }));

  const rawPrice = parseFloat(list_price) || 0;
  const numericArea = parseFloat(living_area) || 0;
  const pricePerSqFt = numericArea ? (rawPrice / numericArea).toFixed(2) : null;

  const address = `${street_number || ""} ${street_name || ""} ${
    street_suffix || ""
  }`.trim();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pt-32 text-gray-800">
      {/* Breadcrumb */}
      <div className="breadcrumbs">
        <ul>
          <li>
            <a>Property</a>
          </li>
          <li>
            <a>My House</a>
          </li>
          <li>{address}</li>
        </ul>
      </div>
      <div className="mb-6">
        <ResponsiveCarousel galleryImages={imageGallery} />
      </div>
      <div className="mb-4">
        <p className="text-2xl font-bold">
          {rawPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        {pricePerSqFt && (
          <p className=" text-gray-500">${pricePerSqFt}/sq ft</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {bedrooms_total && <div>🛏️ {bedrooms_total} Beds</div>}
        {bathrooms_total_integer && (
          <div>🛁 {bathrooms_total_integer} Baths</div>
        )}
        {living_area && <div>📏 {living_area} Sq Ft</div>}
        {parking_total && <div>🚗 {parking_total} Parking</div>}
        {year_built && <div>🏗️ Built in {year_built}</div>}
        {fireplaces_total != null && (
          <div>🔥 {fireplaces_total} Fireplaces</div>
        )}
      </div>
      {appliances.length > 0 && (
        <div className="mb-4">
          <strong>Appliances:</strong> {appliances.join(", ")}
        </div>
      )}
      {pamphlet_url && (
        <div className="mb-4">
          <a
            // href={pamphlet_url}
            download
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            📄 Download Pamphlet
          </a>
        </div>
      )}
      {description && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Property Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{description}</p>
        </div>
      )}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Facts & Features</h2>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <strong>Style:</strong> {architectural_style.join(", ") || "N/A"}
          </div>
          <div>
            <strong>Foundation:</strong>{" "}
            {foundation_details.join(", ") || "N/A"}
          </div>
          <div>
            <strong>Heating:</strong> {heating.join(", ") || "N/A"}
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Location</h2>
        <p className=" text-gray-600 mb-2">
          {address}, {city}, {province}, {postal_code}, Canada
        </p>
        <iframe
          title="Google Map"
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
          width="100%"
          height="250"
          className="rounded-lg"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
