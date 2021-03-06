const deletedPetOrder = require('/cypress/support/test_data/petstore/deletedPetOrder.json');
const orderNotFound = require('/cypress/support/test_data/petstore/orderNotFound.json')
const petOrder = require('/cypress/support/test_data/petstore/petOrder.json')
const inventory = require('/cypress/support/test_data/petstore/inventory.json')

function normalize_shipDate(shipDatePath) {
    expect(shipDatePath).to.match(new RegExp('.*\\+0000$'))
    return shipDatePath.replace('+0000', 'Z')
}

describe('Store API tests', () => {

    const baseEndPoint = 'https://petstore.swagger.io/v2/store';

    it('Place an order for a pet', () => {
        const endPoint = baseEndPoint + '/order'
        // create order
        cy.request('POST', endPoint, petOrder).then(response => {
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            response.body.shipDate = normalize_shipDate(response.body.shipDate)
            expect(response.body).to.deep.equal(petOrder)
        })
    })

    it('Find purchase order by ID', () => {
        let endPoint = baseEndPoint + '/order'
        // create order
        cy.request('POST', endPoint, petOrder).then(_ => {
            endPoint += `/${petOrder.id}`
            // find order
            cy.request(endPoint).then(response => {
                response.body.shipDate = normalize_shipDate(response.body.shipDate)
                expect(response.body).to.deep.equal(petOrder)
            })
        })
    })

    it('Delete purchase order by ID', () => {
        let endPoint = baseEndPoint + '/order'
        // create order
        cy.request('POST', endPoint, petOrder).then(_ => {
            endPoint += `/${petOrder.id}`
            // delete order
            cy.request('DELETE', endPoint).then(response => {
                expect(response.body).to.deep.equal(deletedPetOrder)
                // check if order does not exist anymore
                cy.request({
                    url: endPoint,
                    failOnStatusCode: false
                }).then(response => {
                    expect(response.status).to.equal(404)
                    expect(response.body).to.deep.equal(orderNotFound)
                })
            })
        })
    })

    it('Returns pet inventories by status', () => {
        let endPoint = baseEndPoint + '/inventory'
        // get inventory
        cy.request(endPoint).then( response => {
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            // not enough information has been provided to robustly test this particular method
            // I have assumed that these keys are always present and only the value changes
            for (const key in response.body) {
                expect(Object.keys(inventory).join('|')).to.include(key)
            }
        })
    })
})
