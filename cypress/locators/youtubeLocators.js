// Locator YouTube. Verifikasi ulang lewat DevTools jika YouTube mengubah DOM.
export const youtubeLocators = {
  guide: {
    // Section "Explore": "Show more" milik grup collapsible yang berisi Gaming
    showMore:
      'ytd-guide-collapsible-entry-renderer:has(a[href="/gaming"]) #expander-item',
    // Entri Gaming sudah ada di DOM tapi tersembunyi sampai "Show more" diklik
    gaming: 'ytd-guide-collapsible-entry-renderer a#endpoint[href="/gaming"]',
  },
  gaming: {
    // Tombol "View all" di shelf "Trending videos" (bukan link judul shelf)
    trendingViewAll:
      'ytd-horizontal-card-list-renderer #header-button a[href="/gaming/trending"]',
  },
  trending: {
    // Link judul video di halaman /gaming/trending (renderer bisa berbeda, jadi dua varian)
    videoTitle:
      "ytd-browse:not([hidden]) a#video-title, ytd-browse:not([hidden]) a#video-title-link",
  },
  watch: {
    title: "ytd-watch-metadata h1",
  },
};
