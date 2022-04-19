import {secrets} from "../../secrets";
import {topNavigation} from "./topNavigation";

class loginPage_ {
    loginUrl = 'https://automationteststore.com/index.php?rt=account/login';
    loginInput = '#loginFrm_loginname';
    passwordInput = '#loginFrm_password';
    loginButton = 'button[title="Login"]';

    performLogin() {
        cy.url().then((url) => {
            if (url !== loginPage.loginUrl) {
                topNavigation.clickLoginButton()
            }
        })
        cy.get(this.loginInput).type(secrets.login)
        cy.get(this.passwordInput).type(secrets.password)
        cy.get(this.loginButton).click()
    }
}

export const loginPage = new loginPage_()