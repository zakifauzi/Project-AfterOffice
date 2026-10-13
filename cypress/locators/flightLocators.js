const flightLocators = {
  // Menu Navigasi & Tipe Penerbangan
  FLIGHT_TAB: '[id="travel-search-navigation-tab-2"]',
  ONE_WAY_RADIO: '[data-element-object-id="one-way"]',

  // Pop up promo aplikasi
  CLOSE_POPUP:
    '[data-element-test="prominent-app-download-popover"] button[aria-label="Close"]',

  // Form Input Lokasi (Asal & Tujuan)
  FLYING_FROM_INPUT: '[data-selenium="flight-origin-search-input"]',
  FLYING_TO_INPUT: '[data-selenium="flight-destination-search-input"]',

  // Suggestion dropdown: dipilih berdasarkan kode bandara.
  // place-type="1" = bandara (place-type="0" = "All airports" untuk satu kota)
  SUGGESTION_ORIGIN: (code) =>
    `[data-element-name="flight-origin-search-result"][data-element-object-id="${code}"][data-element-place-type="1"]`,
  SUGGESTION_DESTINATION: (code) =>
    `[data-element-name="flight-destination-search-result"][data-element-object-id="${code}"][data-element-place-type="1"]`,

  // Tanggal Keberangkatan & Kalender
  DEPARTURE_SELECTOR: "#flight-departure > .Box-sc-kv6pi1-0",
  DEPARTURE_FIELD: "#flight-departure",
  CALENDAR_FLOATER: '[data-testid="floater-container"]',
  CALENDAR_DATE_IN_FLOATER: (date) =>
    `[data-testid="floater-container"] [data-selenium-date="${date}"], [data-testid="floater-container"] [data-day="${date}"]`,

  // Popup passenger (dipakai untuk menutupnya sebelum Search) & tombol cari
  PASSENGER_POPUP: '[class="Popup__content"]',
  SEARCH_BUTTON: '[data-component="flight-search-button"]',

  // Hasil pencarian: sort & filter
  SORT_BUTTON: '[data-testid="flights-quick-sort-item-other-button"]',
  SORT_OPTION: 'button[role="option"]',

  //memilih penerbangan
  SELECT_BUTTON: '[data-testid="flight-detail-select-button"]',
};

export default flightLocators;
