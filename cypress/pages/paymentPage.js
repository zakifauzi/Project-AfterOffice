const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

class PaymentPage {
  // Pastikan teks tampil di halaman (case-insensitive, auto-retry)
  expectPageToShow(text, label) {
    cy.contains(new RegExp(escapeRegExp(text), "i"), { timeout: 20000 })
      .should("exist")
      .then(() => cy.log(`OK: ${label} "${text}" tampil di halaman payment`));
  }

  verifyPageLoaded() {
    cy.url({ timeout: 30000 }).should("include", "/packages/payment");
  }

  // Data penumpang sama dengan yang diisi di halaman passenger detail
  verifyPassengerData({ contact, passenger }) {
    this.expectPageToShow(contact.firstName, "contact first name");
    this.expectPageToShow(contact.email, "email");
    this.expectPageToShow(passenger.givenName, "passenger given name");
  }

  // Total price sama dengan yang tersimpan dari halaman booking
  verifyTotalPrice() {
    cy.get("@totalPrice").then((price) => {
      this.expectPageToShow(price, "total price");
    });
  }

  // Departure & arrival time sama dengan penerbangan yang dipilih
  verifyFlightTimes() {
    cy.get("@flightTimes").then(({ departure, arrival }) => {
      this.expectPageToShow(departure, "departure time");
      this.expectPageToShow(arrival, "arrival time");
    });
  }
}

export default new PaymentPage();
