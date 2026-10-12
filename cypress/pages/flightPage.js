import flightLocators from "../locators/flightLocators";

class FlightPage {
  visit() {
    cy.visit("https://www.agoda.com");
  }

  clickFlightTab() {
    cy.get(flightLocators.FLIGHT_TAB).click();
  }

  selectOneWay() {
    cy.get(flightLocators.ONE_WAY_RADIO).click();
  }

  enterFlyingFrom(origin = "Jakarta (CGK)") {
    cy.get(flightLocators.FLYING_FROM_INPUT).type(`${origin}{enter}`);
  }

  enterFlyingTo(destination = "Singapore (SIN)") {
    cy.get(flightLocators.FLYING_TO_INPUT).type(`${destination}{enter}`);
  }

  selectDepartureDateTomorrow() {
    cy.get(flightLocators.DEPARTURE_SELECTOR).click();
    cy.get(flightLocators.CALENDAR_CONTAINER).should("be.visible");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");
    const targetDateStr = `${year}-${month}-${day}`;

    cy.get(`[data-testid="${targetDateStr}"]`).click();
  }

  handlePassengerPopup() {
    cy.get(flightLocators.PASSENGER_SELECTOR).click();
    cy.get(flightLocators.PASSENGER_POPUP).should("be.visible");
    cy.get("body").type("{enter}");
  }

  clickSearchFlights() {
    cy.get(flightLocators.SEARCH_BUTTON).click();
  }
}

// Perhatikan penambahan kata 'new' di sini
export default new FlightPage();
