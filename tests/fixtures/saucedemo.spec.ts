import { test, expect } from './loggedInPage';

/**
 * Test suite sử dụng fixture loggedInPage
 * - Login chỉ xảy ra 1 lần qua storageState (auth.json)
 * - Tất cả test bên dưới đều tái sử dụng fixture loggedInPage
 */
test.describe('Saucedemo - Fixtures reuse loggedInPage', () => {

  // ============================================================
  // TC01 - Role Owner: Thêm sản phẩm vào giỏ hàng
  // ============================================================
  test('TC01 - Role Owner: Add product to cart', async ({ loggedInPage: page }) => {
    // Verify đã ở trang inventory (đã đăng nhập qua storageState)
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    console.log('✅ TC01 - Inventory page loaded (logged in via storageState)');

    // Thêm sản phẩm "Sauce Labs Backpack" vào giỏ hàng
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Verify badge giỏ hàng hiển thị số 1
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    console.log('✅ TC01 - Product added to cart successfully (Role Owner)');
  });

  // ============================================================
  // TC02 - Role Manager: Thêm nhiều sản phẩm và kiểm tra giỏ hàng
  // ============================================================
  test('TC02 - Role Manager: Add multiple products and verify cart', async ({ loggedInPage: page }) => {
    // Verify đã ở trang inventory
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    console.log('✅ TC02 - Inventory page loaded (logged in via storageState)');

    // Thêm 2 sản phẩm vào giỏ hàng
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Verify badge giỏ hàng hiển thị số 2
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // Mở giỏ hàng và verify có đúng 2 items
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
    console.log('✅ TC02 - Cart verified with 2 items (Role Manager)');
  });

  // ============================================================
  // TC03 - Search User: Lọc và tìm kiếm sản phẩm
  // ============================================================
  test('TC03 - Search User: Filter products by name A to Z', async ({ loggedInPage: page }) => {
    // Verify đã ở trang inventory
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    console.log('✅ TC03 - Inventory page loaded (logged in via storageState)');

    // Sắp xếp sản phẩm theo tên A → Z
    await page.locator('[data-test="product-sort-container"]').selectOption('az');

    // Lấy danh sách tên sản phẩm sau khi lọc
    const productNames = await page.locator('[data-test="inventory-item-name"]').allTextContents();

    // Verify danh sách đã được sắp xếp đúng A → Z
    const expectedSorted = [...productNames].sort((a, b) => a.localeCompare(b));
    expect(productNames).toEqual(expectedSorted);
    console.log('✅ TC03 - Products sorted A to Z:', productNames);
  });

  // ============================================================
  // TC04 - Search User: Lọc sản phẩm theo giá thấp → cao
  // ============================================================
  test('TC04 - Search User: Filter products by price low to high', async ({ loggedInPage: page }) => {
    // Verify đã ở trang inventory
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();

    // Sắp xếp theo giá thấp → cao
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    // Lấy danh sách giá sản phẩm
    const priceTexts = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));

    // Verify giá được sắp xếp tăng dần
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
    console.log('✅ TC04 - Products sorted by price low to high:', prices);
  });

});
