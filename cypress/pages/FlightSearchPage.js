import flightSearchLocators from "../locators/FlightSearchLocators";

class FlightSearchPage {
  visit() {
    cy.visit("https://www.agoda.com/flights");
  }

  fillForm(locator, text) {
    cy.get(locator).should("be.visible").clear().type(`${text}{enter}`);
  }

  clickItem(locator) {
    cy.get(locator).should("be.visible").click();
  }

  selectDate(locator, dateString) {
    cy.get(locator).should("be.visible").click();
    cy.get(flightSearchLocators.getDateCell(dateString)).should("be.visible").click();
  }

  searchFlight(origin, destination, departureDate) {
    this.fillForm(flightSearchLocators.originInput, origin);
    this.fillForm(flightSearchLocators.destinationInput, destination);
    this.selectDate(flightSearchLocators.departureDateBox, departureDate);
    this.clickItem(flightSearchLocators.searchBtn);
  }
}

export default FlightSearchPage;
