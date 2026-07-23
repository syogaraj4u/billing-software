import { expect, test } from "@playwright/test";
import { fileURLToPath } from "node:url";

const fakeSupabasePath = fileURLToPath(new URL("./fixtures/fake-supabase.js", import.meta.url));

async function openTestApp(page) {
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  await page.route("**/vendor/supabase.js", route => route.fulfill({
    path: fakeSupabasePath,
    contentType: "text/javascript"
  }));
  await page.goto("/");
  await expect(page.locator("#loginGate")).toBeVisible();
  return pageErrors;
}

async function login(page) {
  await page.locator("#appLoginEmail").fill("browser-tests@example.com");
  await page.locator("#appLoginPassword").fill("test-password");
  await page.locator("#appLoginBtn").click();
  await expect(page.locator("#companySelector")).toBeVisible();
}

test("login recovery controls and eight-firm selector work", async ({ page }) => {
  const pageErrors = await openTestApp(page);
  await page.locator("#appForgotPasswordBtn").click();
  await expect(page.locator("#appForgotPasswordFields")).toBeVisible();
  await page.locator("#appBackToLoginBtn").click();
  await expect(page.locator("#appLoginFields")).toBeVisible();

  await login(page);
  await expect(page.locator(".company-card")).toHaveCount(8);
  await page.getByRole("button", { name: /Kala Nirvana/i }).click();
  await expect(page.locator("#appShell")).toBeVisible();
  await expect(page.locator("#activeCompanyName")).toContainText(/Kala Nirvana/i);
  expect(pageErrors).toEqual([]);
});

test("firm switching and sales dialog close controls work", async ({ page }) => {
  const pageErrors = await openTestApp(page);
  await login(page);
  await page.getByRole("button", { name: /Nirvana Solutions/i }).click();
  await expect(page.locator("#appShell")).toBeVisible();

  await page.locator('.nav-tab[data-view="sales"]').click();
  await page.locator("#newSaleBtn").click();
  await expect(page.locator("#entryDialog")).toBeVisible();
  await page.locator('#entryDialog [data-close-dialog="entryDialog"]', { hasText: "Cancel" }).click();
  await expect(page.locator("#entryDialog")).not.toBeVisible();

  await page.locator("#newSaleBtn").click();
  await expect(page.locator("#entryDialog")).toBeVisible();
  await page.locator('#entryDialog button[title="Close"]').click();
  await expect(page.locator("#entryDialog")).not.toBeVisible();

  await page.locator("#changeCompanyBtn").click();
  await expect(page.locator("#companySelector")).toBeVisible();
  await page.getByRole("button", { name: /Skanda Digitals/i }).click();
  await expect(page.locator("#activeCompanyName")).toContainText(/Skanda Digitals/i);
  expect(pageErrors).toEqual([]);
});

test("mobile dashboard and sales flow fit without horizontal overflow", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Mobile layout assertion");
  const pageErrors = await openTestApp(page);
  await login(page);
  await page.getByRole("button", { name: /Nirvana Solutions/i }).click();
  await expect(page.locator("#appShell")).toBeVisible();

  const dashboardOverflow = await page.evaluate(() => (
    document.documentElement.scrollWidth - document.documentElement.clientWidth
  ));
  expect(dashboardOverflow).toBeLessThanOrEqual(1);

  await page.locator('.nav-tab[data-view="sales"]').click();
  await page.locator("#newSaleBtn").click();
  await expect(page.locator("#entryDialog")).toBeVisible();
  const dialogOverflow = await page.evaluate(() => (
    document.documentElement.scrollWidth - document.documentElement.clientWidth
  ));
  expect(dialogOverflow).toBeLessThanOrEqual(1);
  await page.locator('#entryDialog button[title="Close"]').click();
  await expect(page.locator("#entryDialog")).not.toBeVisible();
  expect(pageErrors).toEqual([]);
});
