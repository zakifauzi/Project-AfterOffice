// Lokasi: cypress/support/testData.js
// Semua data uji dibaca lewat Cypress.expose() (Cypress 16: Cypress.env() dihapus).
// Sumbernya: cypress.env.json yang dimuat di cypress.config.js (key `expose`).
// Override lewat CLI: --expose KEY=value

// Wajib ada: gagal cepat dengan pesan jelas kalau variabel belum diisi.
// String(...) penting: --expose dari CLI bisa mengubah "81234567890" menjadi angka.
const required = (key) => {
  const value = Cypress.expose(key);
  if (value === undefined || value === null || value === "") {
    throw new Error(
      `Environment variable "${key}" belum diisi (cek cypress.env.json dan key expose di cypress.config.js)`,
    );
  }
  return String(value);
};

export const getTestData = () => ({
  baseUrl: required("BASE_URL"),

  search: {
    originCity: required("ORIGIN_CITY"),
    originCode: required("ORIGIN_CODE"),
    destinationCity: required("DESTINATION_CITY"),
    destinationCode: required("DESTINATION_CODE"),
    airline: required("AIRLINE"),
  },

  contact: {
    firstName: required("CONTACT_FIRST_NAME"),
    lastName: required("CONTACT_LAST_NAME"),
    email: required("CONTACT_EMAIL"),
    country: required("CONTACT_COUNTRY"),
    phoneCountry: required("CONTACT_PHONE_COUNTRY"),
    phoneCode: required("CONTACT_PHONE_CODE"),
    phone: required("CONTACT_PHONE"),
  },

  passenger: {
    nationality: required("PASSENGER_NATIONALITY"),
    gender: required("PASSENGER_GENDER"),
    givenName: required("PASSENGER_GIVEN_NAME"),
    dob: {
      day: required("PASSENGER_DOB_DAY"),
      month: required("PASSENGER_DOB_MONTH"),
      year: required("PASSENGER_DOB_YEAR"),
    },
    passport: {
      number: required("PASSPORT_NUMBER"),
      countryOfIssue: required("PASSPORT_COUNTRY"),
      // Agoda mewajibkan paspor berlaku minimal 6 bulan dari tanggal terbang,
      // jadi tahun dihitung dinamis agar test tidak basi
      expiry: {
        day: required("PASSPORT_EXPIRY_DAY"),
        month: required("PASSPORT_EXPIRY_MONTH"),
        year: String(
          new Date().getFullYear() +
            Number(required("PASSPORT_VALIDITY_YEARS")),
        ),
      },
    },
  },
});
