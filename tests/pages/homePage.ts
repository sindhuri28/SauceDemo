import { Locator, Page } from "@playwright/test";

export  class HomePage {
    readonly page: Page;
    constructor(page: Page){
        this.page = page;
    }
    
    async goToPage(){
        await this.page.goto("https://www.saucedemo.com/");
    }
}