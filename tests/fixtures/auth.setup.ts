import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Đường dẫn lưu auth state (storageState)
export const AUTH_FILE = 'playwright/.auth/auth.json';

/**
 * Setup: Login MỘT LẦN duy nhất và lưu storageState vào auth.json
 * Các test sau dùng lại auth.json thay vì login thủ công nhiều lần
 */
setup('authenticate - save storageState', async ({ page }) => {
  // Tạo thư mục nếu chưa tồn tại
  const authDir = path.dirname(AUTH_FILE);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
    console.log('📁 Created auth directory:', authDir);
  }

  // Mở trang login
  await page.goto('https://www.saucedemo.com/');
  console.log('🌐 Navigated to saucedemo.com');

  // Thực hiện login thủ công (CHỈ CHẠY 1 LẦN trong setup)
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Chờ redirect sang inventory sau khi login thành công
  await page.waitForURL('**/inventory.html');
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  console.log('✅ Login successful');

  // Lưu toàn bộ cookies + localStorage vào auth.json
  await page.context().storageState({ path: AUTH_FILE });
  console.log('💾 Auth state saved to:', AUTH_FILE);
});
