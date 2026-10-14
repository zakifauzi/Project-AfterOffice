import flightLocators from "../locators/flightLocators";

const TIME_FORMAT = /^\d{2}:\d{2}$/;

class FlightResultPage {
  sortBy(optionText = /^departure time/i) {
    cy.get(flightLocators.SORT_BUTTON, { timeout: 20000 })
      .filter(":visible")
      .first()
      .click();

    cy.contains(flightLocators.SORT_OPTION, optionText, { timeout: 10000 })
      .should("be.visible")
      .click();

    cy.get(flightLocators.SORT_OPTION).should("not.exist");
  }

  filterAirline(airlineName = "Malaysia Airlines") {
    cy.contains(new RegExp(airlineName, "i"), { timeout: 20000 })
      .scrollIntoView()
      .should("be.visible")
      .click();
  }

  // Simpan jam berangkat & tiba dari kartu yang memiliki tombol Select pertama.
  // Jam dibaca dari baris ringkasan kartu (FLIGHT_SUMMARY), karena rincian
  // segmen di dalam kartu juga memakai data-testid="departure-time".
  captureSelectedFlightTimes() {
    let times;

    cy.get(flightLocators.SELECT_BUTTON, { timeout: 20000 })
      .filter(":visible")
      .first()
      .closest(flightLocators.FLIGHT_CARD)
      .should(($card) => {
        const summary = $card.find(flightLocators.FLIGHT_SUMMARY).first();
        const departure = summary
          .find(flightLocators.DEPARTURE_TIME)
          .first()
          .text()
          .trim();
        const arrival = summary
          .find(flightLocators.ARRIVAL_TIME)
          .first()
          .text()
          .trim();

        expect(departure, "departure time di kartu").to.match(TIME_FORMAT);
        expect(arrival, "arrival time di kartu").to.match(TIME_FORMAT);

        times = { departure, arrival };
      })
      .then(() => {
        cy.log(`Jam tersimpan: ${times.departure} - ${times.arrival}`);
        cy.wrap(times).as("flightTimes");
      });
  }

  // Simpan jam dulu, baru klik Select, lalu pastikan pindah ke halaman booking
  selectFirstFlight() {
    this.captureSelectedFlightTimes();

    cy.get(flightLocators.SELECT_BUTTON, { timeout: 20000 })
      .filter(":visible")
      .first()
      .scrollIntoView()
      .should("be.visible")
      .click();

    cy.url({ timeout: 30000 }).should("include", "/packages/book");
  }
}

export default new FlightResultPage();
