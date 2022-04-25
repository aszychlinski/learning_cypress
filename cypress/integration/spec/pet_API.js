const addPet = require('/cypress/support/test_data/petstore/addPetRequest.json')
const deletePet = require('/cypress/support/test_data/petstore/deletePetResponse.json')
const updatePet = require('/cypress/support/test_data/petstore/updatePetRequest.json')
const updateFormData = require('/cypress/support/test_data/petstore/updateFormData.json')
const updateFormResponse = require('/cypress/support/test_data/petstore/updateFormResponse.json')
const petAfterFormUpdate = require('/cypress/support/test_data/petstore/petAfterFormUpdate.json')

describe('Pet API tests', () => {

    const baseEndPoint = 'https://petstore.swagger.io/v2/pet';

    it('Add a new pet to the store', () => {
        cy.request('POST', baseEndPoint, addPet).then(response => {
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            expect(response.body).to.deep.equal(addPet)
        })
    })

    it('Update an existing pet', () => {
        cy.request('POST', baseEndPoint, addPet).then(postResponse => {
            expect(postResponse.body.category.name).to.equal(addPet.category.name)
            expect(postResponse.body.tags[0].name).to.equal(addPet.tags[0].name)
            cy.request('PUT', baseEndPoint, updatePet).then( putResponse => {
                expect(putResponse.body.category.name).to.equal(updatePet.category.name)
                expect(putResponse.body.tags[0].name).to.equal(updatePet.tags[0].name)
            })
        })
    })

    it('Updates a pet in the store with form data', () => {
        cy.request('POST', baseEndPoint, addPet).then(postResponse => {
            expect(postResponse.body.name).to.equal(addPet.name)
            expect(postResponse.body.status).to.equal(addPet.status)
            let endPoint = baseEndPoint + `/${postResponse.body.id}`
            cy.request(
                {
                method: 'POST',
                url: endPoint,
                form: true,
                body: updateFormData
                })
                .its('body').should('deep.equal', updateFormResponse)
                cy.request(endPoint)
                    .its('body')
                    .should('deep.equal', petAfterFormUpdate)
        })
    })

    it('Finds Pets by status', () => {
        const endPoint = baseEndPoint + '/findByStatus'
        const statuses = ['available', 'pending', 'sold']
        statuses.forEach ( status => {
            const finalEndPoint = endPoint + `?status=${status}`
            cy.request(finalEndPoint).its('body').then(body => {
                body.forEach ( animal => {
                    expect(animal.status).to.equal(status)
                })
            })
        })
    })

    it('Find pet by ID', () => {
        cy.request('POST', baseEndPoint, addPet).its('body').then( body => {
            const endPoint = baseEndPoint + `/${body.id}`
            cy.request(endPoint).then( findByIDResponse => {
                expect(findByIDResponse.body).to.deep.equal(addPet)
            })
        })
    })

    it('Deletes a pet', () => {
        cy.request('POST', baseEndPoint, addPet).then( postResponse => {
            cy.request('DELETE', baseEndPoint + '/' + postResponse.body.id).then( deleteResponse => {
                expect(deleteResponse.status).to.equal(200)
                expect(deleteResponse.body).to.deep.equal(deletePet)
            })
        })
    })
})
