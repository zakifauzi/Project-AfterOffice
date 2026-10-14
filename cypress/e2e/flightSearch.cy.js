import flightPage from "../pages/flightPage";
import flightResultPage from "../pages/FlightResultPage";
import bookingPage from "../pages/BookingPage";
import paymentPage from "../pages/PaymentPage";

// Data uji dikumpulkan di satu tempat supaya mudah dicocokkan di halaman payment
const testData = {
  contact: {
    firstName: "Budi",
    lastName: "Santoso",
    email: "budi.santoso.qa@example.com",
    country: "Indonesia",
    phoneCountry: "Indonesia",
    phoneCode: "+62",
    phone: "81234567890",
  },
  passenger: {
    nationality: "Indonesia",
    gender: "Male",
    givenName: "Budi",
    dob: { day: "15", month: "May", year: "1995" },
    passport: {
      number: "X1234567",
      countryOfIssue: "Indonesia",
      // Agoda mewajibkan paspor berlaku minimal 6 bulan dari tanggal terbang,
      // jadi dibuat dinamis (+5 tahun) agar test tidak basi
      expiry: {
        day: "20",
        month: "May",
        year: String(new Date().getFullYear() + 5),
      },
    },
  },
};

describe("Skenario Pencarian Penerbangan Agoda E2E", () => {
  it("Berhasil memesan penerbangan one-way dari Jakarta ke Singapura untuk tanggal besok", () => {
    // 1. Buka beranda Agoda & pilih tab Flight
    flightPage.visit();
    flightPage.closeAppPromoPopup();
    flightPage.clickFlightTab();

    // 2. Pilih opsi penerbangan One Way
    flightPage.selectOneWay();

    // 3. Pilih kota asal dan tujuan
    flightPage.enterFlyingFrom("Jakarta", "CGK");
    flightPage.enterFlyingTo("Singapore", "SIN");

    // 4. Pilih tanggal keberangkatan besok
    flightPage.selectDepartureDateTomorrow();

    // 5. Verifikasi form, lalu Search
    flightPage.verifyFormFilled("CGK", "SIN");
    flightPage.clickSearchFlights();

    // 6. Urutkan berdasarkan keberangkatan paling awal
    flightResultPage.sortBy(/^departure time/i);

    // 7. Filter maskapai Malaysia Airlines
    flightResultPage.filterAirline("Malaysia Airlines");

    // 8. Simpan jam penerbangan, pilih penerbangan pertama
    flightResultPage.selectFirstFlight();

    // 9. Halaman booking: isi contact detail
    bookingPage.verifyPageLoaded();
    bookingPage.fillContactDetail(testData.contact);

    // 10. Isi passenger detail
    bookingPage.selectNationality(testData.passenger.nationality);
    bookingPage.selectGender(testData.passenger.gender);
    bookingPage.fillGivenName(testData.passenger.givenName);
    bookingPage.checkNoLastName();
    bookingPage.fillDateOfBirth(testData.passenger.dob);
    bookingPage.fillPassportDetail(testData.passenger.passport);

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
