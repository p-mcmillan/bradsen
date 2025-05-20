import { getAccessToken, fetchProperties } from "../services/ddf.js";
import { upsertListing } from "../db/listings.js";

export const syncDDFListings = async () => {
  try {
    const token = await getAccessToken();
    const listings = await fetchProperties(token);

    let count = 0;
    for (const listing of listings) {
      try {
        await upsertListing(listing);
        count++;
      } catch (err) {
        console.error(`❌ Failed to upsert listing ID ${listing.ListingId}`);
        console.error("Error message:", err.message);
      }
    }

    console.log(`✅ Successfully synced ${count}/${listings.length} listings`);
    return { success: true, count };
  } catch (error) {
    console.error("❌ Sync failed:", error.message);
    throw error;
  }
};

// 🔁 Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  syncDDFListings();
}
