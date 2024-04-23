import { AuthPage } from "cypress/pages/AuthPage";

const authPage = new AuthPage();

describe('Login page', () => {
    it('should show error message when email is missing', () => {
        cy.visit('/auth/login')

        authPage.elements.emailInput().click();

        authPage.clickHidePasswordBtn();
        authPage.enterPassword('12345678')

        cy.get('[data-cy="email-error-msg"]').should('have.text', 'Email is required.')
    });

    it('should show error message when email format is invalid', () => {
        cy.visit('/auth/login')

        authPage.enterEmail('ahmedbentaj710@gmail.')

        authPage.clickHidePasswordBtn();
        authPage.enterPassword('12345678')

        cy.get('[data-cy="email-error-msg"]').should('have.text', 'Invalid email format.')
    });

    it('should show error message when password is missing', () => {
        cy.visit('/auth/login')

        authPage.enterEmail('ahmedbentaj710@gmail.')

        authPage.clickHidePasswordBtn();
        authPage.elements.passwordInput().click().blur();

        cy.get('[data-cy="password-error-msg"]').should('have.text', 'Password is required.')
    });

    it('should redirect to user dashboard when creds are correct', () => {
        cy.login("ahmedbentaj710@gmail.com", "12345678")

        cy.url().should('include', '/user')
    });

    it('should show error message when creds are incorrect', () => {
        cy.login("ahmed-bentaj@outlook.fr", "123456")

        cy.get('[data-cy="login-error-msg"]').should('have.text', 'Invalid login credentials!')
    });
});
