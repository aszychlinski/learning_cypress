import {ajaxLoader} from "../../support/page_objects/ajaxLoader";
import {autoComplete} from "../../support/page_objects/autoComplete";
import {contactUs} from "../../support/page_objects/contactUs";
import {datePicker} from "../../support/page_objects/datePicker";
import {dropCheckRadio} from "../../support/page_objects/dropCheckRadio";
const test_data = require('./../../support/test_data/contactUs.json');


describe('Part 1', () => {

    it('4a', () => {
        // Uzupełniamy wszystkie dane, i resetujemy - weryfikujemy czy wyczyściło poprawnie

        cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html')

        cy.get(contactUs.placeholder.FIRST_NAME).type(test_data.inputs.FIRST_NAME)
        cy.get(contactUs.placeholder.LAST_NAME).type(test_data.inputs.LAST_NAME)
        cy.get(contactUs.placeholder.EMAIL_ADDRESS).type(test_data.inputs.VALID_EMAIL_ADDRESS)
        cy.get(contactUs.placeholder.COMMENTS).type(test_data.inputs.COMMENTS)

        cy.get(contactUs.resetButton).click()

        cy.get(contactUs.placeholder.FIRST_NAME).should('have.value', '')
        cy.get(contactUs.placeholder.LAST_NAME).should('have.value', '')
        cy.get(contactUs.placeholder.EMAIL_ADDRESS).should('have.value', '')
        cy.get(contactUs.placeholder.COMMENTS).should('have.value', '')

    })

    it('4b', () => {
        // Wprowadzamy cześć danych i próbujemy wysłać - sprawdzamy komunikat błędu

        cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html')

        cy.get(contactUs.placeholder.EMAIL_ADDRESS).type(test_data.inputs.VALID_EMAIL_ADDRESS)

        cy.get(contactUs.submitButton).click()
        cy.get('body').contains(test_data.outputs.MISSING_FIELDS)

    })

    it('4c', () => {
        // Wprowadzamy błędny email i sprawdzamy komunikat

        cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html')

        cy.get(contactUs.placeholder.FIRST_NAME).type(test_data.inputs.FIRST_NAME)
        cy.get(contactUs.placeholder.LAST_NAME).type(test_data.inputs.LAST_NAME)
        cy.get(contactUs.placeholder.EMAIL_ADDRESS).type(test_data.inputs.INVALID_EMAIL_ADDRESS)
        cy.get(contactUs.placeholder.COMMENTS).type(test_data.inputs.COMMENTS)

        cy.get(contactUs.submitButton).click()
        cy.get(contactUs.body).contains(test_data.outputs.INVALID_EMAIL)

    })

    it('4d', () => {
        // Wprowadzamy wszystkie dane i sprawdzamy komunikat

        cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html')

        cy.get(contactUs.placeholder.FIRST_NAME).type(test_data.inputs.FIRST_NAME)
        cy.get(contactUs.placeholder.LAST_NAME).type(test_data.inputs.LAST_NAME)
        cy.get(contactUs.placeholder.EMAIL_ADDRESS).type(test_data.inputs.VALID_EMAIL_ADDRESS)
        cy.get(contactUs.placeholder.COMMENTS).type(test_data.inputs.COMMENTS)

        cy.get(contactUs.submitButton).click()

        cy.contains(contactUs.contactReply, test_data.outputs.THANK_YOU)

    })

    it('4f', () => {
        // Wybieramy wszystkie możliwe opcje z dropdownow i sprawdzamy ich wartości czy są poprawne

        cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html')

        for (const [dropDownId, myArray] of Object.entries(dropCheckRadio.dropDowns)) {
            const currentDropdown = cy.get(dropCheckRadio.paramDropDownMenu(dropDownId))

            currentDropdown.find('option').should('have.lengthOf', myArray.length)
                .each( (foundOption) => {
                    expect(myArray).to.include(foundOption.text())
            })
        }

    })

    it('4g', () => {
        // Zaznaczamy wszystkie checkboxy a następnie odznaczamy 2 i 4 - sprawdzamy czy  zostały odznaczone i zaznaczone poprawnie

        cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html')

        cy.get(dropCheckRadio.checkBoxes).find('input').check()
        cy.get(dropCheckRadio.checkBoxes).find('input').eq(1).click()
        cy.get(dropCheckRadio.checkBoxes).find('input').eq(3).click()

        cy.get(dropCheckRadio.checkBoxes).find('input').eq(0).invoke('prop', 'checked').should('equal', true)
        cy.get(dropCheckRadio.checkBoxes).find('input').eq(1).invoke('prop', 'checked').should('equal', false)
        cy.get(dropCheckRadio.checkBoxes).find('input').eq(2).invoke('prop', 'checked').should('equal', true)
        cy.get(dropCheckRadio.checkBoxes).find('input').eq(3).invoke('prop', 'checked').should('equal', false)

    })

    it('4h', () => {
        // Klikamy wszystkie Radio buttony po każdym kliknięciu sprawdzamy czy zaznaczył się ten który chcieliśmy

        cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html')

        cy.get(dropCheckRadio.radioButtons).find('input').each((radioButton) => {
            cy.wrap(radioButton).check()
            cy.wrap(radioButton).check().invoke('prop', 'checked').should('equal', true)
        })

    })

    it('6', () => {
        // "Automatyzujemy stronę Datepicker - wpisujemy date i sprawdzamy czy została wybrana poprawna"
        // w tym datepickerze nie da rady pisać z palca... musiałem wymyślić coś innego do zrobienia

        cy.visit('https://webdriveruniversity.com/Datepicker/index.html')

        const date = new Date()
        const today = date.getDate()
        const tomorrow = today + 1

        cy.get(datePicker.input).click()
        cy.get(datePicker.todayDay).should('have.text', today.toString())
        cy.get(datePicker.todayDay).siblings().contains('td', tomorrow.toString()).click()
        cy.get(datePicker.input).click()
        cy.get(datePicker.activeDay).should('have.text', tomorrow.toString())

    })


    it('7', () => {
        // Automatyzujemy stronę Autocomplete TextField - wpisujemy 3 pierwsze znaki i wybieramy 2 element z listy podpowiadanej np. ('chi')

        cy.visit('https://webdriveruniversity.com/Autocomplete-TextField/autocomplete-textfield.html')

        cy.get(autoComplete.input).type('Chi')
        cy.get(autoComplete.choiceList).eq(1).click()

    })

    before(() => {
        // the website is throwing an uncaught exception when visited by cypress, but it does not appear to
        // interfere with application functionality
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
    })

    it('8', () => {
        // Automatyzujemy stronę Ajax-Loader - czekamy aż strona się załaduje(bez statycznych waitow) i klikamy guzik

        cy.visit('https://webdriveruniversity.com/Ajax-Loader/index.html')

        cy.get(ajaxLoader.greenButton, {timeout: 20000}).click()
        cy.get(ajaxLoader.closeModalButton).click()

    })

    after(() =>{
        Cypress.on('uncaught:exception', (err, runnable) => {
            return true
        })
    })
})
