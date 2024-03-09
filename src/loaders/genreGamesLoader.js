import { getGamesInGenre } from '../services/dataFetchers';
import getUserLanguage from '../services/userLocaleServices';

const language = getUserLanguage();

export const genreGamesLoader = async ({ params }) => {
  // if route is a genre route get genre games
  if (params.catId && params.catId !== 'new releases') {
    const gamesInGenre = await getGamesInGenre(params.catId, language);
    return gamesInGenre;
  }
  throw new Error('Category not found');
};
