declare namespace Cypress {
    interface Chainable<Subject = any> {
        login(email: string, password: string): Chainable<any>;
    }
}

declare namespace Cypress {
    interface Chainable<Subject = any> {
        signup(email: string, password: string): Chainable<any>;
    }
}

Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('/auth/login')

    cy.get('input[formControlName="email"]').type(email);

    cy.get('[data-cy="hide-password-btn"]').click();
    cy.get('input[formControlName="password"]').type(password);

    cy.get('[data-cy="submit-btn"]').click();
})

Cypress.Commands.add('signup', (email: string, password: string) => {
    cy.visit('/auth/signup')

    cy.get('input[formControlName="email"]').type(email);

    cy.get('[data-cy="hide-password-btn"]').click();
    cy.get('input[formControlName="password"]').type(password);

    cy.get('[data-cy="submit-btn"]').click();
})
