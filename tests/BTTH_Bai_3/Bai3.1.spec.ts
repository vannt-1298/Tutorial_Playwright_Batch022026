import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { DashboardPage } from '../../pages/dashboardPage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage; 
  // SETUP: Khởi tạo các page object trước mỗi test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.gotoLoginPage();
  });

  //TC01: Login thành công với username & password hợp lệ
  test('TC01 - Login successfully with valid credentials', async ({ page }) => {
    const USERNAME = 'standard_user';
    const PASSWORD = 'secret_sauce';
    await loginPage.login(USERNAME, PASSWORD);
    // Kiểm tra login thành công - tên user hiển thị trên header
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(dashboardPage.getTitle()).toHaveText('Products');
    // Kiểm tra sản phẩm đầu tiên hiển thị đúng sau khi login thành công
    const firstProduct = dashboardPage.getFirstProduct();
    await expect(firstProduct).toBeVisible();
    await expect(firstProduct).toHaveText('Sauce Labs Backpack');
  });

  // TC02: Login thất bại với password không hợp lệ
  test('TC02 - Login fails with invalid password', async () => {
    const USERNAME = 'standard_user';
    const INVALID_PASSWORD = 'wrong_password';
    await loginPage.login(USERNAME, INVALID_PASSWORD);
    // Kiểm tra login thất bại - hiển thị thông báo lỗi
    await expect(loginPage.getErrorMessage()).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

// Viết hàm afterEach để chụp screenshot nếu test thất bại và gọi hàm logout
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
    await dashboardPage.logout();
  });
});
