import { expect, Locator, Page } from "@playwright/test";

export  class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.checkoutButton = page.locator("#checkout");
    }
    
    async goToCart(){
        await this.page.locator("#shopping_cart_container").click();
        await expect.soft(this.page.locator(".header_secondary_container")).toHaveText("Your Cart");
    }

    async checkout(){
        await this.checkoutButton.click();
        await expect.soft(this.page.locator(".header_secondary_container")).toHaveText("Checkout: Your Information");
    }
}