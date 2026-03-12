import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { DashboardPage } from '../../pages/dashboardPage';

  // Nhóm các test liên quan tới kiểm tra sản phẩm sau khi login thành công
  test.describe('Product Display Tests', () => {
    // SETUP: Login thành công trước mỗi test trong nhóm này
    test.beforeEach(async ({ page }) => {
      const login = new LoginPage(page);
      await login.gotoLoginPage();
      await login.login('standard_user', 'secret_sauce');
    });
    // Kiểm tra số lượng sản phẩm hiển thị sau khi login thành công
    test('TC02 - Verify product count after successful login', async ({ page }) => {
      const products = page.locator('.inventory_item');
      await expect(products).toHaveCount(6);
    });
    // Kiểm tra sản phẩm đầu tiên hiển thị đúng sau khi login thành công
    test('TC03 - Verify first product display after successful login', async ({ page }) => {
      const dashboard = new DashboardPage(page);
      const firstProduct = dashboard.getFirstProduct();
      await expect(firstProduct).toBeVisible();
      await expect(firstProduct).toHaveText('Sauce Labs Backpack');
    });
    //Gọi afterEach để screenshot nếu test thất bại
    test.afterEach(async ({ page }, testInfo) => {
      if (testInfo.status !== 'passed') {
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
      } else {
        const dashboard = new DashboardPage(page);
        await dashboard.logout();
      } 
    });
  });
  // Nhóm các test liên quan tới kiểm tra giỏ hàng
  test.describe('Cart Functionality Tests', () => {
    // Login trước, sau đó thêm 1 sản phẩm vào giỏ hàng trước mỗi test trong nhóm này
    test.beforeEach(async ({ page }) => {
      const login = new LoginPage(page);
      await login.gotoLoginPage();
      await login.login('standard_user', 'secret_sauce');
      const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
      await addToCartButton.click();
    });
    // Kiểm tra badge số lượng sản phẩm trong giỏ hàng sau khi thêm sản phẩm
    test('TC04 - Verify cart badge count after adding product', async ({ page }) => {
      const cartBadge = page.locator('.shopping_cart_badge');
      await expect(cartBadge).toHaveText('1');
    });
        //Gọi afterEach để screenshot nếu test thất bại
    test.afterEach(async ({ page }, testInfo) => {
      if (testInfo.status !== 'passed') {
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
      } else {
        const dashboard = new DashboardPage(page);
        await dashboard.logout();
      } 
    });
  });