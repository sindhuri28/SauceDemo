import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage{
    readonly page: Page;
    readonly firstProduct: Locator;
    readonly secondProduct: Locator;

    constructor(page: Page){
        this.page = page;
        this.firstProduct = page.locator("#add-to-cart-sauce-labs-onesie");
        this.secondProduct = page.locator("#add-to-cart-sauce-labs-bike-light");
    }

    async sortByLowToHigh (){
        const sort = this.page.locator(".product_sort_container");
        await sort.selectOption("Price (low to high)");
    }

    async addProductsToCart(){
        await this.firstProduct.click();
        await this.secondProduct.click();
        await expect.soft(this.page.locator(".shopping_cart_badge")).toHaveText("2");
        const item1 = await this.page.locator("#item_2_title_link").innerText();
        const item2 = await this.page.locator("#item_0_title_link").innerText();
        const itemPrice = await this.page.locator(".inventory_item_price").allInnerTexts();
        const item1Price = itemPrice[0];
        const item2Price = itemPrice[1];
        return {item1, item2, item1Price, item2Price};
    }
}