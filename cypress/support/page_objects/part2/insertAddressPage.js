class insertAddressPage_ {
    continueButton = 'button[title="Continue"][type="submit"]';
    dropdownWithError = 'div[class="form-group has-error"]';
    firstNameInput = 'input#AddressFrm_firstname';
    lastNameInput = 'input#AddressFrm_lastname';
    addressOneInput = 'input#AddressFrm_address_1';
    cityInput = 'input#AddressFrm_city';
    regionStateDropdown = 'select#AddressFrm_zone_id';
    postCodeInput = 'input#AddressFrm_postcode';
    mandatoryFields = [this.firstNameInput, this.lastNameInput, this.addressOneInput, this.cityInput, this.postCodeInput]

    generateString(length) {
        let result           = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    clickContinueButton() {
        cy.get(this.continueButton).click()
    }

    verifyAmountOfErrorsEquals(amount) {
        cy.get(this.dropdownWithError).should('have.lengthOf', amount)
    }

    getFirstNameInput() {
        return cy.get(this.firstNameInput);
    }

    getLastNameInput() {
        return cy.get(this.lastNameInput);
    }

    getAddressOneInput() {
        return cy.get(this.addressOneInput);
    }

    getCityInput() {
        return cy.get(this.cityInput);
    }

    getRegionStateDropdown() {
        return cy.get(this.regionStateDropdown);
    }

    getPostCodeInput() {
        return cy.get(this.postCodeInput);
    }

    clearAllFields() {
        for(const field of this.mandatoryFields) {
            cy.get(field).clear()
        }
    }

    testLowerBoundary() {
        this.clearAllFields()
        this.getAddressOneInput().type(this.generateString(2))
        this.getCityInput().type(this.generateString(2))
        this.getPostCodeInput().type(this.generateString(1))
        this.clickContinueButton()
    }

    testUpperBoundary() {
        this.clearAllFields()
        this.getFirstNameInput().type(this.generateString(33))
        this.getLastNameInput().type(this.generateString(33))
        this.getAddressOneInput().type(this.generateString(129))
        this.getCityInput().type(this.generateString(129))
        this.getPostCodeInput().type(this.generateString(11))
        this.clickContinueButton()
    }

    testCorrectData() {
        this.clearAllFields()
        this.getFirstNameInput().type(this.generateString(24))
        this.getLastNameInput().type(this.generateString(24))
        this.getAddressOneInput().type(this.generateString(96))
        this.getCityInput().type(this.generateString(96))
        this.getRegionStateDropdown().select('Swansea')
        this.getPostCodeInput().type(this.generateString(8))
        this.clickContinueButton()
    }
}

export const insertAddressPage = new insertAddressPage_()