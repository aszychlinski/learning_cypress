class contactUs_ {
    body = 'body';
    contactReply = '#contact_reply';
    resetButton = '[type="reset"][value="RESET"]';
    submitButton = '[type="submit"][value="SUBMIT"]';

    placeholder (value) {
        return `[placeholder="${value}"]`
    }
}

export const contactUs = new contactUs_()