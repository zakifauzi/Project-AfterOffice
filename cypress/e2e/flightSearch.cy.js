import flightPage from "../pages/flightPage";
import flightResultPage from "../pages/flightResultPage";

describe("Skenario Pencarian Penerbangan Agoda E2E", () => {
  it("Berhasil memesan penerbangan one-way dari Jakarta ke Singapura untuk tanggal besok", () => {
    // 1. Buka beranda Agoda & pilih tab Flight
    flightPage.visit();
    flightPage.closeAppPromoPopup();
    flightPage.clickFlightTab();

    // 2. Pilih opsi penerbangan One Way
    flightPage.selectOneWay();

    // 3. Pilih kota asal (Jakarta - CGK) dan tujuan (Singapore - SIN) dari suggestion
    flightPage.enterFlyingFrom("Jakarta", "CGK");
    flightPage.enterFlyingTo("Singapore", "SIN");

    // 4. Pilih tanggal keberangkatan besok
    flightPage.selectDepartureDateTomorrow();

    // 5. Passenger memakai default (1 Passenger, Economy). Verifikasi form, lalu Search
    flightPage.verifyFormFilled("CGK", "SIN");
    flightPage.clickSearchFlights();

    // 6. Urutkan berdasarkan keberangkatan paling awal
    flightResultPage.sortBy(/departure time.*earli/i);

    // 7. Filter maskapai Malaysia Airlines
    flightResultPage.filterAirline("Malaysia Airlines");
  });
});
