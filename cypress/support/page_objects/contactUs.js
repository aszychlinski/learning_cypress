class contactUs_ {
    body = 'body';
    contactReply = '#contact_reply';
    resetButton = '[type="reset"][value="RESET"]';
    submitButton = '[type="submit"][value="SUBMIT"]';

    placeholder = {
        FIRST_NAME : this.placeholder_helper('First Name'),
        LAST_NAME : this.placeholder_helper('Last Name'),
        EMAIL_ADDRESS : this.placeholder_helper('Email Address'),
        COMMENTS : this.placeholder_helper('Comments'),
    }

    placeholder_helper(value) {
        return `[placeholder="${value}"]`
    }

}

export const contactUs = new contactUs_()
