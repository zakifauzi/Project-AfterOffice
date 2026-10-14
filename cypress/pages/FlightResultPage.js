import flightLocators from "../locators/flightLocators";

class FlightResultPage {
  sortBy(optionText = /^departure time/i) {
    cy.get(flightLocators.SORT_BUTTON, { timeout: 20000 }).filter(":visible").first().click();

    cy.contains(flightLocators.SORT_OPTION, optionText, { timeout: 10000 }).should("be.visible").click();

    cy.get(flightLocators.SORT_OPTION).should("not.exist");
  }

  filterAirline(airlineName = "Malaysia Airlines") {
    cy.contains(new RegExp(airlineName, "i"), { timeout: 20000 }).scrollIntoView().should("be.visible").click();
  }

  // Simpan jam berangkat & tiba dari kartu penerbangan pertama,
  // dua jam pertama di kartu = departure lalu arrival.
  captureFirstFlightTimes() {
    cy.get(flightLocators.FLIGHT_CARD, { timeout: 20000 })
      .filter(":visible")
      .first()
      .invoke("text")
      .then((text) => {
        const times = text.match(/\b\d{2}:\d{2}\b/g);
        expect(times, `jam ditemukan di kartu: "${text}"`).to.have.length.gte(2);
        cy.wrap({ departure: times[0], arrival: times[1] }).as("flightTimes");
      });
  }

  // Simpan jam dulu, baru klik Select, lalu pastikan pindah ke halaman booking
  selectFirstFlight() {
    this.captureFirstFlightTimes();

    cy.get(flightLocators.SELECT_BUTTON, { timeout: 20000 }).filter(":visible").first().scrollIntoView().should("be.visible").click();

    cy.url({ timeout: 30000 }).should("include", "/packages/book");
  }
}

export default new FlightResultPage();
