export class LoginPage {
    async gotoLoginPage(): Promise<void> {
        console.log("Navigating to Login Page...");
    }

    async login(username: string, password: string): Promise<void> {
        console.log(`Logging in with username: "${username}" and password: "${password}"`);
    }
}
