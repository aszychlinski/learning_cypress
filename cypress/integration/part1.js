describe('Part 1', () => {

    it('7', () => {
        // Automatyzujemy stronę Autocomplete TextField - wpisujemy 3 pierwsze znaki i wybieramy 2 element z listy podpowiadanej np. ('chi')

        cy.visit('https://webdriveruniversity.com/Autocomplete-TextField/autocomplete-textfield.html')

        cy.get('#myInput').type('Chi')
        cy.get('#myInputautocomplete-list div').eq(1).click()
    })

    before(() => {
        // the button appears after 5 seconds but set 20 to be safe
        Cypress.config('defaultCommandTimeout', 20000)

        // the website is throwing an uncaught exception when visited by cypress, but it does not appear to
        // interfere with application functionality
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
    })

    it('8', () => {
        // Automatyzujemy stronę Ajax-Loader - czekamy aż strona się załaduje(bez statycznych waitow) i klikamy guzik

        cy.visit('https://webdriveruniversity.com/Ajax-Loader/index.html')

        cy.get('#myDiv[style="display: block;"] p').click()
        cy.contains('[data-dismiss="modal"]', 'Close').click()
    })

    after(() =>{
        Cypress.config('defaultCommandTimeout', 4000)
        Cypress.on('uncaught:exception', (err, runnable) => {
            return true
        })
    })

})
