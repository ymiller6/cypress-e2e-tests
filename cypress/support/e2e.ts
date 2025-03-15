import '@shelex/cypress-allure-plugin';
import "allure-cypress";
import './commands'
import fs from "fs";
import { addAttachment } from "allure-cypress";

afterEach(() => {
  // Attach HAR file
  const harFilePath = "path/to/har/file.har";
  if (fs.existsSync(harFilePath)) {
    addAttachment("HAR File", fs.readFileSync(harFilePath), "application/json");
  }

  // Attach Screenshot
  const screenshotPath = "path/to/screenshot.png";
  if (fs.existsSync(screenshotPath)) {
    addAttachment("Screenshot", fs.readFileSync(screenshotPath), "image/png");
  }

  // Attach Trace ID
  const traceId = "your-trace-id"; // Fetch dynamically based on your app logic
  if (traceId) {
    addAttachment("Trace ID", traceId, "text/plain");
  }
});

// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:


