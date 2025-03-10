import BasePage from "./basePage";

class DashboardPage extends BasePage {
  private readonly humbergerMenu: string;
  private readonly logo: string;
  private readonly searchField: string;
  private readonly navbarUserInfo: string;
  private readonly helpDropDown: string;
  private readonly fullScreen: string;
  private readonly sidebarSearch: string;
  private readonly orderMenu: string;


  constructor() {
    super();
    this.humbergerMenu = '[data-cy="st-button-menu"]';
    this.logo = 'img';
    this.searchField = '[data-cy="st-form-control-query"]'
    this.navbarUserInfo = '.navbar-user-information > .d-flex'
    this.helpDropDown = '[data-cy="st-button-help"] > .mat-mdc-button-touch-target'
    this.fullScreen = '[data-cy="st-button-isfullscreenmodefullscreen-exitfullscreen"] > .mat-mdc-button-touch-target'
    this.sidebarSearch = '#menuSearchInput'
    this.orderMenu = '#st-navbar-sub-item-button-order'

  }

  /**
   * Verifies that all necessary dashboard page elements exist
   */
  dashboardHeaderAppearance(): void {
    this.verifyElementExists(this.humbergerMenu);
    this.verifyElementExists(this.logo);
    this.verifyElementExists(this.searchField);
    this.verifyElementExists(this.navbarUserInfo);
    this.verifyElementExists(this.helpDropDown);
    this.verifyElementExists(this.fullScreen);
    
  }

  navigateOrderScreen(searchtxt: string): void {
    this.clickElement(this.humbergerMenu);
    this.waitForElement(this.sidebarSearch)
    this.typeText(this.sidebarSearch, searchtxt)
    this.waitForElement(this.orderMenu)
    this.clickElement(this.orderMenu)
  }

  verifyUrl() {
    const baseUrl = Cypress.config('baseUrl');
    const dashboardPath = Cypress.env('dashboardUrl');

    if (!baseUrl || !dashboardPath) {
      throw new Error('Base URL or dashboard URL is not defined.');
    }
    const expectedUrl = baseUrl + dashboardPath;
    cy.url().should('eq', expectedUrl);
  }

}

export default DashboardPage;