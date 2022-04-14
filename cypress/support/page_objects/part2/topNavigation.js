class topNavigation_ {
    loginButton = 'ul#customer_menu_top a[href="https://automationteststore.com/index.php?rt=account/login"]';
    welcomeBackButton = 'div#customernav a[href="https://automationteststore.com/index.php?rt=account/account"]'
    addressBookButton = 'li.dropdown > a[href="https://automationteststore.com/index.php?rt=account/address"]'

    clickLoginButton() {
        cy.get(this.loginButton).click()
    }

    clickAddressBookButton() {
        cy.get(this.addressBookButton).click({force: true})
    }
}

export const topNavigation = new topNavigation_()