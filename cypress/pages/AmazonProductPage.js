import { amazonLocators as L } from "../locators/amazonLocators";

class AmazonProductPage {
  clickSeeAllBuyingOptions() {
    cy.get(L.product.seeAllBuyingOptions, { timeout: 20000 })
      .filter(":visible")
      .first()
      .click();
    cy.get(L.offers.panel, { timeout: 20000 }).should("be.visible");
  }

  clickAddToCart() {
    cy.get(L.offers.addToCart, { timeout: 20000 })
      .filter(":visible")
      .first()
      .click();
  }
}

export default new AmazonProductPage();
