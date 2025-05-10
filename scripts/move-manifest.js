import { existsSync, copyFileSync, mkdirSync } from "fs";
import { dirname } from "path";

const src = "./dist/client/.vite/manifest.json";
const dest = "./dist/client/manifest.json";

function waitForFile(filePath, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    function check() {
      if (existsSync(filePath)) {
        return resolve();
      }

      if (Date.now() - start > timeout) {
        return reject(
          new Error(`Timeout: ${filePath} not found after ${timeout}ms`)
        );
      }

      setTimeout(check, 100);
    }

    check();
  });
}

(async () => {
  try {
    await waitForFile(src);
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(src, dest);
    console.log("✅ Copied manifest.json to dist/client/");
  } catch (err) {
    console.error("❌ Failed to copy manifest.json:", err);
    process.exit(1);
  }
})();
