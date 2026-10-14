const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

class PaymentPage {
  // Pastikan teks tampil di halaman (case-insensitive, spasi fleksibel, auto-retry)
  expectPageToShow(text, label) {
    const pattern = escapeRegExp(text).replace(/\s+/g, "\\s+");

    cy.contains(new RegExp(pattern, "i"), { timeout: 20000 })
      .should("exist")
      .then(() => cy.log(`OK: ${label} "${text}" tampil di halaman payment`));
  }

  verifyPageLoaded() {
    cy.url({ timeout: 30000 }).should("include", "/packages/payment");
  }

  // Data kontak & penumpang sama dengan yang diisi di halaman passenger detail
  verifyPassengerData({ contact, passenger }) {
    // Nama kontak lengkap (first + last), bukan hanya first name
    this.expectPageToShow(
      `${contact.firstName} ${contact.lastName}`,
      "contact name",
    );
    this.expectPageToShow(contact.email, "email");
    this.expectPageToShow(
      `${contact.phoneCode} ${contact.phone}`,
      "mobile number",
    );

    // Penumpang tanpa surname: Agoda menampilkan given name dua kali
    // (teramati di halaman passenger detail dan payment: "BUDI BUDI")
    this.expectPageToShow(
      `${passenger.givenName} ${passenger.givenName}`,
      "passenger name",
    );
    this.expectPageToShow(passenger.passport.number, "passport number");
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
