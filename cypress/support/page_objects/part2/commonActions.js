import {cartPage} from "./cartPage";
import {confirmOrderPage} from "./confirmOrderPage";
import {productPage} from "./productPage";
import {loginPage} from "./loginPage";
import {orderProcessedPage} from "./orderProcessedPage";


class commonActions_ {
    searchInput = '#filter_keyword';

    addProductToCart(product_id) {
        productPage.viewProductPage(product_id)
        productPage.clickAddToCart()
    }

    performCheckout() {
        cartPage.goToCart()
        cartPage.clickCheckoutButton()
        cy.url().then((url) => {
            if (url === loginPage.loginUrl)
                loginPage.performLogin()
        })
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