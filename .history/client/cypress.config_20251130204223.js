const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: false,
    setupNodeEvents(on, config) {
      const { startDevServer } = require("@cypress/vite-dev-server");

      on("dev-server:start", (options) => {
        return startDevServer({
          options,
          viteConfig: {
            server: {
              port: 5173,
            },
          },
        });
      });

      return config;
    },
    experimentalRunAllSpecs: true,
  },

  video: true,

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
