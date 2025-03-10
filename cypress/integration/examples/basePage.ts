class BasePage {
    /**
     * Clicks an element
     * @param selector - The selector of the element to click
     */
    clickElement(selector: string): void {
      try {
        cy.get(selector).click({ force: true });
      } catch (error) {
        cy.log(`Error clicking element: ${selector}`, (error as Error).message);
        throw new Error(`clickElement failed: ${(error as Error).message}`);
      }
    }
  
    /**
     * Types text into an input field
     * @param selector - The selector of the input field
     * @param text - The text to type
     */
    typeText(selector: string, text: string): void {
      try {
        cy.get(selector).clear().type(text);
      } catch (error) {
        cy.log(`Error typing text into: ${selector}`, (error as Error).message);
        throw new Error(`typeText failed: ${(error as Error).message}`);
      }
    }
  
    /**
     * Waits for an element to be visible
     * @param selector - The selector of the element
     * @param timeout - (Optional) Time to wait (default: 10s)
     */
    waitForElement(selector: string, timeout: number = 10000): void {
      try {
        cy.get(selector, { timeout }).should('be.visible');
      } catch (error) {
        cy.log(`Error waiting for element: ${selector}`, (error as Error).message);
        throw new Error(`waitForElement failed: ${(error as Error).message}`);
      }
    }
  
    /**
     * Gets the text of an element
     * @param selector - The selector of the element
     * @returns The text content of the element
     */
    getElementText(selector: string): Cypress.Chainable<string> {
      try {
        return cy.get(selector).invoke('text');
      } catch (error) {
        cy.log(`Error getting text from element: ${selector}`, (error as Error).message);
        throw new Error(`getElementText failed: ${(error as Error).message}`);
      }
    }
  
    /**
     * Verifies that an element exists on the page
     * @param selector - The selector of the element
     */
    verifyElementExists(selector: string): void {
      try {
        cy.get(selector).should("exist");
      } catch (error) {
        cy.log(`Error verifying element exists: ${selector}`, (error as Error).message);
        throw new Error(`verifyElementExists failed: ${(error as Error).message}`);
      }
    }

    /**
   * Types text sequentially and selects an option from an autocomplete dropdown.
   * @param inputSelector - The input field selector.
   * @param text - The text to type.
   * @param dropdownSelector - The dropdown list selector.
   * @param optionText - The exact option text to select.
   */
  typeAndSelectOption(
    inputSelector: string,
    text: string,
    dropdownSelector: string,
    optionText: string
  ) {
    cy.get(inputSelector).clear(); // Clear input before typing
    text.split("").forEach((char, index) => {
      cy.get(inputSelector)
        .type(char, { delay: 200 }) // Type each character with delay
        .wait(index * 50); // Wait a bit to simulate human typing
    });

    // Wait for dropdown and select the required option
    cy.get(dropdownSelector)
      .should("be.visible")
      .contains(optionText)
      .click();
  }

  }
  
  export default BasePage;
  