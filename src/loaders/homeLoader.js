import { getFeaturedCategories, getRecommendedGames, getTrailers } from '../services/dataFetchers';
import { extractImportantGameIds } from '../services/extractors';
import getUserLanguage from '../services/userLocaleServices';

// recommended games should be above this threshold
const recommendedGamesMinScore = 80;
// get user lang
const userLanguage = getUserLanguage();

export const homeLoader = async () => {
  // array of fetching data. page loads when all fetched
  const dataPromises = [
    getRecommendedGames(recommendedGamesMinScore),
    getFeaturedCategories(userLanguage),
    getTrailers(userLanguage),
  ];

  const homeData = await Promise.all(dataPromises).then((data) => {
    return {
      recommendedGames: data[0],
      featuredCategories: data[1],
      trailers: data[2],
      importantGamesIds: extractImportantGameIds(data[0], data[1].top_sellers.items),
    };
  });
  return homeData;
};
