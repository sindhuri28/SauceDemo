import { expect, Expect, Locator, Page } from "@playwright/test";
import exp from "constants";

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.firstNameInput = page.locator("#first-name");
        this.lastNameInput = page.locator("#last-name");
        this.postCodeInput = page.locator("#postal-code");
        this.continueButton = page.locator("#continue");
        this.finishButton = page.locator("#finish");
    }

    async fillInCheckOutDetails(){
        await this.firstNameInput.fill("test");
        await this.lastNameInput.fill("test");
        await this.postCodeInput.fill("2155");
    }

    async continueCheckOut(){
        await this.continueButton.click();
    }

    async verifyCheckoutOverView(productsAdded: any){
        //verify prducts
        await expect.soft(this.page.locator("#item_2_title_link")).toHaveText(productsAdded.item1);
        await expect.soft(this.page.locator("#item_0_title_link")).toHaveText(productsAdded.item2);
        
        //verify individual product prices
        const actualItemPrices = await this.page.locator('.inventory_item_price').allInnerTexts();
         expect(actualItemPrices[0]).toBe(productsAdded.item1Price);
         expect(actualItemPrices[1]).toBe(productsAdded.item2Price);
         const price = 
         await this.getSubTotalPrice(productsAdded);

         //verify price breakdown
         await expect(this.page.locator(".summary_subtotal_label")).toHaveText(`Item total: $${price.subTotalPrice}`);
         await expect(this.page.locator(".summary_tax_label")).toHaveText(`Tax: $${price.tax}`);
         await expect(this.page.locator(".summary_total_label")).toHaveText(`Total: $${price.totalPrice}`);
    }

    async getSubTotalPrice(productsAdded: any){
        const item1Price = String(productsAdded.item1Price);
        const item2Price = String(productsAdded.item2Price);
        const price1 = parseFloat(item1Price.slice(1,5));
        const price2 = parseFloat(item2Price.slice(1,5));
        const subTotalPrice = price1+price2;
        const tax = (subTotalPrice*0.08).toFixed(2);
        const totalPrice = price1+price2+ parseFloat(tax);
        return {subTotalPrice, tax, totalPrice};
    }

    async completeCheckOut(){
        await this.finishButton.click();
        await expect(this.page.locator(".complete-header")).toHaveText("Thank you for your order!");
    }
}