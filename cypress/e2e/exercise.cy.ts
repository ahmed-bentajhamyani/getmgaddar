describe('Exercise page', () => {
    const userInfo = {
        email: "ahmedbentaj710@gmail.com",
        password: "12345678"
    }

    const URL = 'https://exercisedb.p.rapidapi.com/exercises/'

    beforeEach(() => {
        cy.session([userInfo.email, userInfo.password], () => {
            cy.login(userInfo.email, userInfo.password)
            cy.url().should('include', '/user')
        })
    });

    it('should show no exercise found on failure', function () {
        cy.visit('/user')

        cy.intercept('GET', URL + 'bodyPart/back', []).as('exercises')

        cy.get('[data-cy="exercise-failure-msg"]').should('have.text', 'No exercise found.')

        cy.get('[data-cy="view-more-exrcises"]').click()
        cy.get('[data-cy="failure-msg"]').should('have.text', 'No exercise found.')
    });

    it('get back exercises should return 200 as status code on success', function () {
        cy.visit('/user')

        cy.intercept('GET', URL + 'bodyPart/back').as('exercises')

        cy.wait('@exercises').its('response.statusCode').should('eql', 200);
    });

    it('get body part exercise should not return an empty array and the fetched exercises should match the body part requested', function () {
        cy.visit('/user')
        cy.get('[data-cy="view-more-exrcises"]').click()
        cy.intercept('GET', URL + 'bodyPartList').as('bodyPartList')

        cy.wait('@bodyPartList').its('response.body').then((bodyParts) => {
            const bodyPart = bodyParts[2]

            cy.get(`[data-cy=${bodyPart}]`).click()

            cy.intercept('GET', URL + 'bodyPart/' + bodyPart).as('exercises')

            cy.wait('@exercises').its('response.body').then((exercises) => {
                expect(exercises).to.not.empty
                
                const bodyPartReceived = exercises[0].bodyPart
                expect(bodyPart).to.eql(bodyPartReceived)
            })
        })
    });

    it('should display selected exercise details matching the chosen exercise', function () {
        cy.visit('/user')

        cy.intercept('GET', URL + 'bodyPart/back').as('exercises')

        cy.wait('@exercises').its('response.body').then((exercises) => {
            const exerciseName = exercises[3].name

            cy.get(`[data-cy=${exerciseName.split(' ').join('-')}]`).click()

            cy.get('[data-cy="exercise-name"]').invoke('text').then((text) => expect(text.toLowerCase()).to.equal(exerciseName));
        })
    });
});
