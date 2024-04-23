describe('Gym page', () => {
    const userInfo = {
        email: "ahmedbentaj710@gmail.com",
        password: "12345678"
    }
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:4200/assets/open-gym.json', (req) => {
            // Add headers to prevent caching
            req.headers['Cache-Control'] = 'no-cache';
            req.headers['Pragma'] = 'no-cache';
        }).as('openGyms')

        cy.login(userInfo.email, userInfo.password)
        cy.url().should('include', '/user');
    });

    it('the status code of th fetch should equal 200', function () {
        cy.wait('@openGyms').its('response.statusCode').should('eql', 200)
    });

    it('the fetched data should matches the data from the JSON file', function () {
        cy.wait('@openGyms').its('response.body').then((res) => {
            cy.fixture('open-gym.json').then((jsonData) => {
                expect(res).to.deep.equal(jsonData);
            });
        })
    });
});

