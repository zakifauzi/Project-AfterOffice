import flightPage from "../pages/flightPage";

describe("Skenario Pencarian Penerbangan Agoda E2E", () => {
  it("Berhasil memesan penerbangan one-way dari Jakarta ke Singapura untuk tanggal besok", () => {
    // 1. Buka beranda Agoda & pilih tab Flight
    flightPage.visit();
    flightPage.clickFlightTab();

    // 2. Pilih opsi penerbangan One Way
    flightPage.selectOneWay();

    // 3. Masukkan kota asal (Jakarta) dan tujuan (Singapura) + Enter
    flightPage.enterFlyingFrom("Jakarta (CGK)");
    flightPage.enterFlyingTo("Singapore (SIN)");

    // 4. Pilih tanggal keberangkatan otomatis (current date + 1)
    flightPage.selectDepartureDateTomorrow();

    // 5. Atur passenger, tutup pop-up dengan Enter, lalu klik tombol Search Flights
    flightPage.handlePassengerPopup();
    flightPage.clickSearchFlights();
  });
});
