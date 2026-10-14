// Locator Amazon. Verifikasi ulang lewat DevTools jika Amazon mengubah DOM.
export const amazonLocators = {
  home: {
    searchBox: "#twotabsearchtextbox",
    // Sengaja pakai tombol "Go" asli, bukan #nav-search-submit-button-agent (tombol "Agent Search" tersembunyi)
    searchButton: "#nav-search-submit-button",
  },
  result: {
    card: 'div[data-component-type="s-search-result"][data-asin]:not([data-asin=""])',
    sponsoredLabel:
      '.puis-sponsored-label-text, .s-sponsored-label-text, [aria-label*="Sponsored"]',
    title: "h2",
    sortButton: 'form[action="/s"] span[data-action="a-dropdown-button"]',
    sortPrompt: 'form[action="/s"] .a-dropdown-prompt',
    sortOption: ".a-popover-wrapper a.a-dropdown-link",
    // Tombol "See options" di dalam kartu
    seeOptions: ".puis-see-details-content a.a-button-text",
  },
  product: {
    seeAllBuyingOptions:
      '#buybox-see-all-buying-choices a.a-button-text, a[title="See All Buying Options"], a[href*="/gp/offer-listing/"]',
  },
  offers: {
    panel: "#aod-offer-list",
    // ID duplikat (sticky + pinned), jadi selalu pakai .first()
    title: "#aod-asin-title-text",
    // Harga offer pertama (teks offscreen, mis. "$43,770.00")
    price: "#aod-offer-list #aod-price-1 .apex-pricetopay-accessibility-label",
    addToCart: '#aod-offer-list input[name="submit.addToCart"]',
  },
};
