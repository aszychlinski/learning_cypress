class ContactUs {
    static body = 'body';
    static contactReply = '#contact_reply';
    static resetButton = '[type="reset"][value="RESET"]';
    static submitButton = '[type="submit"][value="SUBMIT"]';

    static placeholder (value) {
        return `[placeholder="${value}"]`
    }
}

class DropCheckRadio {
    static checkBoxes = '#checkboxes';
    static radioButtons = '#radio-buttons';
    static allDropDownMenus = '[id^=dropdowm-menu-]';

    static paramDropDownMenu (value) {
        return `[id^=dropdowm-menu-${value}]`
    }
}

describe('Part 1', () => {

    it('4a', () => {
        // Uzupełniamy wszystkie dane, i resetujemy - weryfikujemy czy wyczyściło poprawnie

        cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html')

        cy.get(ContactUs.placeholder('First Name')).type('Adam')
        cy.get(ContactUs.placeholder('Last Name')).type('Szychliński')
        cy.get(ContactUs.placeholder('Email Address')).type('adam.szychlinski@itmagination.com')
        cy.get(ContactUs.placeholder('Comments')).type('lubię placki')

        cy.get(ContactUs.resetButton).click()

        cy.get(ContactUs.placeholder('First Name')).should('have.value', '')
        cy.get(ContactUs.placeholder('Last Name')).should('have.value', '')
        cy.get(ContactUs.placeholder('Email Address')).should('have.value', '')
        cy.get(ContactUs.placeholder('Comments')).should('have.value', '')

    })

    it('4b', () => {
        // Wprowadzamy cześć danych i próbujemy wysłać - sprawdzamy komunikat błędu

        cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html')

        cy.get(ContactUs.placeholder('Email Address')).type('adam.szychlinski@itmagination.com')

        cy.get(ContactUs.submitButton).click()
        cy.get('body').contains('Error: all fields are required')

    })

    it('4c', () => {
        // Wprowadzamy błędny email i sprawdzamy komunikat

        cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html')

        cy.get(ContactUs.placeholder('First Name')).type('Adam')
        cy.get(ContactUs.placeholder('Last Name')).type('Szychliński')
        cy.get(ContactUs.placeholder('Email Address')).type('adam.szychlinski')
        cy.get(ContactUs.placeholder('Comments')).type('lubię placki')

        cy.get(ContactUs.submitButton).click()
        cy.get(ContactUs.body).contains('Error: Invalid email address')

    })

    it('4d', () => {
        // Wprowadzamy wszystkie dane i sprawdzamy komunikat

        cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html')

        cy.get(ContactUs.placeholder('First Name')).type('Adam')
        cy.get(ContactUs.placeholder('Last Name')).type('Szychliński')
        cy.get(ContactUs.placeholder('Email Address')).type('adam.szychlinski@itmagination.com')
        cy.get(ContactUs.placeholder('Comments')).type('lubię placki')

        cy.get(ContactUs.submitButton).click()

        cy.contains(ContactUs.contactReply, 'Thank You for your Message!')

    })

    it('4f', () => {
        // Wybieramy wszystkie możliwe opcje z dropdownow i sprawdzamy ich wartości czy są poprawne

        cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html')

        cy.get(DropCheckRadio.allDropDownMenus).each( (dropdown, dropDownIndex) => {
            dropDownIndex += 1
            cy.get(DropCheckRadio.paramDropDownMenu(dropDownIndex)).find('option').each( (option, optionIndex) => {
                cy.get(DropCheckRadio.paramDropDownMenu(dropDownIndex)).select(optionIndex)
                cy.wrap(option).invoke('attr', 'value').should('equal', option.text().toLowerCase())
            })
        })

    })

    it('4g', () => {
        // Zaznaczamy wszystkie checkboxy a następnie odznaczamy 2 i 4 - sprawdzamy czy  zostały odznaczone i zaznaczone poprawnie

        cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html')

        cy.get(DropCheckRadio.checkBoxes).find('input').check()
        cy.get(DropCheckRadio.checkBoxes).find('input').eq(1).click()
        cy.get(DropCheckRadio.checkBoxes).find('input').eq(3).click()

        cy.get(DropCheckRadio.checkBoxes).find('input').eq(0).invoke('prop', 'checked').should('equal', true)
        cy.get(DropCheckRadio.checkBoxes).find('input').eq(1).invoke('prop', 'checked').should('equal', false)
        cy.get(DropCheckRadio.checkBoxes).find('input').eq(2).invoke('prop', 'checked').should('equal', true)
        cy.get(DropCheckRadio.checkBoxes).find('input').eq(3).invoke('prop', 'checked').should('equal', false)

    })

    it('4h', () => {
        // Klikamy wszystkie Radio buttony po każdym kliknięciu sprawdzamy czy zaznaczył się ten który chcieliśmy

        cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html')

        cy.get(DropCheckRadio.radioButtons).find('input').each((radioButton) => {
            cy.wrap(radioButton).check()
            cy.wrap(radioButton).check().invoke('prop', 'checked').should('equal', true)
        })

    })
})
