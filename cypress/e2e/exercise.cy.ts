describe('Exercise page', () => {
    beforeEach(() => {
        cy.login("ahmedbentaj710@gmail.com", "12345678")
        cy.url().should('include', '/user');
    });

    it('should show no exercise found on failure', function () {
        cy.intercept('GET', 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back', []).as('exercises')

        cy.get('[data-cy="exercise-failure-msg"]').should('have.text', 'No exercise found.')

        cy.get('[data-cy="view-more-exrcises"]').click()
        cy.get('[data-cy="failure-msg"]').should('have.text', 'No exercise found.')
    });

    it('get back exercises should return 200 as status code on success', function () {
        cy.intercept('GET', 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back').as('exercises')

        cy.wait('@exercises').its('response.statusCode').should('eql', 200);
    });
});
