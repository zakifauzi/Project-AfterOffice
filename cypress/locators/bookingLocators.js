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
  PASSENGER_NATIONALITY:
    '[data-testid="flight.forms.i0.units.i0.passengerNationality"]',
  PASSENGER_FIRST_NAME:
    '[data-testid="flight.forms.i0.units.i0.passengerFirstName"]',
  PASSENGER_NO_LAST_NAME:
    '[aria-describedby="helper-message-flight.forms.i0.units.i0.passengerNoLastName"]',

  // Gender: data-testid berupa index radio (0 = Male)
  GENDER_MALE: '[data-testid="0"]',
  GENDER_FEMALE: '[data-testid="1"]', // ASUMSI, belum diverifikasi

  // Date of birth
  DOB_DAY:
    '[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-DateInputDataTestId"]',
  DOB_MONTH:
    '[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-MonthInputDataTestId"]',
  // ASUMSI: mengikuti pola DOB di atas. Verifikasi lewat DevTools.
  DOB_YEAR:
    '[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-YearInputDataTestId"]',

  // --- Passport ---
  // field-wrapper dipakai banyak field: dipersempit lewat teks label di page object
  FIELD_WRAPPER: '[data-testid="field-wrapper"]',
  PASSPORT_EXPIRY_DAY:
    '[data-testid="flight.forms.i0.units.i0.passportExpiryDate-DateInputDataTestId"]',
  PASSPORT_EXPIRY_MONTH:
    '[data-testid="flight.forms.i0.units.i0.passportExpiryDate-MonthInputDataTestId"]',
  PASSPORT_EXPIRY_YEAR:
    '[data-testid="flight.forms.i0.units.i0.passportExpiryDate-YearInputDataTestId"]',

  // --- Opsi tambahan ---
  SUPPORT_BASIC: '[data-testid="ceg-upsell-select-button-option-BASIC"]',
  TRAVEL_PROTECTION_NO: '[data-testid="radio-button-option-no"]',
  TERMS_CONTAINER: '[data-component="terms-and-privacy-text-container"]',
  CONTINUE_PAYMENT: '[data-testid="continue-to-payment-button"]',

  // Modal "last chance" setelah klik Continue (mis. Upgrade your support level)
  LAST_CHANCE_DECLINE: '[data-component="last-chance-decline-button"]',

  // Total harga final di price breakdown (setelah diskon)
  TOTAL_PRICE: '[data-component="mob-flight-price-total-desc"]',
};

export default bookingLocators;
