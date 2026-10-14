import { loadAmazonData } from "../support/amazonData";
import homePage from "../pages/AmazonHomePage";
import resultPage from "../pages/AmazonResultPage";
import productPage from "../pages/AmazonProductPage";

describe("Amazon search", () => {
  it("mencari 'chair', urutkan harga tertinggi, lalu see options sampai add to cart", () => {
    loadAmazonData().then(
      ({ baseUrl, searchKeyword, sortLabel, sortParam }) => {
        homePage.visit(baseUrl);
        homePage.search(searchKeyword);
        resultPage.assertOnResults(searchKeyword);

        resultPage.sortBy(sortLabel, sortParam);

        resultPage.getRightmostFirstRowItem().then((item) => {
          resultPage.clickSeeOptions(item);
          productPage.clickSeeAllBuyingOptions();
          productPage.clickAddToCart();
        });
      },
    );
  });
});
