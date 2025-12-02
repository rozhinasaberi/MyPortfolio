import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '4rcesw',
  e2e: {
    setupNodeEvents(on, config) {
video: true;      // implement node event listeners here
    },
  },
});
