import flightLocators from "../locators/flightLocators";

class FlightResultPage {
  // Buka dropdown Sort by lalu pilih opsi berdasarkan teks (regex)
  sortBy(optionText = /departure time.*earli/i) {
    cy.get(flightLocators.SORT_BUTTON, { timeout: 20000 })
      .filter(":visible")
      .first()
      .click();

    cy.get(flightLocators.SORT_LISTBOX).should("be.visible");

    cy.get(flightLocators.SORT_OPTION).contains(optionText).click();

    // Dropdown tertutup = pilihan sudah diterapkan
    cy.get(flightLocators.SORT_LISTBOX).should("not.exist");
  }

  // Filter maskapai berdasarkan nama
  filterAirline(airlineName = "Malaysia Airlines") {
    cy.contains(new RegExp(airlineName, "i"), { timeout: 20000 })
      .scrollIntoView()
      .should("be.visible")
      .click();
  }
}

export default new FlightResultPage();
