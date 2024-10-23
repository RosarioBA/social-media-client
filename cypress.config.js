import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5500',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
  },
});
