describe('Home page', () => {
  it('should have title', () => {
    cy.visit('/')
    cy.contains('Find your strengt')
  });

  it('should redirect to the login page', () => {
    cy.visit('/');
    cy.get('[data-cy="login-btn"]').click();
    cy.url().should('include', '/auth/login');
  });

  it('should redirect to the signup page', () => {
    cy.visit('/');
    cy.get('[data-cy="signup-btn"]').click();
    cy.url().should('include', '/auth/signup');
  });
})
