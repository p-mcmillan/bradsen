import { config } from "dotenv";

import dotenvExpand from "dotenv-expand";
dotenvExpand.expand(config());
import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import statusMonitor from "express-status-monitor";
import basicAuth from "express-basic-auth";

import compression from "compression";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import {
  contentSecurityPolicy,
  corsOptions,
} from "./server/middleware/security.js";

import { monitorOptions } from "./server/monitor/options.js";

import listingsRoutes from "./server/api/listings.js";
import generalEmailRoutes from "./server/api/email.js";
import agentEmailRoutes from "./server/api/email.js";
import syncRoutes from "./server/api/sync.js";
import adminRoutes from "./server/api/admin.js";

const statusAuth = basicAuth({
  users: { [process.env.MONITOR_USER]: process.env.MONITOR_PASS },
  challenge: true,
  realm: "Monitor Area",
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT;

// Monitoring & Security // Middleware
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(
  helmet({
    contentSecurityPolicy,
  })
);

app.use(cors(corsOptions));

const monitor = statusMonitor(monitorOptions);

app.use(monitor.middleware);
app.get("/status", statusAuth, monitor.pageRoute);

// Middleware
app.use(compression());

app.use(express.static("public"));

// Static assets
app.use(
  "/assets",
  express.static(path.join(__dirname, "dist/client/assets"), {
    maxAge: "1y",
    immutable: true,
  })
);

app.use(
  express.static(path.join(__dirname, "dist/client"), {
    extensions: ["js"],
  })
);

// API routes
app.use("/api", listingsRoutes);
app.use("/api", generalEmailRoutes);
app.use("/api", agentEmailRoutes);
app.use("/api", syncRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

//Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.get("/api/ping", (req, res) => {
  res
    .status(200)
    .json({ message: "pong", timestamp: new Date().toISOString() });
});

app.get("/api/uptime", (req, res) => {
  const seconds = process.uptime();
  const uptime = {
    seconds,
    minutes: Math.floor(seconds / 60),
    hours: Math.floor(seconds / 3600),
  };
  res.status(200).json({ uptime });
});

// SSR
const binDir = path.join(__dirname, "dist/bin");
const ssrFile = fs
  .readdirSync(binDir)
  .find((f) => f.startsWith("ssr-") && f.endsWith(".js"));

if (!ssrFile) {
  console.error("❌ Could not find SSR handler in dist/bin");
  process.exit(1);
}

const { h: handler } = await import(`./dist/bin/${ssrFile}`);
app.use(handler);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
