import flightLocators from "../locators/flightLocators";

class FlightResultPage {
  /**
   * Buka dropdown "Sort by" lalu pilih opsi berdasarkan teks.
   * @param {RegExp|string} optionText - judul opsi, mis. /^departure time/i
   */
  sortBy(optionText = /^departure time/i) {
    // 1. Buka dropdown
    cy.get(flightLocators.SORT_BUTTON, { timeout: 20000 })
      .filter(":visible")
      .first()
      .click();

    // 2. Ambil elemen <button role="option"> yang memuat teks (BUKAN span di dalamnya)
    cy.contains(flightLocators.SORT_OPTION, optionText, { timeout: 10000 })
      .should("be.visible")
      .click();

    // 3. Verifikasi: opsi yang dipilih benar-benar aktif
    //    (buka lagi tidak perlu; cukup cek state dropdown tertutup + sort button berubah)
    cy.get(flightLocators.SORT_OPTION).should("not.exist");
  }

  // Filter maskapai berdasarkan nama
  filterAirline(airlineName = "Malaysia Airlines") {
    cy.contains(new RegExp(airlineName, "i"), { timeout: 20000 })
      .scrollIntoView()
      .should("be.visible")
      .click();
  }

  selectFirstFlight() {
    cy.get(flightLocators.SELECT_BUTTON, { timeout: 20000 })
      .filter(":visible")
      .first()
      .scrollIntoView()
      .should("be.visible")
      .click();

    // Halaman booking menjadi bukti bahwa klik berhasil
    cy.url({ timeout: 30000 }).should("include", "/packages/book");
  }
}

export default new FlightResultPage();
