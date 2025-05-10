import { execSync } from "child_process";
import { existsSync, copyFileSync } from "fs";
import { resolve } from "path";

console.log("🛠 Building client + server...");
execSync("vite build", { stdio: "inherit" });

const srcManifest = resolve("dist/client/.vite/manifest.json");
const destManifest = resolve("dist/client/manifest.json");

if (!existsSync(srcManifest)) {
  console.error(`❌ Source manifest not found: ${srcManifest}`);
  process.exit(1);
}

try {
  copyFileSync(srcManifest, destManifest);
  console.log("✅ Copied manifest.json from .vite/ to dist/client/");
} catch (e) {
  console.error("❌ Failed to copy manifest.json:", e);
  process.exit(1);
}

// scripts/full-build.js
// import { execSync } from "child_process";
// import { existsSync, copyFileSync, mkdirSync } from "fs";
// import { resolve, dirname } from "path";

// console.log("🛠 Building client...");
// execSync("vite build", { stdio: "inherit" });

// const srcManifest = resolve("dist/client/.vite/manifest.json");
// const destManifest = resolve("dist/client/manifest.json");

// if (!existsSync(srcManifest)) {
//   console.error(`❌ Source manifest not found: ${srcManifest}`);
//   process.exit(1);
// }

// try {
//   mkdirSync(dirname(destManifest), { recursive: true });
//   copyFileSync(srcManifest, destManifest);
//   console.log("✅ Copied manifest.json from .vite/ to dist/client/");
// } catch (e) {
//   console.error("❌ Failed to copy manifest.json:", e);
//   process.exit(1);
// }

// console.log("🚀 Building server...");
// execSync("vite build --config vite.config.server.ts", { stdio: "inherit" });
// console.log("✅ Server build complete.");

// // Optional: auto-start server after build
// if (process.argv.includes("--start")) {
//   console.log("▶️ Starting production server...");
//   execSync("node dist/app.js", { stdio: "inherit" });
// }
