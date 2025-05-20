import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard";

const fetchListings = async () => {
  const res = await fetch("/api/listings");
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
};

const PropertyList = () => {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["listings"],
    queryFn: fetchListings,
  });

  return (
    <div className="px-4 min-[834px]:px-8 min-[1440px]:px-16 min-[1440px]:py-12 min-[834px]:py-8 py-6 ">
      <div className="grid grid-cols-1 min-[834px]:grid-cols-2 min-[1440px]:grid-cols-3 gap-6">
        {/* Render Property Cards */}
        {data.map((listing) => (
          <Link key={listing.id} to={`/property/${listing.id}`}>
            <PropertyCard key={listing.id} listing={listing} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
