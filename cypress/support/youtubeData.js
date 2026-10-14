const KEYS = ["YOUTUBE_BASE_URL"];

export const loadYoutubeData = () =>
  cy.env(KEYS).then((env) => {
    KEYS.forEach((key) => {
      if (!env[key]) {
        throw new Error(`${key} belum diisi di cypress.env.json`);
      }
    });
    return { baseUrl: env.YOUTUBE_BASE_URL };
  });

export const normalizeText = (text) => String(text).replace(/\s+/g, " ").trim();
