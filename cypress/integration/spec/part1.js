class AjaxLoader {
    static greenButton = '#myDiv[style="display: block;"] p';
    static closeModalButton = 'div[class="modal-footer"] button[data-dismiss="modal"]';
}

class AutoComplete {
    static input = '#myInput';
    static choiceList = '#myInputautocomplete-list div';
}

class ContactUs {
    static body = 'body';
    static contactReply = '#contact_reply';
    static resetButton = '[type="reset"][value="RESET"]';
    static submitButton = '[type="submit"][value="SUBMIT"]';

    static placeholder (value) {
        return `[placeholder="${value}"]`
    }
}

class Datepicker {
    static todayDay = '[class="today day"]';
    static activeDay = '[class="active day"]';
    static input = '#datepicker input';
}

class DropCheckRadio {
    static checkBoxes = '#checkboxes';
    static radioButtons = '#radio-buttons';
    static allDropDownMenus = '[id^=dropdowm-menu-]';

    static paramDropDownMenu(value) {
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
        cy.get(AjaxLoader.closeModalButton).click()

    })

    after(() =>{
        Cypress.on('uncaught:exception', (err, runnable) => {
            return true
        })
    })
})
