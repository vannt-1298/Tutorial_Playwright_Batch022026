import { test, expect } from '@playwright/test';

// Username đã đăng ký qua signUp.spec.ts (ntvan1, ntvan2, ...)
const USERNAME = 'ntvan2';
const PASSWORD = 'Test@12345';

test('TC02 - Login successfully with valid credentials', async ({ page }) => {
  // Step 1: Truy cập trang Login
  await page.goto('https://buggy.justtestit.org/');

  // Step 2: Kiểm tra form login hiển thị trên header
  const usernameInput = page.locator('input[name="login"]');
  const passwordInput = page.locator('input[name="password"]');
  const loginButton   = page.locator('button[type="submit"]');

  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(loginButton).toBeVisible();

  // Step 3: Điền username & password đã đăng ký
  await usernameInput.fill(USERNAME);
  await passwordInput.fill(PASSWORD);

  // Step 4: Nhấn nút Login
  await loginButton.click();

  // Step 5: Kiểm tra login thành công - tên user hiển thị trên header
  await expect(
    page.locator('nav').getByText(USERNAME)
  ).toBeVisible({ timeout: 10000 });
});
