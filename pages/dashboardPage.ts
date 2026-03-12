import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getTitle(): Locator {
        return this.page.locator('.title');
    }

    getFirstProduct(): Locator {
        return this.page.locator('.inventory_item_name').first();
    }

    async verifyLoginSuccess(): Promise<void> {
        await this.getTitle().isVisible();
    }
    async logout(): Promise<void> {
        await this.page.click('#react-burger-menu-btn');
        await this.page.click('#logout_sidebar_link');
    }
}
