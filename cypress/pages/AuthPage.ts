export class AuthPage {
    elements = {
        emailInput: () => cy.get('input[formControlName="email"]'),
        hidePasswordBtn: () => cy.get('[data-cy="hide-password-btn"]'),
        passwordInput: () => cy.get('input[formControlName="password"]'),
        submitBtn: () => cy.get('[data-cy="submit-btn"]'),
    }

    enterEmail(email: string) {
        this.elements.emailInput().type(email)
    }

    clickHidePasswordBtn() {
        this.elements.hidePasswordBtn().click()
    }

    enterPassword(password: string) {
        this.elements.passwordInput().type(password)
    }

    clickSubmitBtn() {
        this.elements.submitBtn().click()
    }
}