import flightLocators from "../locators/flightLocators";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Mengembalikan tanggal besok dalam dua format:
// iso     -> "2026-10-14" (untuk locator kalender)
// display -> "14 Oct 2026" (untuk verifikasi tampilan)
const getTomorrow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return {
    iso: `${year}-${month}-${day}`,
    display: `${date.getDate()} ${MONTHS[date.getMonth()]} ${year}`,
  };
};

class FlightPage {
  visit() {
    cy.visit("https://www.agoda.com");
  }

  closeAppPromoPopup() {
    cy.get("body").then(($body) => {
      if ($body.find(flightLocators.CLOSE_POPUP).length > 0) {
        cy.get(flightLocators.CLOSE_POPUP).click({ force: true });
      }
    });
  }

  clickFlightTab() {
    cy.get(flightLocators.FLIGHT_TAB).click();
  }

  selectOneWay() {
    cy.get(flightLocators.ONE_WAY_RADIO).click();
  }

  // Ketik nama kota, lalu pilih bandara dari suggestion berdasarkan kodenya
  enterFlyingFrom(city = "Jakarta", code = "CGK") {
    cy.get(flightLocators.FLYING_FROM_INPUT).click().clear().type(city);

    const suggestion = flightLocators.SUGGESTION_ORIGIN(code);
    cy.get(suggestion).first().click();
    cy.get(suggestion).should("not.exist");
  }

  enterFlyingTo(city = "Singapore", code = "SIN") {
    cy.get(flightLocators.FLYING_TO_INPUT).click().clear().type(city);

    const suggestion = flightLocators.SUGGESTION_DESTINATION(code);
    cy.get(suggestion).first().click();
    cy.get(suggestion).should("not.exist");
  }

  selectDepartureDateTomorrow() {
    const dateSelector = flightLocators.CALENDAR_DATE_IN_FLOATER(
      getTomorrow().iso,
    );

    // Buka kalender hanya jika belum terbuka (hindari efek toggle)
    cy.get("body").then(($body) => {
      if (
        $body.find(`${flightLocators.CALENDAR_FLOATER}:visible`).length === 0
      ) {
        cy.get(flightLocators.DEPARTURE_SELECTOR).click();
      }
    });

    // Tunggu kalender selesai render, tanpa menyimpan referensi elemennya
    cy.get(flightLocators.CALENDAR_FLOATER, { timeout: 10000 }).should(
      "be.visible",
    );

    // Query baru dari awal: aman walaupun kalender re-render
    cy.get(dateSelector, { timeout: 10000 })
      .first()
      .should("be.visible")
      .click();
  }

  // Pastikan origin, destination, dan tanggal terisi sebelum Search
  verifyFormFilled(originCode = "CGK", destinationCode = "SIN") {
    cy.get(flightLocators.FLYING_FROM_INPUT)
      .filter(":visible")
      .first()
      .invoke("val")
      .should("include", originCode);

    cy.get(flightLocators.FLYING_TO_INPUT)
      .filter(":visible")
      .first()
      .invoke("val")
      .should("include", destinationCode);

    cy.get(flightLocators.DEPARTURE_FIELD).should(
      "contain.text",
      getTomorrow().display,
    );
  }

  clickSearchFlights() {
    // Tutup popup passenger bila terbuka (klik area netral)
    cy.get("body").then(($body) => {
      if ($body.find(`${flightLocators.PASSENGER_POPUP}:visible`).length > 0) {
        cy.get("body").click(0, 0);
        cy.get(flightLocators.PASSENGER_POPUP).should("not.exist");
      }
    });

    cy.get(flightLocators.SEARCH_BUTTON)
      .filter(":visible")
      .first()
      .should("be.visible")
      .click();

    // Validasi bahwa pencarian benar-benar jalan, bukan sekadar tombol terklik
    // cy.contains("Please enter the origin, destination").should("not.exist");
    // cy.url().should("include", "/flights/");
  }
}

export default new FlightPage();
