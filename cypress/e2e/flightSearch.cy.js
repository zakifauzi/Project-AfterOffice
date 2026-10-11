import FlightSearchPage from "../pages/FlightSearchPage";

const flightPage = new FlightSearchPage();

describe("Agoda Flight Search", () => {
  it("Should successfully search a flight using the main method", () => {
    flightPage.visit();

    flightPage.searchFlight(
      "Jakarta", // 1. Flying from
      "Singapore (SIN)", // 2. Flying to
      "2026-11-01", // 3. Tanggal keberangkatan
    );
  });
});
