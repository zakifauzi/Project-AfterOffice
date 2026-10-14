import { amazonLocators as L } from "../locators/amazonLocators";

class AmazonHomePage {
  visit(baseUrl) {
    cy.visit(baseUrl);
  }

  search(keyword) {
    cy.get(L.home.searchBox).should("be.visible").clear().type(keyword);
    cy.get(L.home.searchButton).click();
  }
}

export default new AmazonHomePage();
