describe('User page', () => {
    const userInfo = {
        email: "ahmedbentaj710@gmail.com",
        password: "12345678",
        name: "new name",
        age: "25",
        height: "188",
        weight: "95",
        targetWeight: "82"
    }

    beforeEach(() => {
        cy.session([userInfo.email, userInfo.password], () => {
            cy.login(userInfo.email, userInfo.password)
            cy.url().should('include', '/user')
        })
    });

    it('dashboard email should match the authenticated user email', function () {
        cy.visit('/user')

        cy.get('[data-cy="user-email"]').should('have.text', userInfo.email)
    });

    it('update user information', function () {
        cy.visit('/user')

        cy.get('[data-cy="view-more-user"]').click()
        cy.wait(1000)
        cy.get('[data-cy="edit-user-btn"]').click()

        cy.get('input[formControlName="name"]').clear().type(userInfo.name)
        cy.get('input[formControlName="age"]').clear().type(userInfo.age)
        cy.get('input[formControlName="height"]').clear().type(userInfo.height)
        cy.get('input[formControlName="weight"]').clear().type(userInfo.weight)
        cy.get('input[formControlName="target-weight"]').clear().type(userInfo.targetWeight + '{enter}')


        cy.get('[data-cy="user-name"]').should('contain', userInfo.name)
        cy.get('[data-cy="user-age"]').should('contain', userInfo.age)
        cy.get('[data-cy="user-email"]').should('contain', userInfo.email)
        cy.get('[data-cy="user-height"]').should('contain', userInfo.height)
        cy.get('[data-cy="user-weight"]').should('contain', userInfo.weight)
        cy.get('[data-cy="user-target-weight"]').should('contain', userInfo.targetWeight)
    });
});
