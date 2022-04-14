class addressPage_ {
    newAddressButton = 'a[href="https://automationteststore.com/index.php?rt=account/address/insert"]'
    URL = 'https://automationteststore.com/index.php?rt=account/address';
    addressInsertedMessage = 'div[class="alert alert-success"]';

    clickNewAddressButton() {
        cy.get(this.newAddressButton).click()
    }

    verifyYouAreHere() {
        cy.url().should('equal', this.URL)
    }

    verifyAddressInserted() {
        cy.get(this.addressInsertedMessage).should('contain.text', 'Your address has been successfully inserted')
    }

}

export const addressPage = new addressPage_()