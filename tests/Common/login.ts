import { Page, expect } from '@playwright/test';

export async function loginUser(page: Page): Promise<void> {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('performance_glitch_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.title')).toHaveText('Products');
}
