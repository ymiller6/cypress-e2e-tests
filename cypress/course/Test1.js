/// <reference types="Cypress" />


describe('yoni suit', () =>
{
  
  it('test My First', () =>
{
  //tests
  cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
  cy.get('.search-keyword').type('ca')
  cy.wait(2000)
  //cy.get('.product:visible').should('have.length', 4)
  cy.get('.products').find('.product').should('have.length', 4)
  cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()
  
  cy.get('.products').find('.product').each(($el, index, $list) => {
    const textVeg = $el.find('h4.product-name').text()
    if(textVeg.includes('Cash')){
      cy.wrap($el).find('button').click()

      cy.get('.brand').then(function(logoelement) {
        cy.log(logoelement.text())
      })
    }
  })

  })

  
  it('test My Second', () =>
    {
      //tests
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
      cy.get('.search-keyword').type('ca')
      cy.wait(2000)
      //cy.get('.product:visible').should('have.length', 4)
      cy.get('.products').find('.product').should('have.length', 4)
      cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()
      
      cy.get('.products').find('.product').each(($el) => {
      cy.wrap($el).find('h4.product-name').invoke('text').then((textVeg) => {
          if (textVeg.includes('Cash')) {
            cy.wrap($el).find('button').click();
            // Add assertions here to verify the click
            //cy.wrap($el).find('button').should('be.disabled'); //example assertion.
        }
      })
    
      })
  
  })

  it('shetty course practice', () => {
//static drop down
cy.get('select').select('option2').should('have.value', 'option2')

// dynamic drop down:
cy.get('#mat-input-5').type('QA ')
cy.get('.ul-menue-items div').each(($el, indexedDB, $list) => {
  if($el.text() === 'QA ' ){
    cy.wrap($el).click()
  }
})

//check item is visible:
cy.get('label').should('be.visible')

//check box validate:
cy.get('[value="checkbox1]').check().should('be.checked')
cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
cy.get('input[type="checkbox"]').check(['option2','option3'])

// hover
cy.get('#mouseover').invoke('show')

//for loop and split:
cy.get('selector').each($e1 => {
  const amount = Number($e1.text().split(" ")[1].trim())
})
},
)

    // Pause for debugging
    cy.wait(2000);

 // Hover over the star icon and assert tooltip text
      cy.get('label')
      .contains('QA')
      .parent()
      .contains('star')
      .trigger('mouseover'); // Simulate hover

cy.get('[sttooltip="bottom"]').eq(1).invoke('show').should('have.text', 'Netlims NJ Laboratory')

  });


