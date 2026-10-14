import bookingLocators from "../locators/bookingLocators";

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Cocokkan teks yang diawali kata tertentu, mis. "Indonesia"
const startsWith = (text) => new RegExp(`^${escapeRegExp(text)}`, "i");

class BookingPage {
  // Pastikan sudah di halaman booking dan form siap diisi
  verifyPageLoaded() {
    cy.url({ timeout: 30000 }).should("include", "/packages/book");
    cy.get(bookingLocators.CONTACT_FIRST_NAME, { timeout: 20000 }).should("be.visible");
  }

  // ---------- Helper ----------

  // Terima selector (string) atau fungsi yang mengembalikan chain Cypress
  resolve(target) {
    return typeof target === "function" ? target() : cy.get(target);
  }

  // Isi input teks: clear dulu, ketik, lalu pastikan nilainya masuk
  typeInto(target, value) {
    this.resolve(target).scrollIntoView().should("be.visible").clear().type(value).should("have.value", value);
  }

  // Buka dropdown lalu pilih opsi di panel floater-container
  selectFromFloater(trigger, optionText, expectedTriggerText) {
    const triggerShows = ($el) => `${$el.text()} ${$el.val() ?? ""}`.includes(expectedTriggerText);

    this.resolve(trigger)
      .scrollIntoView()
      .should("be.visible")
      .then(($trigger) => {
        // Sudah berisi nilai yang diharapkan (mis. +62 terisi otomatis): lewati
        if (expectedTriggerText && triggerShows($trigger)) {
          cy.log(`Skip: field sudah berisi "${expectedTriggerText}"`);
          return;
        }

        cy.wrap($trigger).click();

        cy.get(bookingLocators.FLOATER, { timeout: 10000 }).filter(":visible").contains(optionText).scrollIntoView().click();

        // Panel tidak selalu hilang dari DOM. Kalau masih terlihat, tutup
        // dengan Escape, lalu pastikan tidak ada panel yang terlihat.
        cy.get("body").then(($body) => {
          if ($body.find(`${bookingLocators.FLOATER}:visible`).length) {
            cy.get("body").type("{esc}");
          }
        });

        cy.get("body").find(`${bookingLocators.FLOATER}:visible`).should("not.exist");

        // Bukti sebenarnya: field menampilkan pilihan
        if (expectedTriggerText) {
          this.resolve(trigger).should(($el) => {
            expect(`${$el.text()} ${$el.val() ?? ""}`, "isi field setelah dipilih").to.contain(expectedTriggerText);
          });
        }
      });
  }

  // ---------- Contact detail ----------

  fillContactDetail({ firstName, lastName, email, country, phoneCountry, phoneCode, phone }) {
    this.typeInto(bookingLocators.CONTACT_FIRST_NAME, firstName);
    this.typeInto(bookingLocators.CONTACT_LAST_NAME, lastName);
    this.typeInto(bookingLocators.CONTACT_EMAIL, email);

    this.selectFromFloater(bookingLocators.CONTACT_COUNTRY, startsWith(country), country);
    this.selectFromFloater(bookingLocators.CONTACT_PHONE_CODE, new RegExp(escapeRegExp(phoneCountry), "i"), phoneCode);
    this.typeInto(bookingLocators.CONTACT_PHONE_NUMBER, phone);
  }

  // ---------- Passenger detail ----------

  selectNationality(nationality) {
    this.selectFromFloater(bookingLocators.PASSENGER_NATIONALITY, startsWith(nationality), nationality);
  }

  selectGender(gender = "Male") {
    const genderSelector = gender === "Female" ? bookingLocators.GENDER_FEMALE : bookingLocators.GENDER_MALE;

    cy.get(genderSelector).filter(":visible").first().scrollIntoView().click();

    // Bukti terpilih: radio checked, aria-checked, atau input di dalamnya
    cy.get(genderSelector)
      .filter(":visible")
      .first()
      .should(($el) => {
        const selected = $el.is(":checked") || $el.attr("aria-checked") === "true" || $el.find("input:checked").length > 0;
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
    cy.get(bookingLocators.PASSENGER_NO_LAST_NAME).first().scrollIntoView().check({ force: true }).should("be.checked");
  }

  fillDateOfBirth({ day, month, year }) {
    this.typeInto(bookingLocators.DOB_DAY, day);
    this.selectFromFloater(bookingLocators.DOB_MONTH, startsWith(month), month);
    this.typeInto(bookingLocators.DOB_YEAR, year);
  }

  // ---------- Passport ----------

  // field-wrapper dipakai banyak field, jadi dipersempit lewat teks labelnya
  getPassportNumberInput() {
    return cy
      .contains(bookingLocators.FIELD_WRAPPER, /Passport number/i, {
        timeout: 10000,
      })
      .find("input")
      .first();
  }

  // Combobox ini tanpa data-testid: cari lewat label (legend), naik ke
  // fieldset, lalu ambil button combobox yang bersebelahan
  getCountryOfIssueTrigger() {
    return cy
      .contains("legend span", /Country\/region of issue/i, { timeout: 10000 })
      .closest("fieldset")
      .siblings('button[role="combobox"]');
  }

  fillPassportDetail({ number, countryOfIssue, expiry }) {
    this.typeInto(() => this.getPassportNumberInput(), number);

    this.selectFromFloater(() => this.getCountryOfIssueTrigger(), startsWith(countryOfIssue), countryOfIssue);

    this.typeInto(bookingLocators.PASSPORT_EXPIRY_DAY, expiry.day);
    this.selectFromFloater(bookingLocators.PASSPORT_EXPIRY_MONTH, startsWith(expiry.month), expiry.month);
    this.typeInto(bookingLocators.PASSPORT_EXPIRY_YEAR, expiry.year);
  }

  // ---------- Opsi tambahan ----------

  selectBasicSupport() {
    cy.get(bookingLocators.SUPPORT_BASIC).scrollIntoView().should("be.visible").click();
  }

  declineTravelProtection() {
    cy.get(bookingLocators.TRAVEL_PROTECTION_NO).first().scrollIntoView().click({ force: true });
  }

  // Container ini membungkus teks + link Terms. Klik sisi kiri agar kena
  // checkbox, bukan link "Terms" di tengah teks.
  agreeToTerms() {
    cy.get(bookingLocators.TERMS_CONTAINER).scrollIntoView().should("be.visible").click("left");
  }

  // ---------- Simpan data untuk dicocokkan di halaman payment ----------

  // Panggil SETELAH semua opsi dipilih dan SEBELUM klik continue.
  // Menunggu (dengan retry) sampai ada elemen total price yang berisi angka,
  // karena price breakdown di-render ulang setiap opsi berubah.
  captureTotalPrice() {
    let finalPrice;

    cy.get(bookingLocators.TOTAL_PRICE, { timeout: 15000 })
      .should(($els) => {
        const texts = $els
          .toArray()
          .map((el) => el.textContent.trim())
          .filter((text) => /\d/.test(text));

        expect(texts, "ada elemen total price yang berisi angka").to.have.length.greaterThan(0);

        const prices = texts[0].match(/\d[\d.,]*/g);
        // Angka terakhir = harga final (setelah diskon)
        finalPrice = prices[prices.length - 1];
      })
      .then(() => {
        cy.log(`Total price tersimpan: ${finalPrice}`);
        cy.wrap(finalPrice).as("totalPrice");
      });
  }

  continueToPayment() {
    cy.get(bookingLocators.CONTINUE_PAYMENT).scrollIntoView().should("be.visible").and("not.be.disabled").click();

    // Tutup penawaran "last chance" kalau muncul
    this.declineLastChanceOffers();

    cy.url({ timeout: 30000 }).should("include", "/packages/payment");
  }

  // Modal ini tidak selalu muncul dan bisa lebih dari satu, jadi ditangani
  // secara kondisional. maxOffers mencegah loop tak berujung.
  declineLastChanceOffers(maxOffers = 3) {
    if (maxOffers === 0) return;

    const decline = `${bookingLocators.LAST_CHANCE_DECLINE}:visible`;

    // Tunggu salah satu terjadi: pindah ke payment ATAU modal muncul
    cy.get("body", { timeout: 30000 }).should(($body) => {
      const onPayment = $body[0].ownerDocument.location.pathname.includes("/packages/payment");
      const offerVisible = $body.find(decline).length > 0;
      expect(onPayment || offerVisible, "pindah ke payment atau modal last-chance muncul").to.be.true;
    });

    cy.get("body").then(($body) => {
      if ($body.find(decline).length === 0) return;

      cy.get(decline).first().click();

      // Pastikan modal tertutup sebelum cek penawaran berikutnya
      cy.get("body").find(decline).should("not.exist");

      this.declineLastChanceOffers(maxOffers - 1);
    });
  }
}

export default new BookingPage();
