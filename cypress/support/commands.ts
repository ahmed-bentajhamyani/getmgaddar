import { AuthPage } from "cypress/pages/AuthPage";
const authPage = new AuthPage()

declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {
            login(email: string, password: string): Chainable<any>;
            signup(email: string, password: string): Chainable<any>;
        }
    }
}

Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('/auth/login')

    authPage.enterEmail(email);

    authPage.clickHidePasswordBtn();
    authPage.enterPassword(password);

    authPage.clickSubmitBtn();
})

Cypress.Commands.add('signup', (email: string, password: string) => {
    cy.visit('/auth/signup')

    authPage.enterEmail(email);

    authPage.elements.hidePasswordBtn().click();
    authPage.enterPassword(password);

    authPage.clickSubmitBtn();
})
