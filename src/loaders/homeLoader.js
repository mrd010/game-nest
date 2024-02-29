import getUserLanguage from '../helpers/userInfoHelpers';

// recommended games should be above this threshold
const recommendedGamesMinScore = 80;
const userLanguage = getUserLanguage();
const recommendedGamesApi = `https://www.cheapshark.com/api/1.0/deals?AAA=1&sortBy=Release&metacritic=${recommendedGamesMinScore}`;
const featuredCategoriesApi = 'https://store.steampowered.com/api/featuredcategories';
const trailersApi = `https://store.steampowered.com/api/trailerslideshow/?l=${userLanguage}`;

export const homeLoader = () => {};
