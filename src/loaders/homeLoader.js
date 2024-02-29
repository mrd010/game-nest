import { getRecommendedGames } from '../services/dataFetchers';
import getUserLanguage from '../services/userLocaleServices';

// recommended games should be above this threshold
const recommendedGamesMinScore = 80;
// get user lang
const userLanguage = getUserLanguage();

export const homeLoader = () => {
  const recommendedGamesPromise = getRecommendedGames(recommendedGamesMinScore);

  Promise.all([recommendedGamesPromise]).then((data) => console.log(data));
  return null;
};
