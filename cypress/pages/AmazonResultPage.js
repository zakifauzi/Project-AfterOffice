import { amazonLocators as L } from "../locators/amazonLocators";
import { normalizeText } from "../support/amazonData";

class AmazonResultPage {
  assertOnResults(keyword) {
    cy.url().should("include", `k=${encodeURIComponent(keyword)}`);
    cy.get(L.result.card, { timeout: 20000 }).should(
      "have.length.greaterThan",
      0,
    );
  }

  sortBy(label, param) {
    cy.get(L.result.sortButton, { timeout: 20000 }).click();
    cy.contains(L.result.sortOption, label).click();
    // Halaman dimuat ulang setelah sort; tunggu sampai benar-benar berganti
    cy.url({ timeout: 20000 }).should("include", `s=${param}`);
    cy.get(L.result.sortPrompt).should("contain.text", label);
    cy.get(L.result.card, { timeout: 20000 }).should(
      "have.length.greaterThan",
      0,
    );
  }

  // Item non-iklan paling kanan di baris pertama. Yields: { $card, name }
  getRightmostFirstRowItem() {
    return cy.get(L.result.card).then(($cards) => {
      const organic = $cards.toArray().filter((el) => {
        const $el = Cypress.$(el);
        const rect = el.getBoundingClientRect();
        const isAd =
          $el.is(".AdHolder") || $el.find(L.result.sponsoredLabel).length > 0;
        return !isAd && $el.is(":visible") && rect.width > 0;
      });
      expect(organic.length, "jumlah item non-iklan").to.be.greaterThan(0);

      const top = (el) => el.getBoundingClientRect().top;
      const left = (el) => el.getBoundingClientRect().left;

      const firstTop = Math.min(...organic.map(top));
      const firstRow = organic.filter(
        (el) => Math.abs(top(el) - firstTop) <= 10,
      );
      const rightmost = firstRow.reduce((a, b) => (left(b) > left(a) ? b : a));

      const $card = Cypress.$(rightmost);
      return {
        $card,
        name: normalizeText($card.find(L.result.title).first().text()),
      };
    });
  }

  clickSeeOptions(item) {
    cy.wrap(item.$card)
      .find(L.result.seeOptions)
      .first()
      .invoke("removeAttr", "target")
      .click();
  }
}

export default new AmazonResultPage();
