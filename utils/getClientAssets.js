// utils/getClientAssets.js
import fs from "fs";
import path from "path";

// Resolve manifest path from current working directory
const manifestPath = path.resolve("dist/client/.vite/manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

export function getClientAssets(entryPoint = ".ssr/entryClient.jsx") {
  const entry = manifest[entryPoint];
  if (!entry) return { styles: "", scripts: "" };

  const seen = new Set();

  function collectImports(file) {
    const chunk = manifest[file];
    if (!chunk || seen.has(file)) return [];
    seen.add(file);

    const imports = (chunk.imports || []).flatMap(collectImports);
    return [...imports, chunk];
  }

  const chunks = collectImports(entryPoint);

  const styles = [...(entry.css || []), ...chunks.flatMap((c) => c.css || [])]
    .map((href) => `<link rel="stylesheet" href="/${href}" />`)
    .join("\n");

  const preloadLinks = chunks
    .filter((c) => c.file.endsWith(".js"))
    .map((c) => `<link rel="modulepreload" href="/${c.file}" />`)
    .join("\n");

  const mainScript = `<script type="module" src="/${entry.file}"></script>`;

  return {
    styles,
    scripts: preloadLinks + "\n" + mainScript,
  };
}
