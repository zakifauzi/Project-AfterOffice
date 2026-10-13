import bookingLocators from "../locators/bookingLocators";

class BookingPage {
  // Pastikan sudah di halaman booking dan form siap diisi
  verifyPageLoaded() {
    cy.url({ timeout: 30000 }).should("include", "/packages/book");
    cy.get(bookingLocators.CONTACT_FIRST_NAME, { timeout: 20000 }).should(
      "be.visible",
    );
  }

  // ---------- Helper ----------

  // Isi input teks: clear dulu, ketik, lalu pastikan nilainya masuk
  typeInto(selector, value) {
    cy.get(selector)
      .scrollIntoView()
      .should("be.visible")
      .clear()
      .type(value)
      .should("have.value", value);
  }

  // Buka dropdown lalu pilih opsi di panel floater-container
  selectFromFloater(triggerSelector, optionText, expectedTriggerText) {
    const triggerShows = ($el) =>
      `${$el.text()} ${$el.val() ?? ""}`.includes(expectedTriggerText);

    cy.get(triggerSelector)
      .scrollIntoView()
      .should("be.visible")
      .then(($trigger) => {
        // Sudah berisi nilai yang diharapkan (mis. +62 terisi otomatis): lewati
        if (expectedTriggerText && triggerShows($trigger)) {
          cy.log(`Skip: field sudah berisi "${expectedTriggerText}"`);
          return;
        }

        cy.wrap($trigger).click();

        cy.get(bookingLocators.FLOATER, { timeout: 10000 })
          .filter(":visible")
          .contains(optionText)
          .scrollIntoView()
          .click();

        // Kalau panel tidak menutup sendiri, tutup dengan Escape
        cy.get("body").then(($body) => {
          if ($body.find(`${bookingLocators.FLOATER}:visible`).length) {
            cy.get("body").type("{esc}");
          }
        });

        cy.get("body")
          .find(`${bookingLocators.FLOATER}:visible`)
          .should("not.exist");

        // Bukti sebenarnya: field menampilkan pilihan
        if (expectedTriggerText) {
          cy.get(triggerSelector).should(($el) => {
            expect(
              `${$el.text()} ${$el.val() ?? ""}`,
              "isi field setelah dipilih",
            ).to.contain(expectedTriggerText);
          });
        }
      });
  }

  // ---------- Contact detail ----------

  fillContactDetail({ firstName, lastName, email, country, phoneCode, phone }) {
    this.typeInto(bookingLocators.CONTACT_FIRST_NAME, firstName);
    this.typeInto(bookingLocators.CONTACT_LAST_NAME, lastName);
    this.typeInto(bookingLocators.CONTACT_EMAIL, email);

    this.selectFromFloater(
      bookingLocators.CONTACT_COUNTRY,
      country,
      "Indonesia",
    );
    this.selectFromFloater(
      bookingLocators.CONTACT_PHONE_CODE,
      phoneCode,
      "+62",
    );
    this.typeInto(bookingLocators.CONTACT_PHONE_NUMBER, phone);
  }

  // ---------- Passenger detail ----------

  selectNationality(nationality) {
    this.selectFromFloater(bookingLocators.PASSENGER_NATIONALITY, nationality);
  }

  selectGender(gender = "Male") {
    const genderSelector =
      gender === "Female"
        ? bookingLocators.GENDER_FEMALE
        : bookingLocators.GENDER_MALE;

    cy.get(genderSelector).filter(":visible").first().scrollIntoView().click();

    // Bukti terpilih: radio checked, atau aria-checked, atau input di dalamnya
    cy.get(genderSelector)
      .filter(":visible")
      .first()
      .should(($el) => {
        const selected =
          $el.is(":checked") ||
          $el.attr("aria-checked") === "true" ||
          $el.find("input:checked").length > 0;
        expect(selected, `gender "${gender}" terpilih`).to.be.true;
      });
  }

  fillGivenName(givenName) {
    this.typeInto(bookingLocators.PASSENGER_FIRST_NAME, givenName);
  }

  // Centang "tidak punya nama belakang"
  checkNoLastName() {
    // force: checkbox kustom biasanya menyembunyikan <input> asli di bawah
    // elemen visual. Kebenarannya dibuktikan oleh assertion be.checked.
    cy.get(bookingLocators.PASSENGER_NO_LAST_NAME)
      .first()
      .scrollIntoView()
      .check({ force: true })
      .should("be.checked");
  }

  fillDateOfBirth({ day, month, year }) {
    this.typeInto(bookingLocators.DOB_DAY, day);
    this.selectFromFloater(bookingLocators.DOB_MONTH, month);
    this.typeInto(bookingLocators.DOB_YEAR, year);
  }

  // ---------- Opsi tambahan ----------

  selectBasicSupport() {
    cy.get(bookingLocators.SUPPORT_BASIC)
      .scrollIntoView()
      .should("be.visible")
      .click();
  }

  declineTravelProtection() {
    cy.get(bookingLocators.TRAVEL_PROTECTION_NO)
      .first()
      .scrollIntoView()
      .click({ force: true });
  }

  // Container ini membungkus teks + link Terms. Klik sisi kiri agar kena
  // checkbox, bukan link "Terms" di tengah teks.
  agreeToTerms() {
    cy.get(bookingLocators.TERMS_CONTAINER)
      .scrollIntoView()
      .should("be.visible")
      .click("left");
  }

  // ---------- Simpan data untuk dicocokkan di halaman payment ----------

  // Panggil SETELAH semua opsi dipilih dan SEBELUM klik continue,
  // karena harga bisa berubah akibat support level / travel protection.
  captureTotalPrice() {
    cy.get(bookingLocators.TOTAL_PRICE)
      .first()
      .scrollIntoView()
      .invoke("text")
      .then((text) => {
        const price = text.match(/\d[\d.,]*/);
        expect(price, `angka harga ditemukan di "${text}"`).to.not.be.null;
        cy.wrap(price[0]).as("totalPrice");
      });
  }

  continueToPayment() {
    cy.get(bookingLocators.CONTINUE_PAYMENT)
      .scrollIntoView()
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.url({ timeout: 30000 }).should("include", "/packages/payment");
  }
}

export default new BookingPage();
