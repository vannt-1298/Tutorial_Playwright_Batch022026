import { test, expect } from '@playwright/test';

test('Search on W3Schools', async ({ page }) => {
  // Truy cập trang W3Schools
  await page.goto('https://www.w3schools.com/');

  // Nhập giá trị tìm kiếm vào ô search
  const searchInput = page.locator('#tnb-google-search-input');
  await searchInput.click();
  await searchInput.fill('TypeScript');

  // Nhấn Enter để tìm kiếm
  await searchInput.press('Enter');

  // Xác nhận trang kết quả hiển thị
  await expect(page).toHaveURL(/.*typescript.*/i);
});
