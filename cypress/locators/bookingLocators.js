const bookingLocators = {
  // --- Contact detail ---
  CONTACT_FIRST_NAME: '[data-testid="contact.contactFirstName"]',
  CONTACT_LAST_NAME: '[data-testid="contact.contactLastName"]',
  CONTACT_EMAIL: '[data-testid="contact.contactEmail"]',
  CONTACT_COUNTRY: '[data-testid="contact.contactCountryOfResidenceId"]',
  CONTACT_PHONE_CODE:
    '[data-testid="contact.contactPhoneNumber-CountryCodeDataTestId"]',
  CONTACT_PHONE_NUMBER:
    '[data-testid="contact.contactPhoneNumber-PhoneNumberDataTestId"]',

  // Panel dropdown/combobox (dipakai bersama oleh semua dropdown)
  FLOATER: '[data-testid="floater-container"]',

  // --- Passenger detail ---
  GENDER_MALE: '[data-testid="0"]',
  GENDER_FEMALE: '[data-testid="1"]',
  PASSENGER_NATIONALITY:
    '[data-testid="flight.forms.i0.units.i0.passengerNationality"]',
  PASSENGER_FIRST_NAME:
    '[data-testid="flight.forms.i0.units.i0.passengerFirstName"]',
  PASSENGER_NO_LAST_NAME:
    '[aria-describedby="helper-message-flight.forms.i0.units.i0.passengerNoLastName"]',
  DOB_DAY:
    '[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-DateInputDataTestId"]',
  DOB_MONTH:
    '[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-MonthInputDataTestId"]',
  // CATATAN: dari Anda tertulis "passportExpiryDate-YearInputDataTestId".
  // Itu terlihat seperti field paspor, bukan tanggal lahir. Saya samakan
  // dengan pola DOB di atas. Verifikasi lewat DevTools.
  DOB_YEAR:
    '[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-YearInputDataTestId"]',

  // --- Opsi tambahan ---
  SUPPORT_BASIC: '[data-testid="ceg-upsell-select-button-option-BASIC"]',
  TRAVEL_PROTECTION_NO: '[data-testid="radio-button-option-no"]',
  TERMS_CONTAINER: '[data-component="terms-and-privacy-text-container"]',
  CONTINUE_PAYMENT: '[data-testid="continue-to-payment-button"]',

  // Total harga final di price breakdown (setelah diskon)

  TOTAL_PRICE: '[data-component="mob-flight-price-total-desc"]',

  // Modal "last chance" setelah klik Continue (mis. Upgrade your support level)
  LAST_CHANCE_DECLINE: '[data-component="last-chance-decline-button"]',
};

export default bookingLocators;
