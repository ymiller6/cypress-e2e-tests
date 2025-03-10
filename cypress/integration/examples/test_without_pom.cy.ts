describe('Test order Case basic without POM', () => {
  let capturedToasterText: string;
  let capturedResposeText: string;

  it('GID-1007: E2E without Page Object', () => {
    //login
    cy.visit('https://qa-candidates.labos.cloud/2/login');
    cy.get('input[placeholder="User"]').type('qa');
    cy.get('input[placeholder="Password"]').type('123');
    cy.contains('button', 'Login').click();

    // Open menu and search for order
    cy.wait(2000);
    cy.get('[data-cy="st-button-menu"]').click();
    cy.get('#menuSearchInput').type('order')
    cy.contains('a', 'Order').click();

    //3.Search and select the facility QA Facility from the autocomplete panel
    cy.get('#mat-mdc-form-field-label-12').should('be.visible'); //verify label exists
    cy.get('#mat-input-5').type('qa');
    cy.contains('QA Facility').click();
    cy.get('#mat-input-5').should('have.value', 'QA Facility (10000363)')

    //4.Verify that the physician Dr. Hunter Atkinson (A98185) was auto-inserted and exists in the Physician field.
    cy.get('#mat-input-6').should('have.value', 'Dr. Hunter Atkinson (A98185)')

    //5.Search and select the patient Qa Patient from the autocomplete panel
    cy.get('#mat-input-7').type('Qa P');
    cy.contains('Qa Patient').click();

    //6.Hover the star of the Albumin blood test and verify that the text SST appears in the tooltip.
    cy.get('.RED > .d-flex > .mat-icon')
      .invoke('text')
      .then((rawText: string) => {
        // Remove non-breaking spaces and trim the text
        const normalized = rawText.replace(/\u00a0/g, '').trim();
        expect(normalized).to.eq('star');
      });

    //7.Mark the Albumin checkbox and verify the test was added to the ordered tests list as “109 - ALB”.
    cy.get('input[type="checkbox"]').check().should('be.checked').and('have.value', 'on');
    cy.get('body').should('be.visible').and('contain.text', '109 - ALB');

    //.8 click on Save
    cy.wait(2000);

    //intercept url befor click on save:
    cy.intercept('https://qa-candidates.labos.cloud/api/lab/order**').as('saveOrder');
    cy.contains('Save').click();

    cy.wait('@saveOrder').then((interception) => {
      // Ensure the response exists and has the expected structure
      if (interception.response && interception.response.body && interception.response.body.order && interception.response.body.order.length > 0) {
        capturedResposeText = interception.response.body.order[0].orderName;
        cy.log("Captured order name:", capturedResposeText);
      } else {
        throw new Error("Response structure is not as expected");
      }
    });

    //9.Verify that the order name, which appears in the “Order saved successfully” toast message, is the same as was
    //returned from the BE in the POST /order request.
    cy.get('.st-font-18.st-bold.st-ellipsis.st-tooltip-trigger', { timeout: 5000 }).should('be.visible')
      .invoke('text')
      .then((text) => {
        capturedToasterText = text.trim().split("Order ")[1].split(" ")[0] // Assign the value to the scoped variable
        cy.log(`Toaster Text: ${capturedToasterText}`)
        expect(capturedToasterText).equal(capturedResposeText)
      });

    //10.Verify that the input fields have returned to their initial, empty, state
    cy.get('#mat-input-5').should('have.value', '')
    cy.get('#mat-input-6').should('have.value', '')
    cy.get('#mat-input-7').should('have.value', '')

    //11.When trying to save an order while missing mandatory data, the empty fields should become red, and the focus should move to the first empty field.
    cy.contains('Save').click();
    cy.get('#mat-input-5').should('have.focus')
    cy.get('#mat-mdc-form-field-label-12')
      .should('have.css', 'color', 'rgb(210, 0, 0)');

    cy.get('#mat-input-5').type('qa');
    cy.contains('QA Facility').click();
    cy.contains('Save').click();
    cy.get('#mat-input-7').should('have.focus')
    cy.contains('Patient')
      .should('have.css', 'color', 'rgb(210, 0, 0)');

  })

});
