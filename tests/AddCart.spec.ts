import { test, expect } from '@playwright/test';
import { loginUser } from './Common/login'

test('add products to cart and verify cart badge count', async ({ page }) => {
  // Login
  await loginUser(page);

  const addToCartButtons = page.locator('[data-test^="add-to-cart"]');
  const cartBadge = page.locator('.shopping_cart_badge');

  // Add first product to cart
  await addToCartButtons.nth(0).click();
  await expect(cartBadge).toHaveText('1');

  // Wait 3 seconds before adding next product
  await page.waitForTimeout(3000);

  // Add second product to cart
  await addToCartButtons.nth(1).click();
  await expect(cartBadge).toHaveText('2');
});
