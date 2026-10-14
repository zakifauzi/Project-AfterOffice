// CATATAN: gabungkan dengan cypress.config.js Anda yang sudah ada.
// Pastikan viewport & specPattern Anda tetap dipertahankan.
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // ---- Video bawaan Cypress (hanya direkam saat `cypress run`) ----
  video: true,
  videoCompression: 32,
  screenshotOnRunFailure: true,

  // ---- Laporan HTML ----
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    reportFilename: "agoda-flight-e2e",
    reportPageTitle: "Agoda Flight E2E Report",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  expose: require("./cypress.env.json"),

  viewportWidth: 1000,
  viewportHeight: 660,

  // Situs publik bisa sesekali lambat: beri 1x ulang hanya di mode run
  retries: { runMode: 1, openMode: 0 },

  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },
});
