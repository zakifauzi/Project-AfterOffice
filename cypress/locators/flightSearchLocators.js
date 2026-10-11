const flightSearchLocators = {
  originInput: "#flight-origin-search-input", // verifikasi dulu di Playground
  destinationInput: "#flight-destination-search-input", // terverifikasi
  departureDateBox: "#flight-departure", // terverifikasi (versi pendek)

  // TODO: ambil dari Selector Playground (lihat langkah di bawah)
  firstSuggestion: "TODO_ITEM_SARAN_PERTAMA",
  searchBtn: "TODO_TOMBOL_SEARCH",
  getDateCell: (dateString) => `TODO_SEL_TANGGAL_${dateString}`,
};

export default flightSearchLocators;
