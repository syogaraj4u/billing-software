import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "staging-live.mjs",
  forbidOnly: true,
  retries: 1,
  workers: 1,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report-staging", open: "never" }]
  ],
  use: {
    baseURL: process.env.STAGING_BASE_URL || "https://billing.nirvanasolutions.in/staging/",
    ...devices["Desktop Chrome"],
    serviceWorkers: "block",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure"
  }
});
