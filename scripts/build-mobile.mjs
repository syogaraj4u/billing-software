import { access, copyFile, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "mobile/www");
const vendorOutput = resolve(output, "vendor");

const applicationFiles = [
  "app.js",
  "cloud-config.js",
  "desktop-view.css",
  "icon.svg",
  "manifest.webmanifest",
  "mobile-view.css",
  "service-worker.js",
  "styles.css",
  "tally-sync.js"
];

const vendorFiles = [
  {
    name: "lucide.min.js",
    candidates: ["node_modules/lucide/dist/umd/lucide.min.js"]
  },
  {
    name: "supabase.js",
    candidates: [
      "node_modules/@supabase/supabase-js/dist/umd/supabase.js",
      "node_modules/@supabase/supabase-js/dist/umd/supabase.min.js"
    ]
  },
  {
    name: "exceljs.min.js",
    candidates: ["node_modules/exceljs/dist/exceljs.min.js"]
  },
  {
    name: "pdf.min.mjs",
    candidates: ["node_modules/pdfjs-dist/build/pdf.min.mjs"]
  },
  {
    name: "pdf.worker.min.mjs",
    candidates: ["node_modules/pdfjs-dist/build/pdf.worker.min.mjs"]
  }
];

async function firstExisting(candidates) {
  for (const candidate of candidates) {
    const source = resolve(root, candidate);
    try {
      await access(source);
      return source;
    } catch {
      // Try the next supported package layout.
    }
  }
  throw new Error(`Required mobile dependency file is missing: ${candidates.join(" or ")}`);
}

await rm(output, { recursive: true, force: true });
await mkdir(vendorOutput, { recursive: true });

for (const file of applicationFiles) {
  await copyFile(resolve(root, file), resolve(output, file));
}

await cp(resolve(root, "assets/logos"), resolve(output, "assets/logos"), {
  recursive: true
});

for (const vendor of vendorFiles) {
  await copyFile(await firstExisting(vendor.candidates), resolve(vendorOutput, vendor.name));
}

await build({
  entryPoints: [resolve(root, "mobile/native-bridge-entry.js")],
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["safari15", "chrome100"],
  minify: true,
  outfile: resolve(output, "native-bridge.js")
});

let index = await readFile(resolve(root, "index.html"), "utf8");
index = index
  .replace("https://unpkg.com/lucide@latest/dist/umd/lucide.min.js", "./vendor/lucide.min.js")
  .replace("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2", "./vendor/supabase.js")
  .replace("https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js", "./vendor/exceljs.min.js")
  .replace("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs", "./vendor/pdf.min.mjs")
  .replace(
    '<script src="cloud-config.js?v=20260626-cloud"></script>',
    '<script src="./native-bridge.js"></script>\n  <script src="cloud-config.js?v=20260626-cloud"></script>'
  );
await writeFile(resolve(output, "index.html"), index, "utf8");

console.log(`Mobile web assets built at ${output}`);
