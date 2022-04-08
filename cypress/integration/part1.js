class AjaxLoader {
    static greenButton = '#myDiv[style="display: block;"] p';
    static closeModalButton = '[data-dismiss="modal"]'
}

class AutoComplete {
    static input = '#myInput';
    static choiceList = '#myInputautocomplete-list div';
}

class Datepicker {
    static todayDay = '[class="today day"]';
    static activeDay = '[class="active day"]';
    static input = '#datepicker input';
}

describe('Part 1', () => {

    it('6', () => {
        // "Automatyzujemy stronę Datepicker - wpisujemy date i sprawdzamy czy została wybrana poprawna"
        // w tym datepickerze nie da rady pisać z palca... musiałem wymyślić coś innego do zrobienia

        cy.visit('https://webdriveruniversity.com/Datepicker/index.html')

        const date = new Date()
        const today = date.getDate()
        const tomorrow = today + 1

        cy.get(Datepicker.input).click()
        cy.get(Datepicker.todayDay).should('have.text', today.toString())
        cy.get(Datepicker.todayDay).siblings().contains('td', tomorrow.toString()).click()
        cy.get(Datepicker.input).click()
        cy.get(Datepicker.activeDay).should('have.text', tomorrow.toString())
    })


    it('7', () => {
        // Automatyzujemy stronę Autocomplete TextField - wpisujemy 3 pierwsze znaki i wybieramy 2 element z listy podpowiadanej np. ('chi')

        cy.visit('https://webdriveruniversity.com/Autocomplete-TextField/autocomplete-textfield.html')

        cy.get(AutoComplete.input).type('Chi')
        cy.get(AutoComplete.choiceList).eq(1).click()
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

        cy.get(AjaxLoader.greenButton, {timeout: 20000}).click()
        cy.contains(AjaxLoader.closeModalButton, 'Close').click()
    })

    after(() =>{
        Cypress.on('uncaught:exception', (err, runnable) => {
            return true
        })
    })

})
