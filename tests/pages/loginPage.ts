import { expect, Locator, Page } from "@playwright/test";

export  class LoginPage {
    readonly page: Page;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.userNameInput = page.locator("id=user-name");
        this.passwordInput = page.locator("id=password");
        this.loginButton = page.locator("id=login-button");
    }

    async login(userName: string, password: string){
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await expect.soft(this.page.getByText("Products")).toBeVisible();
    }
}