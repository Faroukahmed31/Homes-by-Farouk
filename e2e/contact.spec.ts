import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact information', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Let's Discuss Your Next Investment/i })).toBeVisible();
    await expect(page.getByText('+254 721 599 075')).toBeVisible();
    await expect(page.getByText('faroukahmed3121@gmail.com')).toBeVisible();
  });

  test('should have a working WhatsApp button with correct pre-filled message', async ({ page }) => {
    const whatsappLink = page.getByRole('link', { name: /Message on WhatsApp/i });
    const href = await whatsappLink.getAttribute('href');
    
    expect(href).toContain('wa.me/254721599075');
    expect(href).toContain(encodeURIComponent("Hi Farouk, I'd like to get in touch regarding a real estate investment."));
  });

  test('should validate the inquiry form', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /Send Message/i });
    await submitBtn.click();
    
    await expect(page.getByText(/Name must be at least 2 characters/i)).toBeVisible();
    await expect(page.getByText(/Please enter a valid email address/i)).toBeVisible();
  });

  test('should show success state after form submission', async ({ page }) => {
    // Fill out the form
    await page.getByLabel(/Full Name/i).fill('Test User');
    await page.getByLabel(/Email Address/i).fill('test@example.com');
    await page.getByLabel(/Phone Number/i).fill('0712345678');
    await page.selectOption('select', 'buy-home');
    await page.getByLabel(/Tell us about your investment goals/i).fill('I am looking for a property in Westlands.');
    
    const submitBtn = page.getByRole('button', { name: /Send Message/i });
    await submitBtn.click();
    
    // Check for success state
    await expect(page.getByText(/Inquiry Received/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Thank you for reaching out/i)).toBeVisible();
  });
});
