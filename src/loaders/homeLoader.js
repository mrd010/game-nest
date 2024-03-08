import {
  getBestDeals,
  getFeaturedCategories,
  getRecommendedGames,
  getTrailers,
} from '../services/dataFetchers';
import getUserLanguage from '../services/userLocaleServices';

// recommended games should be above this threshold
const recommendedGamesMinScore = 80;
const bestDealsMinScore = 50;
// get user lang
const userLanguage = getUserLanguage();

export const homeLoader = async () => {
  // array of fetching data. page loads when all fetched
  const dataPromises = [
    getRecommendedGames(recommendedGamesMinScore),
    getFeaturedCategories(userLanguage),
    getTrailers(userLanguage),
    getBestDeals(bestDealsMinScore, 4),
  ];

  const homeData = await Promise.all(dataPromises).then((data) => {
    return {
      recommendedGames: data[0],
      featuredCategories: data[1],
      trailers: data[2],
      bestDeals: data[3],
    };
  });
  return homeData;
};
