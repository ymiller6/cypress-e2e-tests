// support/helpers.ts

export const captureOrderNameFromResponse = (aliasName = 'orderNameFromResponse') => {
    cy.wait('@saveOrder').then((interception) => {
      if (
        interception.response &&
        interception.response.body &&
        interception.response.body.order &&
        interception.response.body.order.length > 0
      ) {
        const orderName = interception.response.body.order[0].orderName;
        cy.wrap(orderName).as(aliasName); //  Save as Cypress alias
        cy.log(`Captured Order Name from Response: ${orderName}`);
      } else {
        throw new Error('Response structure is not as expected');
      }
    });
  };