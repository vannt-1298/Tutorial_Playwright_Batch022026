import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { DashboardPage } from '../../pages/dashboardPage';

  // Chạy beforeAll để setup môi trường trước khi chạy tất cả tests trong file này
  test.beforeAll(async ({ browser }) => {
    // Có thể setup dữ liệu test hoặc cấu hình chung ở đây nếu cần
    console.log('Bắt đầu chạy nhóm tests cho bài 3.3');
  });
  // Chạy beforeEach để login thành công trước mỗi test trong file này
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('standard_user', 'secret_sauce');
  });
  // Nhóm các test liên quan tới kiểm tra sản phẩm sau khi login thành công
  test.describe('Product Display Tests', () => {
    // Kiểm tra số lượng sản phẩm hiển thị sau khi login thành công
    test('TC02 - Verify product count after successful login', async ({ page }) => {
      const products = page.locator('.inventory_item');
      await expect(products).toHaveCount(4);
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
    // Chạy afterAll để in ra log và dọn dẹp môi trường sau khi chạy tất cả tests trong file này
    test.afterAll(async () => {
      console.log('Kết thúc nhóm tests cho bài 3.3');
    });
  });