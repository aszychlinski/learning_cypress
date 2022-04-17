class topNavigation_ {
    loginButton = 'ul#customer_menu_top a[href="https://automationteststore.com/index.php?rt=account/login"]';
    welcomeBackButton = 'div#customernav a[href="https://automationteststore.com/index.php?rt=account/account"]'
    addressBookButton = 'li.dropdown > a[href="https://automationteststore.com/index.php?rt=account/address"]'
    cartStatusAmount = 'ul.topcart span.label'
    cartStatusPrice = 'ul.topcart span.cart_total'

    clickLoginButton() {
        cy.get(this.loginButton).click()
    }

    clickAddressBookButton() {
        cy.get(this.addressBookButton).click({force: true})
    }

    verifyCartStatus(expectedAmount, expectedValue) {
        cy.get(topNavigation.cartStatusAmount).should('have.text', expectedAmount)
        cy.get(topNavigation.cartStatusPrice).then( (priceSpan) => {
            let currentValue = priceSpan
                .text()
                .replace('$', '')
                .replace('.', '')
            currentValue = parseInt(currentValue)
            expect(currentValue).to.equal(expectedValue)
        })
    }
}

export const topNavigation = new topNavigation_()