describe('Part 1', () => {

    it('4a', () => {
        // Uzupełniamy wszystkie dane, i resetujemy - weryfikujemy czy wyczyściło poprawnie

        cy.visit('/Contact-Us/contactus.html')

        cy.get('[placeholder="First Name"]').type('Adam')
        cy.get('[placeholder="Last Name"]').type('Szychliński')
        cy.get('[placeholder="Email Address"]').type('adam.szychlinski@itmagination.com')
        cy.get('[placeholder="Comments"]').type('lubię placki')

        cy.get('[type="reset"][value="RESET"]').click()

        cy.get('[placeholder="First Name"]').should('have.value', '')
        cy.get('[placeholder="Last Name"]').should('have.value', '')
        cy.get('[placeholder="Email Address"]').should('have.value', '')
        cy.get('[placeholder="Comments"]').should('have.value', '')

    })

    it('4b', () => {
        // Wprowadzamy cześć danych i próbujemy wysłać - sprawdzamy komunikat błędu

        cy.visit('/Contact-Us/contactus.html')
        cy.get('[placeholder="Email Address"]').type('adam.szychlinski@itmagination.com')
        cy.get('[type="submit"][value="SUBMIT"]').click()
        cy.get('body').contains('Error: all fields are requiredd')

    })

})