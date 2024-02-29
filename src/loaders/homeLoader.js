import { getFeaturedCategories, getRecommendedGames, getTrailers } from '../services/dataFetchers';
import getUserLanguage from '../services/userLocaleServices';

// recommended games should be above this threshold
const recommendedGamesMinScore = 80;
// get user lang
const userLanguage = getUserLanguage();

export const homeLoader = async () => {
  const dataPromises = [
    getRecommendedGames(recommendedGamesMinScore),
    getFeaturedCategories(userLanguage),
    getTrailers(userLanguage),
  ];

  const homeData = await Promise.all(dataPromises).then((data) => {
    return { recommendedGames: data[0], featuredCategories: data[1], trailers: data[2] };
  });
  return homeData;
};