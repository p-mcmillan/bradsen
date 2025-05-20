import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function getAccessToken() {
  const res = await axios.post(
    "https://identity.crea.ca/connect/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.DDF_CLIENT_ID,
      client_secret: process.env.DDF_CLIENT_SECRET,
      scope: "DDFApi_Read",
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
  return res.data.access_token;
}

export async function fetchProperties(token) {
  const res = await axios.get("https://ddfapi.realtor.ca/odata/v1/Property", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.value;
}
