import {commonActions} from "../../support/page_objects/part2/commonActions";
import {productPage} from "../../support/page_objects/part2/productPage";
import {loginPage} from "../../support/page_objects/part2/loginPage";
import {topNavigation} from "../../support/page_objects/part2/topNavigation";
import {addressPage} from "../../support/page_objects/part2/addressPage";
import {insertAddressPage} from "../../support/page_objects/part2/insertAddressPage";
const products = require("./../../support/test_data/products.json")

describe('Part 2', () => {

    beforeEach(() => {
        cy.reload()
    })

    it('1', () => {
        // Napisz test dodający koszulkę oraz buty do koszyka (bez użycia wyszukiwarki), następnie przy pomocy
        // wyszukiwarki dodaj jakiś kosmetyk i doprowadź zamówienie do finalizacji :) - sprawdź czy wszystko poszło OK

        // próbuję dużego stopnia abstrakcji
        commonActions.addProductToCart(products.tshirts_ids.CASUAL_BASEBALL)
        commonActions.addProductToCart(products.shoes_ids.WOMENS_STILETTO)
        commonActions.performSearch(products.cosmetics_strings.OBSESSION)
        productPage.clickAddToCart()
        commonActions.performCheckout()
    })

    it('2', () => {
        // Sprawdź czy dane na ekranie wprowadzania adresu są walidowane poprawnie w formularzu

        // próbuję mniejszego stopnia abstrakcji (bardziej atomiczne stepy)
        commonActions.goToHomePage()
        loginPage.performLogin()
        topNavigation.clickAddressBookButton()
        addressPage.clickNewAddressButton()
        insertAddressPage.clickContinueButton()
        insertAddressPage.verifyAmountOfErrorsEquals(6)
        insertAddressPage.testLowerBoundary()
        insertAddressPage.verifyAmountOfErrorsEquals(6)
        insertAddressPage.testUpperBoundary()
        insertAddressPage.verifyAmountOfErrorsEquals(6)
        insertAddressPage.testCorrectData()
        insertAddressPage.verifyAmountOfErrorsEquals(0)
        // test nie przechodzi do końca bo znajduje błąd - walidacja dwóch inputów jest niewłaściwa
        addressPage.verifyYouAreHere()
        addressPage.verifyAddressInserted()
    });
})
