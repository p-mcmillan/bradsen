import express from "express";
import basicAuth from "express-basic-auth";
import { syncDDFListings } from "../jobs/sync.js";

const router = express.Router();

const authMiddleware = basicAuth({
  users: { [process.env.SYNC_USER]: process.env.SYNC_PASS },
  challenge: true,
  realm: "Sync Area",
});

router.get("/sync-ddf", authMiddleware, async (req, res) => {
  console.log("🚀 /api/sync-ddf route hit");

  try {
    const result = await syncDDFListings();
    res.status(200).json({
      message: "✅ Sync complete",
      count: result.count,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message || "Failed to sync DDF listings",
    });
  }
});

export default router;
//
