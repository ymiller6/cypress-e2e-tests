import BasePage from "./basePage";

class LoginPage extends BasePage {
  private readonly url: string;
  private readonly usernameField: string;
  private readonly passwordField: string;
  private readonly loginButton: string;
  private readonly protectionMessage: string;
  private readonly logo: string;
  private readonly title: string;
  private readonly emptyUserAlert: string;
  private readonly emptyPassAlert: string;
  private readonly wrongCrenditialAlert: string;
  private readonly tooManyLoginAttempts: string;

  constructor() {
    super();
    this.url = "https://qa-candidates.labos.cloud/2/login?ref=%2F";
    this.usernameField = '[data-cy="st-form-control-username"]';
    this.passwordField = '[data-cy="st-form-control-password"]';
    this.loginButton = ".mat-mdc-button-touch-target";
    this.protectionMessage = ".login-info-protection-msg";
    this.logo = ".login-form_logo";
    this.title = ".login-form-title";
    this.emptyUserAlert = "#mat-mdc-error-0";
    this.emptyPassAlert = "#mat-mdc-error-1";
    this.wrongCrenditialAlert = "#mat-mdc-error-4";
    this.tooManyLoginAttempts = "#mat-mdc-error-2";
  }

  /**
   * Navigates to the login page
   */
  navigate(): void {
    cy.visit(this.url);
  }

  /**
   * Logs in using provided credentials
   * @param username - The username
   * @param password - The password
   */
  login(username: string, password: string): void {
    cy.allure().startStep(`Login as user: ${username}`);
    this.typeText(this.usernameField, username);
    this.typeText(this.passwordField, password);
    this.clickElement(this.loginButton);
    cy.allure().endStep();
  }

  /**
   * Verifies that all necessary login page elements exist
   */
  loginPageAppearance(): void {
    this.verifyElementExists(this.usernameField);
    this.verifyElementExists(this.passwordField);
    this.verifyElementExists(this.loginButton);
    this.verifyElementExists(this.protectionMessage);
    this.verifyElementExists(this.logo);
    this.verifyElementExists(this.title);
  }

  verifyUserPasswordAlerts(userNameAlert: string, passwordAlert: string): void {
    this.getElementText(this.emptyUserAlert).then((text: string) => {
      expect(text.trim()).to.include(userNameAlert);  
  });
    this.getElementText(this.emptyPassAlert).then((text: string) => {
    expect(text.trim()).to.include(passwordAlert);  
});

  }
  
}

export default LoginPage;