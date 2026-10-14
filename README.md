# Agoda Flight E2E (Cypress)

Pengujian end-to-end untuk alur pemesanan penerbangan one-way **Jakarta (CGK) → Singapura (SIN)** di [agoda.com](https://www.agoda.com), dari pencarian sampai halaman pembayaran (tanpa membayar).

## Skenario yang Diuji

File: `cypress/e2e/flightSearch.cy.js`

1. Buka beranda Agoda, tutup popup promo, pilih tab Flight.
2. Pilih One Way, isi kota asal dan tujuan, pilih tanggal keberangkatan besok.
3. Cari penerbangan, urutkan berdasarkan *Departure time (Earliest first)*, filter maskapai.
4. Pilih penerbangan pertama dan simpan jam berangkat serta jam tiba.
5. Isi contact detail, passenger detail, dan data paspor.
6. Pilih support level Basic, tolak Travel Protection, setujui syarat, simpan total harga.
7. Lanjut ke pembayaran (menolak penawaran *last chance* bila muncul).
8. Di halaman payment, validasi:
   - **Total price** sama dengan halaman passenger detail.
   - **Data kontak dan penumpang** sama dengan yang diisi.
   - **Departure time dan arrival time** sama dengan penerbangan yang dipilih.

## Teknologi

| Komponen | Keterangan |
|---|---|
| Cypress `^16.1.1` | Framework E2E dan perekam video |
| cypress-mochawesome-reporter `^5.0.0` | Laporan HTML |
| Page Object Model | Halaman dan locator dipisah dari spec |
| `Cypress.expose()` | Membaca data uji dari environment variable |

## Prasyarat

- **Node.js 22.x, 24.x, atau 26.x ke atas** (syarat Cypress 16)
- Google Chrome
- Koneksi internet (test berjalan di situs Agoda yang sebenarnya)

## Instalasi

```bash
npm install
```

## Struktur Proyek

```
.
├── cypress.config.js          # video, reporter, expose
├── cypress.env.json           # data uji (environment variable)
├── package.json
└── cypress/
    ├── e2e/
    │   └── flightSearch.cy.js # skenario utama
    ├── pages/                 # Page Object Model
    │   ├── flightPage.js
    │   ├── FlightResultPage.js
    │   ├── BookingPage.js
    │   └── PaymentPage.js
    ├── locators/
    │   ├── flightLocators.js
    │   └── bookingLocators.js
    ├── support/
    │   ├── e2e.js             # reporter + penanganan error aplikasi
    │   ├── commands.js
    │   └── testData.js        # membaca data uji dari expose
    ├── reports/               # laporan HTML (dibuat otomatis)
    ├── videos/                # video run (dibuat otomatis)
    └── screenshots/           # screenshot saat gagal (dibuat otomatis)
```

## Environment Variable

Semua data uji (kota, kontak, penumpang, paspor) disimpan di `cypress.env.json` dan **tidak ditulis langsung di spec**. Isi file itu dimuat ke key `expose` di `cypress.config.js`, lalu dibaca lewat `Cypress.expose()` di `cypress/support/testData.js`.

Cypress 16 menghapus `Cypress.env()`. Karena data uji ini tidak sensitif, `Cypress.expose()` adalah penggantinya. Kalau ada variabel yang belum diisi, test berhenti dengan pesan yang menyebut nama variabelnya.

Contoh variabel:

| Variabel | Contoh |
|---|---|
| `BASE_URL` | `https://www.agoda.com` |
| `ORIGIN_CODE` / `DESTINATION_CODE` | `CGK` / `SIN` |
| `AIRLINE` | `Malaysia Airlines` |
| `CONTACT_FIRST_NAME`, `CONTACT_LAST_NAME` | `Budi`, `Santoso` |
| `PASSENGER_GIVEN_NAME` | `Andi` |
| `PASSPORT_NUMBER` | `X1234567` |
| `PASSPORT_VALIDITY_YEARS` | `5` |

Masa berlaku paspor dihitung dari tahun berjalan ditambah `PASSPORT_VALIDITY_YEARS`, karena Agoda mewajibkan paspor berlaku minimal 6 bulan dari tanggal terbang.

Mengganti satu nilai tanpa mengedit file:

```bash
npx cypress run --expose "PASSENGER_GIVEN_NAME=Rina"
```

## Menjalankan Test

Mode laporan dan video (yang dipakai untuk pengumpulan):

```bash
npx cypress run --spec cypress/e2e/flightSearch.cy.js --browser chrome
```

Mode interaktif (tanpa video dan laporan HTML):

```bash
npx cypress open
```

## Hasil Dokumentasi

Video dan laporan HTML hanya dibuat oleh `cypress run`.

| Hasil | Lokasi |
|---|---|
| Laporan HTML | `cypress/reports/agoda-flight-e2e.html` |
| Video bawaan Cypress | `cypress/videos/flightSearch.cy.js.mp4` |
| Screenshot saat gagal | `cypress/screenshots/` |

Buka file HTML langsung di browser. Sertakan seluruh folder `cypress/reports/`, bukan hanya file `.html`-nya.

## Catatan Penting

- **Error dari kode Agoda diabaikan secara terbatas.** Di `cypress/support/e2e.js`, error `Bad/empty server response` yang berasal dari JavaScript situs Agoda (bukan dari test) sengaja diabaikan, karena tanpa itu Cypress otomatis menggagalkan test. Hanya pesan tersebut yang diabaikan. Error lain tetap menggagalkan test.
- **Nama penumpang tampil dua kali.** Penumpang diisi dengan opsi *no surname*, dan Agoda menampilkan given name di kolom nama belakang (contoh: `ANDI ANDI`). Validasi di halaman payment mengikuti perilaku ini.
- **Test berjalan di situs publik.** Harga, ketersediaan penerbangan, popup, dan kecepatan respons bisa berubah, sehingga test sesekali bisa gagal tanpa ada perubahan kode. Di mode `run`, test diulang satu kali bila gagal (`retries.runMode`).
- **Tanggal keberangkatan selalu "besok"** dihitung saat test berjalan, jadi tidak perlu diubah manual.

## Pemecahan Masalah

| Gejala | Kemungkinan penyebab |
|---|---|
| `Environment variable "..." belum diisi` | Variabel belum ada di `cypress.env.json` atau key `expose` belum terpasang di `cypress.config.js` |
| `Cypress.env() was removed` | Ada kode yang masih memakai `Cypress.env()`, ganti dengan `Cypress.expose()` |
| File HTML tidak terbentuk | Test dijalankan dengan `cypress open`, atau reporter belum terdaftar di `cypress.config.js` dan `cypress/support/e2e.js` |
| Test gagal hanya di mode `run` | Coba tambahkan `--headed` untuk membandingkan perilaku situs |
| `Module not found` saat import | Huruf besar-kecil nama file tidak sama dengan yang di-import (penting di Mac dan Linux) |
