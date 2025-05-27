// server/routes/admin.js
import express from "express";
import basicAuth from "express-basic-auth";

import { pool } from "../db/db.js";

const router = express.Router();

// Basic token-based middleware (simple)
const authMiddleware = basicAuth({
  users: { [process.env.ADMIN_USER]: process.env.ADMIN_PASS },
  challenge: true,
});
router.use(authMiddleware);

// Get all listings
router.get("/listings", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM listings ORDER BY created_at DESC"
  );
  res.json(rows);
});

// Get a single listing
router.get("/listings/:id", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM listings WHERE id = $1", [
    req.params.id,
  ]);
  res.json(rows[0]);
});

// Create a new listing
router.post("/listings", async (req, res) => {
  const { unparsed_address, city, listing_status = "For Sale" } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO listings (unparsed_address, city, listing_status) VALUES ($1, $2, $3) RETURNING *`,
    [unparsed_address, city, listing_status]
  );
  res.json(rows[0]);
});

// Update a listing
router.patch("/listings/:id", async (req, res) => {
  const fields = Object.keys(req.body);
  const values = Object.values(req.body);
  const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
  const query = `UPDATE listings SET ${setClause}, updated_at = NOW() WHERE id = $${
    fields.length + 1
  } RETURNING *`;

  const { rows } = await pool.query(query, [...values, req.params.id]);
  res.json(rows[0]);
});

// Delete a listing
router.delete("/listings/:id", async (req, res) => {
  await pool.query("DELETE FROM listings WHERE id = $1", [req.params.id]);
  res.json({ success: true });
});

export default router;
