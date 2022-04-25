import deletedPetOrder from '../../support/test_data/petstore/deletedPetOrder.json';
import orderNotFound from '../../support/test_data/petstore/orderNotFound.json';
import petOrder from '../../support/test_data/petstore/petOrder.json';
import inventory from '../../support/test_data/petstore/inventory.json';

function normalize_shipDate(shipDatePath): string {
    expect(shipDatePath).to.match(new RegExp('.*\\+0000$'))
    return shipDatePath.replace('+0000', 'Z')
}

describe('Store API tests', () => {

    const baseEndPoint: string = 'https://petstore.swagger.io/v2/store';

    it('Place an order for a pet', () => {
        const endPoint: string = baseEndPoint + '/order'
        // create order
        cy.request('POST', endPoint, petOrder).then(response => {
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            response.body.shipDate = normalize_shipDate(response.body.shipDate)
            expect(response.body).to.deep.equal(petOrder)
        })
    })

    it('Find purchase order by ID', () => {
        let endPoint: string = baseEndPoint + '/order'
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
        let endPoint: string = baseEndPoint + '/order'
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
        let endPoint: string = baseEndPoint + '/inventory'
        // get inventory
        cy.request(endPoint).then( response => {
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            // it turns out the response to this call is dependent on what other users do
            // this is unpredictable and untestable (properly)
            expect(Object.keys(response.body)).to.include('sold')
            expect(Object.keys(response.body)).to.include('available')
            expect(Object.keys(response.body)).to.include('pending')
        })
    })
})
