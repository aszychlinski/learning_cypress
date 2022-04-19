class orderProcessedPage_ {
    continueButton = 'a.btn[title="Continue"]';
    headerText = ' Your Order Has Been Processed!';
    orderProcessedHeader = 'h1.heading1 span.maintext';
    orderNumberElement = 'section.mb40 p:nth-child(3)';
    invoiceLink = 'section.mb40 p:nth-child(4) a';

    verifySuccessHeader() {
        cy.get(this.orderProcessedHeader).should('have.text', this.headerText)
    }

    clickContinueButton() {
        cy.get(this.continueButton).click()
    }

    clickGoToInvoicePage() {
        cy.get(this.invoiceLink).click()
    }
}

export const orderProcessedPage = new orderProcessedPage_()