const userCreateWith = require('/cypress/support/test_data/petstore/userCreateWith.json')
const userUpdate = require('/cypress/support/test_data/petstore/userUpdate.json')

function verify_response_ok(response, status = 200, statusText = 'OK') {
    expect(response.status).to.equal(status)
    expect(response.statusText).to.equal(statusText)
}

function verify_response_body(response, code = 200, type = 'unknown', message = 'ok') {
    expect(response.body.code).to.equal(code)
    expect(response.body.type).to.equal(type);
    expect(response.body.message).to.equal(message)
}

describe('User API tests', () => {

    const baseEndPoint = 'https://petstore.swagger.io/v2/user';

    it('Create with array', () => {
        const endPoint = baseEndPoint + '/createWithArray'
        // create users
        cy.request('POST', endPoint, userCreateWith).then(response => {
            verify_response_ok(response)
            verify_response_body(response)
        })
    })

    it('Create with list', () => {
        // functionality of this endpoint is the same as above but a separate test case is made to maintain atomicity
        const endPoint = baseEndPoint + '/createWithList'
        // create multiple users
        cy.request('POST', endPoint, userCreateWith).then(response => {
            verify_response_ok(response)
            verify_response_body(response)
        })
    })

    it('Get user by user name', () => {
        const userName = userCreateWith[0].username
        let endPoint = baseEndPoint + '/createWithList'
        // create multiple users
        cy.request('POST', endPoint, userCreateWith).then(_ => {
            endPoint = baseEndPoint + `/${userName}`
            // get user
            cy.request(endPoint, userName).then(response => {
                verify_response_ok(response)
                expect(response.body).to.deep.equal(userCreateWith[0])
            })
        })
    })

    it('Updates user', () => {
        const userName = userCreateWith[1].username
        let endPoint = baseEndPoint + '/createWithList'
        // create multiple users
        cy.request('POST', endPoint, userCreateWith).then(_ => {
            endPoint = baseEndPoint + `/${userName}`
            // update one user
            cy.request('PUT', endPoint, userUpdate).then(response => {
                verify_response_body(response, 200, 'unknown', userCreateWith[1].id.toString())
            }).then(_ => {
                endPoint = baseEndPoint + `/${userName}`
                // get the updated user
                cy.request(endPoint, userName).then(response => {
                    verify_response_ok(response)
                    expect(response.body).to.deep.equal(userUpdate)
                })
            })
        })
    })

    it('Delete user', () => {
        const userName = userCreateWith[0].username
        let endPoint = baseEndPoint + '/createWithList'
        // create multiple users
        cy.request('POST', endPoint, userCreateWith).then(_ => {
            endPoint = baseEndPoint + `/${userName}`
            // delete user
            cy.request('DELETE', endPoint, userName).then(response => {
                verify_response_ok(response)
                verify_response_body(response, 200, 'unknown', userName)
            }).then(_ => {
                // attempt to GET deleted user to make sure it's gone
                cy.request({
                    url: endPoint,
                    body: userName,
                    failOnStatusCode: false
                }).then(response => {
                    verify_response_ok(response, 404, 'Not Found')
                    verify_response_body(response, 1, 'error', 'User not found')
                })
            })
        })
    })

    it('Login user into the system', () => {
        let endPoint = baseEndPoint + '/login'
        // login
        cy.request(
            {
                url: endPoint,
                form: true,
                body: {
                    username: userCreateWith[1].username,
                    password: userCreateWith[1].password
                }
            }).then(response => {
            verify_response_ok(response)
            expect(response.body.code).to.equal(200)
            expect(response.body.type).to.equal('unknown')
            expect(response.body.message).to.match(new RegExp('logged in user session:[0-9]{13}$'))
        })
    })

    it('Logs out current logged in user session', () => {
        const endPoint = baseEndPoint + '/logout'
        // logout
        cy.request(endPoint).then(response => {
            verify_response_ok(response)
        })
    })

    it('Create user', () => {
        const userName = userCreateWith[1].username
        let endPoint = baseEndPoint + `/${userName}`
        // delete user in case it is left over from other tests
        cy.request({
            method: 'DELETE',
            url: endPoint,
            body: userName,
            failOnStatusCode: false
        }).then(_ => {
            endPoint = baseEndPoint
            // create single user
            cy.request('POST', endPoint, userUpdate).then(response => {
                verify_response_ok(response)
                verify_response_body(response, 200, 'unknown', userCreateWith[1].id.toString())
            })
        })
    })
})


