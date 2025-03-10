/// <reference types="Cypress" />
describe('My First Test Suite', function () {
    it('Example-1: run over the response with my own body', function () {
        cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
            {
                statusCode: 200,
                body: [{
                    "book_name": "RestAssured with Java",
                    "isbn": "RSU",
                    "aisle": "2301"
                }]
            }).as('bookretrievals')
        cy.get("button[class='btn btn-primary']").click()



        cy.wait('@bookretrievals').then(({ request, response }) => {
            cy.get('tr').should('have.length', response.body.length + 1)
        })
        cy.get('p').should('have.text', 'Oops only 1 Book available')
    })

    it('Example-2: update the reuest to non authorized user expected 403', function () {

        cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
            (req) => {
                req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"

                req.continue((res) => {
                    // expect(res.statusCode).to.equal(403)
                })
            }
        ).as("dummyUrl")

        cy.get("button[class='btn btn-primary']").click()
        cy.wait('@dummyUrl')

    })

    it('Example-3: post a request and check message and status', function () {

        cy.request('POST', 'http://216.10.245.166/Library/AddBook.php', {
            "name": "Learn Appuim",
            "isbn": "bcdss",
            "aisle": "John foe"
        }).then(function (response) {
            expect(response.body).to.have.property('Msg', 'succesfully added')
            expect(response.statusCode).to.eq(200)
        })
    })

})