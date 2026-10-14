import { youtubeLocators as L } from "../locators/youtubeLocators";

class YoutubeGamingPage {
  // Scroll ke shelf "Trending videos" lalu klik "View all"
  clickTrendingViewAll() {
    cy.get(L.gaming.trendingViewAll, { timeout: 20000 })
      .first()
      .scrollIntoView()
      .should("be.visible")
      .click();
    cy.url({ timeout: 20000 }).should("include", "/gaming/trending");
  }
}

export default new YoutubeGamingPage();
