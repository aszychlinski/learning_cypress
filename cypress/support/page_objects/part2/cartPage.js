import {topNavigation} from "./topNavigation";

class cartPage_ {
    cartUrl = 'https://automationteststore.com/index.php?rt=checkout/cart';
    checkoutButton = '#cart_checkout1';
    emptyCartMessage = "div.contentpanel";

    clickCheckoutButton() {
        return cy.get(this.checkoutButton).click()
    }

    goToCart() {
        if (cy.url() !== this.cartUrl) {
            cy.visit(this.cartUrl)
        }
    }

    verifyCartIsEmpty() {
        cy.get(this.emptyCartMessage)
            .should('contain.text', 'Your shopping cart is empty!')
        cy.get(topNavigation.cartStatusAmount).should('have.text', 0)
        cy.get(topNavigation.cartStatusPrice).should('have.text', '$0.00')
    }
}

export const cartPage = new cartPage_()