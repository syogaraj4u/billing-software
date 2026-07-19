import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assets = resolve(root, "assets");

await mkdir(assets, { recursive: true });
await sharp(resolve(root, "resources/icon.svg"))
  .resize(1024, 1024)
  .png()
  .toFile(resolve(assets, "icon-only.png"));
await sharp(resolve(root, "resources/splash.svg"))
  .resize(2732, 2732)
  .png()
  .toFile(resolve(assets, "splash.png"));

console.log("Generated mobile source icon and splash assets");
