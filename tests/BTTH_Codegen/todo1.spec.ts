import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

    // Thêm một task mới
    await page.fill('.new-todo', 'Học Playwright');
    await page.press('.new-todo', 'Enter');

    //Kiểm tra task mới đã được thêm vào danh sách
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(1);
    await expect(todoItems.first()).toHaveText('Học Playwright');

    // Đánh dấu task là đã hoàn thành
    await todoItems.first().locator('.toggle').click();
    await expect(todoItems.first()).toHaveClass(/completed/);

    // Xóa task đã hoàn thành
    await todoItems.first().locator('.destroy').click();
    await expect(todoItems).toHaveCount(0);

    // Thêm nhiều task mới
    await page.fill('.new-todo', 'Học TypeScript');
    await page.press('.new-todo', 'Enter');
    await page.fill('.new-todo', 'Học Playwright nâng cao');
    await page.press('.new-todo', 'Enter');

    // Kiểm tra tất cả task đã được thêm vào danh sách
    await expect(todoItems).toHaveCount(2);
    await expect(todoItems.nth(0)).toHaveText('Học TypeScript');
    await expect(todoItems.nth(1)).toHaveText('Học Playwright nâng cao');

    // Đánh dấu tất cả task là đã hoàn thành
    const toggleAll = page.locator('#toggle-all');
    await toggleAll.click();    
    const count = await todoItems.count();
    for (let i = 0; i < count; i++) {
      await expect(todoItems.nth(i)).toHaveClass(/completed/);
    }

    // Kiểm tra bộ lọc Active và Completed
    const activeFilter = page.locator('a', { hasText: 'Active' });
    const completedFilter = page.locator('a', { hasText: 'Completed' });
    await activeFilter.click();
    await expect(todoItems).toHaveCount(0);
    await completedFilter.click();
    await expect(todoItems).toHaveCount(2);
});