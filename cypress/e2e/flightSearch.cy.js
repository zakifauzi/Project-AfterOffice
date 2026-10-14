import flightPage from "../pages/flightPage";
import flightResultPage from "../pages/FlightResultPage";
import bookingPage from "../pages/BookingPage";
import paymentPage from "../pages/PaymentPage";
import { getTestData } from "../support/testData";

describe("Skenario Pencarian Penerbangan Agoda E2E", () => {
  it("Berhasil memesan penerbangan one-way dari Jakarta ke Singapura untuk tanggal besok", () => {
    // Semua data uji berasal dari environment variable (cypress.env.json)
    const { search, contact, passenger } = getTestData();
    const testData = { contact, passenger };

    // 1. Buka beranda Agoda & pilih tab Flight
    flightPage.visit(); // di flightPage.js: cy.visit(Cypress.env("BASE_URL"))
    flightPage.closeAppPromoPopup();
    flightPage.clickFlightTab();

    // 2. Pilih opsi penerbangan One Way
    flightPage.selectOneWay();

    // 3. Pilih kota asal dan tujuan
    flightPage.enterFlyingFrom(search.originCity, search.originCode);
    flightPage.enterFlyingTo(search.destinationCity, search.destinationCode);

    // 4. Pilih tanggal keberangkatan besok
    flightPage.selectDepartureDateTomorrow();

    // 5. Verifikasi form, lalu Search
    flightPage.verifyFormFilled(search.originCode, search.destinationCode);
    flightPage.clickSearchFlights();

    // 6. Urutkan berdasarkan keberangkatan paling awal
    flightResultPage.sortBy(/^departure time/i);

    // 7. Filter maskapai
    flightResultPage.filterAirline(search.airline);

    // 8. Simpan jam penerbangan, pilih penerbangan pertama
    flightResultPage.selectFirstFlight();

    // 9. Halaman booking: isi contact detail
    bookingPage.verifyPageLoaded();
    bookingPage.fillContactDetail(contact);

    // 10. Isi passenger detail
    bookingPage.selectNationality(passenger.nationality);
    bookingPage.selectGender(passenger.gender);
    bookingPage.fillGivenName(passenger.givenName);
    bookingPage.checkNoLastName();
    bookingPage.fillDateOfBirth(passenger.dob);
    bookingPage.fillPassportDetail(passenger.passport);

    // 11. Opsi tambahan
    bookingPage.selectBasicSupport();
    bookingPage.declineTravelProtection();
    bookingPage.agreeToTerms();

    // 12. Simpan total harga final, lalu lanjut ke payment
    bookingPage.captureTotalPrice();
    bookingPage.continueToPayment();

    // 13. Halaman payment: data harus sama dengan sebelumnya
    paymentPage.verifyPageLoaded();
    paymentPage.verifyPassengerData(testData);
    paymentPage.verifyTotalPrice();
    paymentPage.verifyFlightTimes();
  });
});
