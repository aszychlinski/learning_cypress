class productPage_ {
    addToCartButton = 'a.cart';

    clickAddToCart() {
        return cy.get(this.addToCartButton).click()
    }

    viewProductPage(product_id) {
        cy.visit(`https://automationteststore.com/index.php?rt=product/product&product_id=${product_id}`)
    }
}

export const productPage = new productPage_()