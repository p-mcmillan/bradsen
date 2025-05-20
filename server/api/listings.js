import express from "express";
import { pool } from "../db/db.js";

const router = express.Router();

const tokenAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.split(" ")[1];

  // console.log("🔐 Auth Header:", auth);
  // console.log("🔐 Parsed Token:", token);
  // console.log("🔐 Expected Token:", process.env.LISTINGS_API_TOKEN);

  if (!token || token !== process.env.LISTINGS_API_TOKEN) {
    console.warn("❌ Unauthorized access attempt");
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
router.get("/listings", tokenAuth, async (req, res) => {
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
