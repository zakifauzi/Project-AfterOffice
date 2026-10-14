import { loadYoutubeData } from "../support/youtubeData";
import homePage from "../pages/YoutubeHomePage";
import gamingPage from "../pages/YoutubeGamingPage";
import trendingPage from "../pages/YoutubeTrendingPage";

describe("YouTube Gaming", () => {
  it("masuk YouTube, Explore > Show more > Gaming > Trending View all > video nomor 3", () => {
    loadYoutubeData().then(({ baseUrl }) => {
      homePage.visit(baseUrl);
      homePage.clickExploreShowMore();
      homePage.clickGaming();

      gamingPage.clickTrendingViewAll();

      trendingPage.openVideoByPosition(3).then((title) => {
        trendingPage.assertOnWatchPage(title);
      });
    });
  });
});
