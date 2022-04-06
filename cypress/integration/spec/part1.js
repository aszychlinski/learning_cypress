describe('Part 1', () => {

    it('4a', () => {
        // Uzupełniamy wszystkie dane, i resetujemy - weryfikujemy czy wyczyściło poprawnie

        cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html')

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

        cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html')

        cy.get('[placeholder="Email Address"]').type('adam.szychlinski@itmagination.com')

        cy.get('[type="submit"][value="SUBMIT"]').click()
        cy.get('body').contains('Error: all fields are required')

    })

    it('4c', () => {
        // Wprowadzamy błędny email i sprawdzamy komunikat

        cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html')

        cy.get('[placeholder="First Name"]').type('Adam')
        cy.get('[placeholder="Last Name"]').type('Szychliński')
        cy.get('[placeholder="Email Address"]').type('adam.szychlinski')
        cy.get('[placeholder="Comments"]').type('lubię placki')

        cy.get('[type="submit"][value="SUBMIT"]').click()
        cy.get('body').contains('Error: Invalid email address')

    })

    it('4d', () => {
        // Wprowadzamy wszystkie dane i sprawdzamy komunikat

        cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html')

        cy.get('[placeholder="First Name"]').type('Adam')
        cy.get('[placeholder="Last Name"]').type('Szychliński')
        cy.get('[placeholder="Email Address"]').type('adam.szychlinski@itmagination.com')
        cy.get('[placeholder="Comments"]').type('lubię placki')

        cy.get('[type="submit"][value="SUBMIT"]').click()

        cy.contains('#contact_reply', 'Thank You for your Message!')

    })

    it('4f', () => {
        // Wybieramy wszystkie możliwe opcje z dropdownow i sprawdzamy ich wartości czy są poprawne

        cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html')

        for (let i = 1; i < 4; i++) {
            cy.get(`#dropdowm-menu-${i} option`).each( dropDownItem => {
                cy.wrap(dropDownItem).invoke('attr', 'value').should('equal', dropDownItem.text().toLowerCase())
            })
            for (let j = 0; j < 4; j++) {
                cy.get(`#dropdowm-menu-${i}`).select(j)
            }
        }

    })

    it('4g', () => {
        // Zaznaczamy wszystkie checkboxy a następnie odznaczamy 2 i 4 - sprawdzamy czy  zostały odznaczone i zaznaczone poprawnie

        cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html')

        cy.get('#checkboxes').find('input').check()
        cy.get('#checkboxes').find('input').eq(1).click()
        cy.get('#checkboxes').find('input').eq(3).click()

        cy.get('#checkboxes').find('input').eq(0).invoke('prop', 'checked').should('equal', true)
        cy.get('#checkboxes').find('input').eq(1).invoke('prop', 'checked').should('equal', false)
        cy.get('#checkboxes').find('input').eq(2).invoke('prop', 'checked').should('equal', true)
        cy.get('#checkboxes').find('input').eq(3).invoke('prop', 'checked').should('equal', false)

    })

})