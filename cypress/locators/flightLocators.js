const flightLocators = {
  // Menu Navigasi & Tipe Penerbangan
  FLIGHT_TAB: '[id="travel-search-navigation-tab-2"]',
  ONE_WAY_RADIO: '[data-element-object-id="one-way"]',

  // Form Input Lokasi (Asal & Tujuan)
  FLYING_FROM_INPUT: '[data-selenium="flight-origin-search-input"]',
  FLYING_TO_INPUT: '[data-selenium="flight-destination-search-input"]',

  //locator untuk mensilang pop up
  CLOSE_POPUP:
    '[data-element-test="prominent-app-download-popover"] button[aria-label="Close"]',

  // Suggestion Dropdown Locator (New addition)
  SUGGESTION_ITEM: '[id*="-option-1"]',
  // Tanggal Keberangkatan (Departure) & Kalender
  DEPARTURE_SELECTOR: "#flight-departure > .Box-sc-kv6pi1-0",
  CALENDAR_FLOATER: '[data-testid="floater-container"]',
  CALENDAR_DATE: (date) =>
    `[data-selenium-date="${date}"], [data-day="${date}"]`,
  // Penumpang (Passenger) & Tombol Cari
  PASSENGER_SELECTOR: '[data-component="flight-search-occupancy"]',
  PASSENGER_POPUP: '[class="Popup__content"]',
  SEARCH_BUTTON: '[data-component="flight-search-button"]',
};

export default flightLocators;
