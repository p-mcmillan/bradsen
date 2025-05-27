import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminListingsPage() {
  const [listings, setListings] = useState([]);
  const [syncStatus, setSyncStatus] = useState(null); // 👈 status feedback
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/admin/listings")
      .then((res) => {
        if (res.status === 401) {
          setUnauthorized(true);
          throw new Error("Unauthorized");
        }
        if (
          !res.ok ||
          !res.headers.get("content-type")?.includes("application/json")
        ) {
          throw new Error("Invalid API response");
        }
        return res.json();
      })
      .then(setListings)
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="mt-48 text-center">Loading...</div>;
  }

  if (unauthorized) {
    return (
      <div className="mt-48 text-center text-red-600 font-bold">
        Unauthorized. Refresh the page and enter admin credentials.
      </div>
    );
  }

  const handleSync = async () => {
    setSyncStatus("syncing");

    const res = await fetch("/api/sync-ddf", {
      headers: {
        Authorization: `Basic ${btoa(
          `${import.meta.env.VITE_SYNC_USER}:${import.meta.env.VITE_SYNC_PASS}`
        )}`,
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setSyncStatus(`error: ${err?.error || "Failed to sync"}`);
    } else {
      const result = await res.json();
      setSyncStatus(`✅ Synced ${result.count} listings`);
      await fetchListings(); // refresh listings
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Sold" ? "For Sale" : "Sold";
    const res = await fetch(`/api/admin/listings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          `${import.meta.env.VITE_ADMIN_USER}:${
            import.meta.env.VITE_ADMIN_PASS
          }`
        )}`,
      },
      body: JSON.stringify({ listing_status: newStatus }),
    });

    if (res.ok) {
      setListings((prev) =>
        prev.map((l) => (l.id === id ? { ...l, listing_status: newStatus } : l))
      );
    } else {
      console.error("Failed to update status");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto mt-36 mb-12">
      <h1 className="text-2xl font-bold mb-4">Admin Listings Panel</h1>
      <div className="flex items-center gap-4 mb-4">
        {" "}
        <button
          onClick={() => navigate("/admin/create")}
          className=" bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          + New Listing
        </button>
        <button
          onClick={handleSync}
          className="bg-purple-600 text-white px-4 py-2 rounded shadow"
        >
          🔄 Sync DDF Listings
        </button>
        {syncStatus && <span className="">{syncStatus}</span>}
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Address</th>
            <th className="p-2">City</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((l) => (
            <tr key={l.id} className="border-t">
              <td className="p-2">{l.unparsed_address}</td>
              <td className="p-2">{l.city}</td>
              <td className="p-2">{l.listing_status}</td>
              <td className="p-2 space-x-2">
                <button
                  className="text-blue-600"
                  onClick={() => toggleStatus(l.id, l.listing_status)}
                >
                  Toggle Status
                </button>
                <button
                  onClick={() => navigate(`/admin/edit/${l.id}`)}
                  className="text-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteListing(l.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export const metadata = {
  title: "Admin Listings",
  description: "Manage your property listings",
};
