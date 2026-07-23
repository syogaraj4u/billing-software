import { expect, test } from "@playwright/test";

test("deployed staging login and all company selectors work", async ({ page }) => {
  const email = process.env.STAGING_TEST_EMAIL;
  const password = process.env.STAGING_TEST_PASSWORD;
  if (!email || !password) throw new Error("Staging test credentials are not configured");

  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  await page.goto("./");
  await expect(page.locator("html")).toHaveAttribute("data-app-environment", "staging");
  await expect(page.locator("#loginGate")).toBeVisible();
  await page.locator("#appLoginEmail").fill(email);
  await page.locator("#appLoginPassword").fill(password);
  await page.locator("#appLoginBtn").click();
  await expect(page.locator("#companySelector")).toBeVisible();
  await expect(page.locator(".company-card")).toHaveCount(8);

  const companies = [
    "Nirvana Solutions",
    "Kala Nirvana",
    "Lakshmi Jeyapandi Traders",
    "Skanda Digitals",
    "Khairanya Infotech",
    "Sri Lakshmi Digitals",
    "Shiva Nandi Communications",
    "Hari Hara"
  ];
  for (const company of companies) {
    await page.getByRole("button", { name: new RegExp(company, "i") }).click();
    await expect(page.locator("#appShell")).toBeVisible();
    await expect(page.locator("#activeCompanyName")).toContainText(new RegExp(company, "i"));
    if (company !== companies.at(-1)) {
      await page.locator("#changeCompanyBtn").click();
      await expect(page.locator("#companySelector")).toBeVisible();
    }
  }
  expect(pageErrors).toEqual([]);
});
