import { test as base, Page } from '@playwright/test';

// ============================================================
// ĐỊNH NGHĨA KIỂU DỮ LIỆU CHO FIXTURE
// ============================================================
type MyFixtures = {
  loggedInPage: Page;
};

// ============================================================
// V1: Manual Login Fixture (Login thủ công mỗi test)
// Không hiệu quả khi có nhiều test - login lặp lại nhiều lần
// ============================================================
//
// export const test = base.extend<MyFixtures>({
//   loggedInPage: async ({ page }, use) => {
//     await page.goto('https://www.saucedemo.com/');
//     await page.locator('[data-test="username"]').fill('standard_user');
//     await page.locator('[data-test="password"]').fill('secret_sauce');
//     await page.locator('[data-test="login-button"]').click();
//     await page.waitForURL('**/inventory.html');
//     await use(page); // Truyền page đã đăng nhập cho test
//   },
// });

// ============================================================
// V2: Refactored - Dùng storageState (auth.json)
// Login CHỈ CHẠY 1 LẦN trong auth.setup.ts
// Fixture này load auth.json → browser tự động đã đăng nhập
// ============================================================
export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    // Nhờ storageState được cấu hình trong playwright.config.ts,
    // browser context đã có sẵn cookies/session từ auth.json
    // Chỉ cần navigate thẳng vào trang đích (không cần login lại)
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Truyền page đã đăng nhập vào test
    await use(page);

    // Teardown: Không cần logout vì mỗi test dùng isolated context riêng
  },
});

export { expect } from '@playwright/test';
