import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8100',
    specPattern: 'cypress/e2e/**/*.{js,ts,jsx,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
