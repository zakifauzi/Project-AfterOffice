// Cypress 16: Cypress.env() sudah dihapus. Nilai dari cypress.env.json dibaca lewat cy.env()
// (asinkron, jadi hanya boleh dipanggil di dalam hook/test, bukan di level describe).
const KEYS = [
  "AMAZON_BASE_URL",
  "AMAZON_SEARCH_KEYWORD",
  "AMAZON_SORT_LABEL",
  "AMAZON_SORT_PARAM",
];

export const loadAmazonData = () =>
  cy.env(KEYS).then((env) => {
    KEYS.forEach((key) => {
      if (!env[key]) {
        throw new Error(`${key} belum diisi di cypress.env.json`);
      }
    });
    return {
      baseUrl: env.AMAZON_BASE_URL,
      searchKeyword: env.AMAZON_SEARCH_KEYWORD,
      sortLabel: env.AMAZON_SORT_LABEL,
      sortParam: env.AMAZON_SORT_PARAM,
    };
  });

export const normalizeText = (text) => String(text).replace(/\s+/g, " ").trim();

// "$1,299.99" -> 1299 (hanya sampai digit satuan, tanpa sen)
export const toWholeDollar = (text) =>
  Math.floor(parseFloat(String(text).replace(/[^\d.]/g, "")));
