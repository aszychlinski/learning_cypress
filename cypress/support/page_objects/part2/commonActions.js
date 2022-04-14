import {cartPage} from "./cartPage";
import {confirmOrderPage} from "./confirmOrderPage";
import {productPage} from "./productPage";
import {loginPage} from "./loginPage";
import {orderProcessedPage} from "./orderProcessedPage";


class commonActions_ {
    searchInput = '#filter_keyword';
    homePageURL = 'https://automationteststore.com/';

    addProductToCart(product_id) {
        productPage.viewProductPage(product_id)
        productPage.clickAddToCart()
    }

    goToHomePage() {
        cy.visit(this.homePageURL)
    }

    performCheckout() {
        cartPage.goToCart()
        cartPage.clickCheckoutButton()
        loginPage.performLogin()
        confirmOrderPage.clickConfirmOrder()
        orderProcessedPage.verifySuccessHeader()
        orderProcessedPage.clickContinueButton()
    }

    performSearch(query) {
        query += '{enter}'
        cy.get(this.searchInput).click().type(query)
    }
}

export const commonActions = new commonActions_()