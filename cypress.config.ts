const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qa-candidates.labos.cloud', // Base URL
    setupNodeEvents(on: any, config: any) {
      // implement node event listeners here
    },
    //specPattern: 'cypress/integration/examples/*.js'
    specPattern: "cypress/integration/examples/*.ts",
  },
  env: {
    dashboardUrl: '/2/dashboard', // Relative URL path
  },
});
