import { Page, Locator } from '@playwright/test';

export class LoginPage {
    // 1. Khai báo thuộc tính Locator cho các phần tử trên trang Login
    private page: Page;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private errorMessage: Locator;

    //2. Khởi tạo các constructor để gán giá trị cho các thuộc tính Locator
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // 3. Định nghĩa các phương thức để tương tác với các phần tử trên trang Login
    async gotoLoginPage(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // 4. Helper để lấy Locator của thông báo lỗi
    getErrorMessage(): Locator {
        return this.errorMessage;
    }

    // 5. Helper để kiểm tra lỗi hiển thị
    async isErrorMessageVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }
}