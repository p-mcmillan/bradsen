import express from "express";
import { pool } from "../db/db.js";

const router = express.Router();

router.get("/listings", async (req, res) => {
  console.time("fetchListings");
  try {
    const { rows } = await pool.query(
      "SELECT * FROM listings ORDER BY modification_timestamp DESC LIMIT 50"
    );
    res.json(rows);
    console.timeEnd("fetchListings");
  } catch (err) {
    console.error("❌ Error fetching listings:", err);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});
export default router;
