import { expect, test } from "@playwright/test";
import {LoginPage} from '../pages/loginPage';
import { HomePage } from "../pages/homePage";
import { InventoryPage } from "../pages/inventoryPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkOutPage";

test("add to cart and checkout", async({page}) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkOutPage = new CheckoutPage(page);

    await homePage.goToPage();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.sortByLowToHigh();

    //Get the products addes to cart
    const productsAdded = 
    await inventoryPage.addProductsToCart();

    //Go to cart and checkout
    await cartPage.goToCart();
    await cartPage.checkout();

    //Fill in customer details and continue checkout
    await checkOutPage.fillInCheckOutDetails();
    await checkOutPage.continueCheckOut();

    //Verify products added to cart on checkout page and complete order
    await checkOutPage.verifyCheckoutOverView(productsAdded);
    await checkOutPage.completeCheckOut();
})