/// <reference types="cypress" />
import LoginPage from "./LoginPage";
import BasePage from "./basePage";
import userData from "./userData";
import DashboardPage from "./DashboardPage";
import allure from '@shelex/cypress-allure-plugin';

const userNameAlert = "Username is required"
const passwordAlert = "Password is required"

describe("FLD-100:Login Tests Suite", () => {
    const loginPage = new LoginPage();
    const basePage = new BasePage();
    const dashboardPage = new DashboardPage();

    beforeEach((): void => {
        loginPage.navigate();
    });

    it("GID-998: login with valid credentials", (): void => {
        // Start a step for logging in
        cy.allure().startStep('Login with valid credentials');
        loginPage.login(userData.validUser.username, userData.validUser.password);
        cy.allure().endStep();
      
        // Start a step for verifying the dashboard URL
        cy.allure().startStep('Verify dashboard URL');
        dashboardPage.verifyUrl();
        cy.allure().endStep();
      });

    it("GID-999: login page appearance", () => {
        cy.allure().startStep("Visit login page and check appearance");
    
        loginPage.loginPageAppearance();
    
        cy.allure().endStep();
      });

    it("GID-1000: login page appearance", (): void => {
        loginPage.loginPageAppearance();
    });

    it("GID-1001: login with valid credentials", (): void => {
        loginPage.login(userData.validUser.username, userData.validUser.password);
        // Assert url is dashboard url after succesful login
        dashboardPage.verifyUrl();
    });

    //entering an invalid password and username.
    it("GID-1002: login with invalid credentials - alert appears", (): void => {
        loginPage.login(userData.invalidUser.username, userData.invalidUser.password);

        basePage.getElementText('#mat-mdc-error-2').then((text: string) => {
            expect(text.trim()).to.include("Incorrect username or password");
        });
    });

    //error message appears when missing username/paasword.
    it("GID-1003: login with empty user name and password - alert appears", (): void => {
        
        cy.contains('button', 'Login').click();
        loginPage.verifyUserPasswordAlerts(userNameAlert, passwordAlert)
      
    });
});