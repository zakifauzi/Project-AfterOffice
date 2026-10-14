// Lokasi: cypress/support/e2e.js
// CATATAN: gabungkan dengan isi e2e.js Anda. Dua import pertama kemungkinan
// sudah ada, jadi cukup tambahkan blok "uncaught:exception" di bawahnya.
import "./commands";
import "cypress-mochawesome-reporter/register";

// Error dari KODE APLIKASI Agoda (bukan dari test kita) yang tidak memengaruhi
// alur pemesanan. Tanpa ini Cypress otomatis menggagalkan test.
// Tambahkan pola baru HANYA setelah error-nya terbukti tidak relevan.
const IGNORED_APP_ERRORS = ["Bad/empty server response"];

Cypress.on("uncaught:exception", (err) => {
  const message = String(err?.message ?? err);
  const isIgnored = IGNORED_APP_ERRORS.some((pattern) =>
    message.includes(pattern),
  );

  // false = abaikan error ini; undefined = perilaku bawaan (test gagal)
  return isIgnored ? false : undefined;
});
