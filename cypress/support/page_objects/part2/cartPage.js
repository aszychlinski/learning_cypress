class cartPage_ {
    cartUrl = 'https://automationteststore.com/index.php?rt=checkout/cart';
    checkoutButton = '#cart_checkout1';

    clickCheckoutButton() {
        return cy.get(this.checkoutButton).click()
    }

    goToCart() {
        if (cy.url() !== this.cartUrl) {
            cy.visit(this.cartUrl)
        }
    }
}

export const cartPage = new cartPage_()