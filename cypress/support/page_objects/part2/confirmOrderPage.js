class confirmOrderPage_ {
    confirmOrderButton = '#checkout_btn';

    clickConfirmOrder() {
        cy.get(this.confirmOrderButton).click()
    }
}

export const confirmOrderPage = new confirmOrderPage_()