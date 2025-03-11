/// <reference types="cypress" />
import LoginPage from "./LoginPage";
import OrderPage from "./OrderPage";
import userData from "./userData";




describe("FLD-102: E2E Order Test using POM with Alias", () => {

  const loginPage = new LoginPage();
  const orderPage = new OrderPage();

  it("GID-1005: should complete the order process and validate order name from toast", () => {
    
    // Step 1: Login
    loginPage.navigate();
    loginPage.login(userData.validUser.username, userData.validUser.password);

    // Step 2: Open Menu and Navigate to Order Screen
    orderPage.openMenu();
    orderPage.searchForOrder("order");

    // Step 3: Search and Select Facility
    orderPage.selectFacility("QA Facility");

    // Step 4: Verify that the Physician field is auto-populated
    orderPage.verifyPhysicianField("Dr. Hunter Atkinson (A98185)");

    // Step 5: Search and Select Patient
    orderPage.searchAndSelectPatient("Qa P", "Qa Patient");

    // Step 6: Hover over star icon and verify tooltip text is "star"
    orderPage.verifyStarTooltip("SST");

    // Step 7: Mark Albumin test checkbox and verify ordered tests list contains "109 - ALB"
    orderPage.markAlbuminTest();

    cy.get('button:contains("Save")') 
    .should('be.visible')
    .and('be.enabled');

    // Step 8: Intercept API call for saving order and click Save
    
    cy.intercept('https://qa-candidates.labos.cloud/api/lab/order**').as('saveOrder');
    
    orderPage.saveOrder();

    // Wait for the API call and capture order name from response
    cy.wait('@saveOrder').then((interception) => {
      if (
        interception.response &&
        interception.response.body &&
        interception.response.body.order &&
        interception.response.body.order.length > 0
      ) {
        const orderName = interception.response.body.order[0].orderName;
        cy.wrap(orderName).as('orderNameFromResponse'); // Save as alias
        cy.log("Response order name:", orderName);
        
      } else {
        throw new Error("Response structure is not as expected");
      }
    });

   //Step 9: Verify the toast message's order name matches the API response-Alias 
cy.get('@orderNameFromResponse').then((orderName) => {
  orderPage.verifyOrderToastMessage(orderName);
});

    // Step 10: Verify that the input fields are empty after save
     orderPage.verifyInputFieldsEmpty();

    // Step 11: Verify mandatory field alerts when trying to save with missing data
     orderPage.verifyMandatoryFieldAlerts();
  });
});