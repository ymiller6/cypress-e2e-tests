
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qa-candidates.labos.cloud',
    specPattern: "cypress/integration/examples/*.ts", // Base URL
    setupNodeEvents(on, config) {
    // Register the Allure plugin
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      allureWriter(on, config); // Write allure results
      return config;
    }, 
  },
  env: {
    allure: true,
    dashboardUrl: '/2/dashboard', // Relative URL path
  },
});
