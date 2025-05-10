import fs from "fs";
import path from "path";

const binDir = path.resolve("dist/bin");
const templatePath = path.resolve("scripts/server-template.js");
const outputPath = path.resolve("dist/app.js");

// 1. Find SSR handler file
const ssrFile = fs
  .readdirSync(binDir)
  .find((f) => f.startsWith("ssr-") && f.endsWith(".js"));
if (!ssrFile) throw new Error("❌ SSR file not found in dist/bin");

// 2. Read and patch template
const template = fs.readFileSync(templatePath, "utf-8");
const patched = template.replace("__SSR_HANDLER__", `./bin/${ssrFile}`);

// 3. Write to dist/app.js
fs.writeFileSync(outputPath, patched);
console.log(`✅ Generated dist/app.js using ${ssrFile}`);
