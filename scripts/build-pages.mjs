import { access, copyFile, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

function argument(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? resolve(root, args[index + 1]) : fallback;
}

const output = argument("--output", resolve(root, "dist/pages"));
const productionSource = argument("--production-source", root);
const stagingSource = argument("--staging-source", productionSource);
const includeStaging = args.includes("--include-staging");

const publicFiles = [
  "app.js",
  "cloud-config.js",
  "desktop-view.css",
  "icon.svg",
  "index.html",
  "manifest.webmanifest",
  "mobile-view.css",
  "service-worker.js",
  "styles.css",
  "tally-sync.js"
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function copyApplication(source, destination, { cname = false } = {}) {
  await mkdir(destination, { recursive: true });
  for (const file of publicFiles) {
    await copyFile(resolve(source, file), resolve(destination, file));
  }
  await cp(resolve(source, "assets"), resolve(destination, "assets"), { recursive: true });
  await writeFile(resolve(destination, ".nojekyll"), "", "utf8");
  if (cname && await exists(resolve(source, "CNAME"))) {
    await copyFile(resolve(source, "CNAME"), resolve(destination, "CNAME"));
  }
}

function stagingConfig() {
  const supabaseUrl = String(process.env.STAGING_SUPABASE_URL || "").trim();
  const supabaseAnonKey = String(process.env.STAGING_SUPABASE_ANON_KEY || "").trim();
  return `window.CLOUD_CONFIG = ${JSON.stringify({
    environment: "staging",
    supabaseUrl,
    supabaseAnonKey
  }, null, 2)};
document.documentElement.dataset.appEnvironment = "staging";
`;
}

async function makeStagingPrivate(destination) {
  const indexPath = resolve(destination, "index.html");
  const index = await readFile(indexPath, "utf8");
  const noIndex = '<meta name="robots" content="noindex, nofollow">';
  await writeFile(
    indexPath,
    index.replace('<meta name="theme-color" content="#142223">', `<meta name="theme-color" content="#142223">\n  ${noIndex}`),
    "utf8"
  );
  await writeFile(resolve(destination, "cloud-config.js"), stagingConfig(), "utf8");
}

await rm(output, { recursive: true, force: true });
await copyApplication(productionSource, output, { cname: true });

if (includeStaging) {
  const source = await exists(resolve(stagingSource, "index.html")) ? stagingSource : productionSource;
  const stagingOutput = resolve(output, "staging");
  await copyApplication(source, stagingOutput);
  await makeStagingPrivate(stagingOutput);
  const configured = Boolean(process.env.STAGING_SUPABASE_URL && process.env.STAGING_SUPABASE_ANON_KEY);
  console.log(`Staging site built at ${stagingOutput}${configured ? "" : " (Supabase secrets not configured yet)"}`);
}

console.log(`GitHub Pages site built at ${output}`);
