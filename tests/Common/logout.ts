import { Page, expect } from '@playwright/test';

export async function logoutUser(page: Page): Promise<void> {
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
}
