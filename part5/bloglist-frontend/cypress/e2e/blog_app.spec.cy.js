describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Deneme Muttalip',
            username: 'deneme',
            password: 'salainen'
        }
        const user2 = {
            name: 'Muttalip Deneme',
            username: 'demo',
            password: 'finnish'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.request('POST', 'http://localhost:3003/api/users/', user2)
        cy.visit('http://localhost:3000')
    })
    it('Login form is shown', function() {
        cy.get('#loginForm')
    })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('deneme')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('Deneme Muttalip is logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('deneme')
            cy.get('#password').type('dedede')
            cy.get('#login-button').click()

            cy.get('.error').contains('Wrong credentials')
            cy.get('.error').should('have.css', 'border-color', 'rgb(255, 0, 0)')
        })
    })
    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'deneme', password: 'salainen' })
        })


        it('a new blog can be created', async function() {
            cy.contains('new note').click()

            cy.get('#titleBox').type('Sun Rises Before Me')
            cy.get('#authorBox').type('William Tell')
            cy.get('#urlBox').type('https://github.com/testing-library/react-testing-library/issues/371')

            cy.contains('create').click()

            cy.visit('http://localhost:3000')
            cy.contains('create').click()

        })
        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.createNote({
                    title: 'Sun Rises Before Me',
                    author: 'Montezuma',
                    url: 'https://stackoverflow.com/questions/64397742/jest-how-do-i-reset-object-state-for-each-test',
                    likes: 3
                })
                cy.createNote({
                    title: 'Cl Br I F',
                    author: 'The Alchemist',
                    url: 'https://fullstackopen.com/en/part5/end_to_end_testing#exercises-5-17-5-22'
                })
                cy.createNote({
                    title: 'Irrational Exuberance',
                    author: 'Wife of Shiller',
                    url: 'https://kentcdodds.com/blog/test-isolation-with-react',
                    likes: 5
                })
            })

            it('it can be liked', function () {
                cy.contains('Cl Br I F')
                    .contains('view').click()
                cy.contains('Cl Br I F')
                    .contains('like').click()
                cy.contains('Cl Br I F')
                    .contains('likes: 1')
            })
            it('it can be deleted', function () {
                cy.contains('Cl Br I F')
                    .contains('view').click()
                cy.contains('Cl Br I F')
                    .contains('delete').click()
                cy.get('.blogItem').contains('Cl Br I F').should('not.exist')
            })
            it('it can not be deleted by other people', function () {
                cy.login({ username: 'demo', password: 'finnish' })
                cy.contains('Cl Br I F')
                    .contains('view').click()
                cy.contains('Cl Br I F')
                    .contains('delete').should('not.exist')
            })
            it('the posts are ordered according to their likes', function(){
                cy.get('.blogItem').eq(0).should('contain', 'Irrational Exuberance')
                cy.get('.blogItem').eq(1).should('contain', 'Sun Rises Before Me')
                cy.get('.blogItem').eq(2).should('contain', 'Cl Br I F')
            })
            it('the order is updated after new likes', function(){
                cy.contains('Sun Rises Before Me')
                    .contains('view').click()
                cy.contains('Sun Rises Before Me')
                    .contains('like').click()
                cy.get('.blogItem').contains('Sun Rises Before Me')
                    .contains('likes: 4')
                cy.get('.blogItem').contains('Sun Rises Before Me')
                    .contains('like').click()
                cy.get('.blogItem').contains('Sun Rises Before Me')
                    .contains('likes: 5')
                cy.get('.blogItem').contains('Sun Rises Before Me')
                    .contains('like').click()
                cy.get('.blogItem').contains('Sun Rises Before Me')
                    .contains('likes: 6')
                cy.get('.blogItem').eq(0).contains('Sun Rises Before Me')
            })
        })
    })

})
