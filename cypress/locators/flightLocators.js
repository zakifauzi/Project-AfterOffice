const flightLocators = {
  // Menu Navigasi & Tipe Penerbangan
  FLIGHT_TAB: '[id="travel-search-navigation-tab-2"]',
  ONE_WAY_RADIO: '[data-element-object-id="one-way"]',

  // Form Input Lokasi (Asal & Tujuan)
  FLYING_FROM_INPUT: '[data-selenium="flight-origin-search-input"]',
  FLYING_TO_INPUT: '[data-selenium="flight-destination-search-input"]',

  // Tanggal Keberangkatan (Departure) & Kalender
  DEPARTURE_SELECTOR: '[data-selenium="flight-date-selector"]',
  CALENDAR_CONTAINER: '[id="dateSelector-calendar"]',
  CALENDAR_ROOT: '[class="rdp-root ads-date-picker"]',
  CALENDAR_MONTHS: '[class="rdp-months"]',
  CALENDAR_WEEKDAY: '[class="rdp-weekday"]',
  CALENDAR_WEEKS: '[class="rdp-weeks"]',

  // Penumpang (Passenger) & Tombol Cari
  PASSENGER_SELECTOR: '[data-component="flight-search-occupancy"]',
  PASSENGER_POPUP: '[class="Popup__content"]',
  SEARCH_BUTTON: '[data-component="flight-search-button"]',
};

export default flightLocators;
