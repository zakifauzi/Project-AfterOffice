import { youtubeLocators as L } from "../locators/youtubeLocators";
import { normalizeText } from "../support/youtubeData";

class YoutubeTrendingPage {
  // Klik video ke-N (mulai dari 1). Yields: judul video yang diklik
  openVideoByPosition(position) {
    return cy
      .get(L.trending.videoTitle, { timeout: 20000 })
      .filter(":visible")
      .should("have.length.at.least", position)
      .eq(position - 1)
      .then(($link) => {
        const title = normalizeText($link.attr("title") || $link.text());
        cy.wrap($link).scrollIntoView().click();
        return cy.wrap(title);
      });
  }

  assertOnWatchPage(expectedTitle) {
    cy.url({ timeout: 20000 }).should("include", "/watch");
    cy.get(L.watch.title, { timeout: 20000 })
      .should("be.visible")
      .then(($h1) => {
        expect(normalizeText($h1.text()), "judul di halaman watch").to.contain(
          expectedTitle,
        );
      });
  }
}

export default new YoutubeTrendingPage();
