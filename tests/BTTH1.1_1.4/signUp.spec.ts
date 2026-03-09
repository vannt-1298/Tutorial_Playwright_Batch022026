import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Helper: tạo username unique dạng ntvan+{number tăng dần} mỗi lần chạy test
function getIncrementalUsername(): string {
  const counterFile = path.join(__dirname, '.username_counter.json');
  let counter = 1;
  if (fs.existsSync(counterFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(counterFile, 'utf-8'));
      counter = (data.counter || 0) + 1;
    } catch {
      counter = 1;
    }
  }
  fs.writeFileSync(counterFile, JSON.stringify({ counter }), 'utf-8');
  return `ntvan${counter}`;
}

test('TC01 - Register successfully with valid information', async ({ page }) => {
  const username  = getIncrementalUsername(); // ntvan+1, ntvan+2, ntvan+3, ...
  const firstName = 'Nguyen';
  const lastName  = 'Van';
  const password  = 'Test@12345';

  // Step 1: Truy cập trang đăng ký
  await page.goto('https://buggy.justtestit.org/register');

  // Step 2: Xác nhận đúng tiêu đề "Register with Buggy Cars Rating"
  await expect(
    page.getByRole('heading', { name: 'Register with Buggy Cars Rating' })
  ).toBeVisible();

  // Step 3: Kiểm tra các ô input được hiển thị
  const usernameInput        = page.getByLabel('Login');
  const firstNameInput       = page.getByLabel('First Name');
  const lastNameInput        = page.getByLabel('Last Name');
  const passwordInput        = page.getByLabel('Password', { exact: true });
  const confirmPasswordInput = page.getByLabel('Confirm Password');

  await expect(usernameInput).toBeVisible();
  await expect(firstNameInput).toBeVisible();
  await expect(lastNameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(confirmPasswordInput).toBeVisible();

  // Step 4: Nhập thông tin hợp lệ
  await usernameInput.fill(username);
  await firstNameInput.fill(firstName);
  await lastNameInput.fill(lastName);
  await passwordInput.fill(password);
  await confirmPasswordInput.fill(password);

  // Step 5: Click nút Register
  await page.getByRole('button', { name: 'Register' }).click();

  // Step 6: Kiểm tra đăng ký thành công
  await expect(
    page.getByText('Registration is successful')
  ).toBeVisible();
});
