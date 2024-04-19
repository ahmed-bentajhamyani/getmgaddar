describe('Signup page', () => {
    it('should show error message when email is missing', () => {
        cy.visit('/auth/signup')

        cy.get('input[formControlName="email"]').click();

        cy.get('[data-cy="hide-password-btn"]').click();
        cy.get('input[formControlName="password"]').type('12345678');

        cy.get('[data-cy="email-error-msg"]').should('have.text', 'Email is required.');
    });

    it('should show error message when email format is invalid', () => {
        cy.visit('/auth/signup')

        cy.get('input[formControlName="email"]').type('ahmedbentaj710@gmail.');

        cy.get('[data-cy="hide-password-btn"]').click();
        cy.get('input[formControlName="password"]').type('12345678');

        cy.get('[data-cy="email-error-msg"]').should('have.text', 'Invalid email format.');
    });

    it('should show error message when password is missing', () => {
        cy.visit('/auth/signup')

        cy.get('input[formControlName="email"]').type('ahmedbentaj710@gmail.');

        cy.get('[data-cy="hide-password-btn"]').click();
        cy.get('input[formControlName="password"]').click().blur();

        cy.get('[data-cy="password-error-msg"]').should('have.text', 'Password is required.');
    });

    it('should redirect to user dashboard when provided infos are perfect', () => {
        // generate random email for test
        var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
        var string = '';
        for (var i = 0; i < 10; i++) {
            string += chars[Math.floor(Math.random() * chars.length)];
        }
        const randomEmail = string + '@domain.com';

        cy.signup(randomEmail, "12345678")

        cy.url().should('include', '/user');
    });

    it('should show error message when the email is already in use or the password is too short', () => {
        cy.signup("ahmed-bentaj@outlook.f", "123456")

        cy.get('[data-cy="signup-error-msg"]').should('exist');
    });
})
