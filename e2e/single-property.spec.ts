import { test, expect } from '@playwright/test';

test.describe('Single Property Page', () => {
  test('should load property details correctly', async ({ page }) => {
    // Navigate to Brookside One Residency
    await page.goto('/properties/brookside-one-residency');

    // Verify Title
    await expect(page.getByRole('heading', { name: 'Brookside One Residency' })).toBeVisible();

    // Verify Location
    await expect(page.getByText('Westlands, Nairobi')).toBeVisible();

    // Verify Stats
    await expect(page.getByText('3 - 4')).toBeVisible(); // Bedrooms
    await expect(page.getByText('Q4 2025')).toBeVisible(); // Completion

    // Verify Form Placeholder for Off-Plan
    const messageTextarea = page.getByLabel('Message');
    await expect(messageTextarea).toHaveValue(/payment plans available for Brookside One Residency/);

    // Verify WhatsApp button presence
    await expect(page.getByRole('button', { name: 'WhatsApp' })).toBeVisible();

    // Verify Gallery Slideshow (Hero)
    await expect(page.getByText('01')).toBeVisible(); // Current index
    await expect(page.getByText('03')).toBeVisible(); // Total count
    await expect(page.locator('button:has(svg.lucide-chevron-right)')).toBeVisible();
  });

  test('should show 404 for non-existent property', async ({ page }) => {
    await page.goto('/properties/non-existent-listing');
    await expect(page.getByText(/404/i)).toBeVisible();
  });
});
