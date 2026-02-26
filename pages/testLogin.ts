import { LoginPage } from "./loginPage";
import { DashboardPage } from "./dashboardPage";

async function testLogin(): Promise<void> {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();

    await loginPage.gotoLoginPage();
    await loginPage.login("admin", "123456");
    await dashboardPage.verifyLoginSuccess();
}

testLogin();
