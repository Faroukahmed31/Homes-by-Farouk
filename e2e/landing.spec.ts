import { test, expect } from '@playwright/test';

test('landing page loads and shows key sections', async ({ page }) => {
  await page.goto('/');
  
  // Check Navbar
  await expect(page.getByText('Homes by Farouk').first()).toBeVisible();
  
  // Check Hero
  await expect(page.getByText('Find Your Dream Home in Nairobi')).toBeVisible();
  
  // Check Search Bar
  await expect(page.getByText('Purpose')).toBeVisible();
  
  // Check Featured Properties
  await expect(page.getByRole('heading', { name: 'Featured Properties' })).toBeVisible();
});

test('whatsapp button is present', async ({ page }) => {
  await page.goto('/');
  const whatsappButton = page.locator('a[aria-label="Chat on WhatsApp"]');
  await expect(whatsappButton).toBeVisible();
  await expect(whatsappButton).toHaveAttribute('href', /wa\.me/);
});
