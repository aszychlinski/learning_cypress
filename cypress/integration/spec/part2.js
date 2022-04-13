import {commonActions} from "../../support/page_objects/part2/commonActions";
import {productPage} from "../../support/page_objects/part2/productPage";

describe('Part 2', () => {

    it.only('1', () => {
        // Napisz test dodający koszulkę oraz buty do koszyka (bez użycia wyszukiwarki), następnie przy pomocy
        // wyszukiwarki dodaj jakiś kosmetyk i doprowadź zamówienie do finalizacji :) - sprawdź czy wszystko poszło OK

        commonActions.addProductToCart(123)
        commonActions.addProductToCart(118)
        commonActions.performSearch('Obsession Night Perfume')
        productPage.clickAddToCart()
        commonActions.performCheckout()
    })
})
