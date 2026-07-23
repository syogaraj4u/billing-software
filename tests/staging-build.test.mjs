import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { access, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import test from "node:test";

const execFileAsync = promisify(execFile);
const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));

test("staging build replaces production cloud config and remains non-indexed", async () => {
  const temporaryRoot = await mkdtemp(resolve(tmpdir(), "billing-pages-test-"));
  const output = resolve(temporaryRoot, "pages");
  try {
    await execFileAsync(process.execPath, [
      resolve(projectRoot, "scripts/build-pages.mjs"),
      "--output",
      output,
      "--include-staging"
    ], {
      cwd: projectRoot,
      env: {
        ...process.env,
        STAGING_SUPABASE_URL: "https://staging-example.supabase.co",
        STAGING_SUPABASE_ANON_KEY: "staging-public-key"
      }
    });

    const productionConfig = await readFile(resolve(output, "cloud-config.js"), "utf8");
    const stagingConfig = await readFile(resolve(output, "staging/cloud-config.js"), "utf8");
    const stagingIndex = await readFile(resolve(output, "staging/index.html"), "utf8");
    assert.match(productionConfig, /exnqqnsprxzuonoztqja/);
    assert.doesNotMatch(stagingConfig, /exnqqnsprxzuonoztqja/);
    assert.match(stagingConfig, /staging-example\.supabase\.co/);
    assert.match(stagingIndex, /noindex, nofollow/);
    await access(resolve(output, "CNAME"));
    await assert.rejects(access(resolve(output, "staging/CNAME")));
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});
