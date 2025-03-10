/// <reference types="cypress" />
import LoginPage from "./LoginPage";
import userData from "./userData";
import DashboardPage from "./DashboardPage";


describe("FLD-103: header appearence", () => {

  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  it("GID-1007: Verify elemnets appear on dashboard header", () => {

    loginPage.navigate();
    loginPage.login(userData.validUser.username, userData.validUser.password);
    dashboardPage.dashboardHeaderAppearance()

  });
});