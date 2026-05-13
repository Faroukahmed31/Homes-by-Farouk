import { test, expect } from '@playwright/test';

test('properties page loads and filtering works', async ({ page }) => {
  await page.goto('/properties');
  
  // Check Heading
  await expect(page.getByRole('heading', { name: 'Nairobi Luxury Listings' })).toBeVisible();
  
  // Check Initial Count
  const initialCards = page.getByTestId('property-card');
  await expect(initialCards).toHaveCount(4);
  
  // Filter by search
  const searchInput = page.getByPlaceholder('Search by name or location...');
  await searchInput.click();
  await page.keyboard.type('Karen', { delay: 100 });
  
  // Wait for the other cards to disappear with a longer timeout
  await expect(page.getByText('The Westlands Pinnacle')).not.toBeVisible({ timeout: 10000 });
  await expect(initialCards).toHaveCount(1);
  
  // Clear search and filter by status
  await searchInput.fill('');
  const statusSelect = page.locator('select').first();
  await statusSelect.selectOption('Off-Plan');
  await expect(initialCards).toHaveCount(2);
});
