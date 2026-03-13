import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test('Truy cap dashboard sau khi login san', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Kiem tra co mat phan tu tren dashboard
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await expect(page.getByText('Products')).toBeVisible();
});
