import { amazonLocators as L } from "../locators/amazonLocators";
import { normalizeText } from "../support/amazonData";

class AmazonProductPage {
  clickSeeAllBuyingOptions() {
    cy.get(L.product.seeAllBuyingOptions, { timeout: 20000 })
      .filter(":visible")
      .first()
      .click();
    cy.get(L.offers.panel, { timeout: 20000 }).should("be.visible");
  }

  // Yields: { name, priceText }
  readOffer() {
    return cy
      .get(L.offers.title, { timeout: 20000 })
      .first()
      .then(($title) => {
        const name = normalizeText($title.text());
        return cy
          .get(L.offers.price, { timeout: 20000 })
          .first()
          .then(($price) => ({
            name,
            priceText: normalizeText($price.text()),
          }));
      });
  }

  assertOffer(offer, expectedName) {
    expect(offer.name, "nama di panel offers vs search page").to.contain(
      expectedName,
    );
    expect(offer.priceText, "harga di panel offers").to.not.be.empty;
  }

  // Harga di aria-label tombol harus sama dengan harga di panel offers
  assertAddToCartPrice(offer) {
    cy.get(L.offers.addToCart, { timeout: 20000 })
      .filter(":visible")
      .first()
      .should("have.attr", "aria-label")
      .and("contain", offer.priceText);
  }

  clickAddToCart() {
    cy.get(L.offers.addToCart, { timeout: 20000 })
      .filter(":visible")
      .first()
      .click();
  }
}

export default new AmazonProductPage();
