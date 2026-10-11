const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    env: {
      baseUrlApp: "https://bstackdemo.com/app",
      standardUser: "demouser",
      standardPassword: "testingisfun99",
    },
  },
  screenshotOnRunFailure: true,
  video: true,
});
