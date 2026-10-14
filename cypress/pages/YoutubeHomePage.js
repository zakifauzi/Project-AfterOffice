import { youtubeLocators as L } from "../locators/youtubeLocators";

class YoutubeHomePage {
  visit(baseUrl) {
    cy.visit(baseUrl);
  }

  // Scroll sidebar ke section Explore lalu klik "Show more"
  clickExploreShowMore() {
    cy.get(L.guide.showMore, { timeout: 20000 })
      .scrollIntoView()
      .should("be.visible")
      .click();
    cy.get(L.guide.gaming).should("be.visible");
  }

  clickGaming() {
    cy.get(L.guide.gaming).scrollIntoView().click();
    cy.url({ timeout: 20000 }).should("include", "/gaming");
  }
}

export default new YoutubeHomePage();
