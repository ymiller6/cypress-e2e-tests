

import BasePage from "./basePage";

export default class OrderPage extends BasePage {
  // Selectors
  private menuButton: string = '[data-cy="st-button-menu"]';
  private menuSearchInput: string = '#menuSearchInput';
  
  private facilityLabel: string = '#mat-mdc-form-field-label-12';
  private facilityInput: string = '#mat-input-5';
  private physicianField: string = '#mat-input-6';
  private patientInput: string = '#mat-input-7';
  private starIcon: string = '.RED > .d-flex > .mat-icon';
  private starTooltip: string = '.st-tooltip';
  private albuminCheckbox: string = 'input[type="checkbox"]';
  
  private saveButton: string = 'button:contains("Save")';
  private orderToast: string = '.st-font-18.st-bold.st-ellipsis.st-tooltip-trigger';

  /**
   * Opens the side menu.
   */
  openMenu(): void {
    this.clickElement(this.menuButton);
  }

  /**
   * Navigate order link by typing order and select link.
   * @param keyword - The text to search for
   */
  searchForOrder(keyword: string): void {
    this.typeText(this.menuSearchInput, keyword);
    cy.contains('a', 'Order').click();
  }

  /**
   * Selects a facility from the autocomplete panel.
   * @param facility - The facility text to search and select (e.g., "QA Facility")
   */
  selectFacility(facility: string): void {
    this.waitForElement(this.facilityLabel);
    this.typeText(this.facilityInput, facility);
    cy.contains(facility).click();
    cy.get(this.facilityInput).should('have.value', `${facility} (10000363)`);
  }

  /**
   * Verifies the physician field contains the expected value.
   * @param expected - Expected physician value
   */
  verifyPhysicianField(expected: string): void {
    cy.get(this.physicianField).should('have.value', expected);
  }

  /**
   * Searches for a patient and selects it.
   * @param partial - The partial patient text to type (e.g., "Qa P")
   * @param full - The full patient name to select (e.g., "Qa Patient")
   */
  searchAndSelectPatient(partial: string, full: string): void {
    this.typeText(this.patientInput, partial);
    cy.contains(full).click();
  }

  /**
   * Hovers over the star icon and verifies the tooltip text.
   * @param expectedTooltip - Expected tooltip text (e.g., "SST")
   */
  verifyStarTooltip(expectedTooltip: string): void {
    // Step 1: Hover over the star icon to trigger the tooltip
    cy.get(this.starIcon).trigger('mouseover', { force: true });
    
    // Step 2: Wait for the tooltip element to appear and verify its text
    cy.get(this.starTooltip).should('contain', expectedTooltip); 
  }

  /**
   * Marks the Albumin test checkbox and verifies the ordered tests list contains "109 - ALB".
   */
  markAlbuminTest(): void {
    cy.get(this.albuminCheckbox).check().should('be.checked').and('have.value', 'on');
    cy.get('body').should('be.visible').and('contain.text', '109 - ALB');
  }

  /**
   * Clicks the Save button.
   */
  saveOrder(): void {
    this.waitForElement(this.saveButton);
    this.clickElement(this.saveButton);
  }

  /**
   * Verifies that the order saved toast message contains the expected order name.
   * @param expectedOrderName - The order name expected from the API response
   */
  verifyOrderToastMessage(expectedOrderName: any): void {
    cy.get(this.orderToast, { timeout: 5000 })
      .should('be.visible')
      .invoke('text')
      .then((toastText: string) => {
        //  toast text contains "Order <orderName> ..." extract the orderName.
        const toastOrderName = toastText.trim().split("Order ")[1].split(" ")[0];
        cy.log(`Toast Order Name: ${toastOrderName}`);
        expect(toastOrderName).to.eq(expectedOrderName);
      });
  }

  /**
   * Verifies that the input fields (facility, physician, patient) are empty.
   */
  verifyInputFieldsEmpty(): void {
    cy.get(this.facilityInput).should('have.value', '');
    cy.get(this.physicianField).should('have.value', '');
    cy.get(this.patientInput).should('have.value', '');
  }

  /**
   * Verifies that mandatory field alerts are shown and the focus moves to the first empty field.
   */
  verifyMandatoryFieldAlerts(): void {
    this.clickElement(this.saveButton);
    cy.get(this.facilityInput).should('have.focus');
    cy.get(this.facilityLabel).should('have.css', 'color', 'rgb(210, 0, 0)');

    this.typeText(this.facilityInput, 'qa');
    cy.contains('QA Facility').click();
    this.clickElement(this.saveButton);
    cy.get(this.patientInput).should('have.focus');
    cy.contains('Patient').should('have.css', 'color', 'rgb(210, 0, 0)');
  }
}
