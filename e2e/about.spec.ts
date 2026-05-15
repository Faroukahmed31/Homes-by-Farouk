import { test, expect } from "@playwright/test";

test.describe("About Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("should display the hero section", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Modern Expertise");
    await expect(page.locator("h1")).toContainText("Future-Proof");
  });

  test("should display the pillars section with images", async ({ page }) => {
    await expect(page.getByText("OUR PILLARS")).toBeVisible();
    const pillarImages = page.locator("section img");
    // Hero image + 3 pillar images
    await expect(pillarImages).toHaveCount(4);
  });

  test("should have a functional CTA button", async ({ page }) => {
    const ctaButton = page.getByRole("button", { name: /Let’s Discuss Your Portfolio/i });
    await expect(ctaButton).toBeVisible();
  });

  test("should have correct SEO metadata", async ({ page }) => {
    await expect(page).toHaveTitle(/About Us | Homes by Farouk/);
  });
});
