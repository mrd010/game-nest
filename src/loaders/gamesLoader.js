import { getGamesInGenre, getNewReleases } from '../services/dataFetchers';
import getUserLanguage from '../services/userLocaleServices';

const language = getUserLanguage();

export const gamesLoader = async ({ params }) => {
  // if route is a genre route get genre games
  if (params && params.catId && params.catId !== 'new releases') {
    const gamesInGenre = await getGamesInGenre(params.catId, language);
    return { category: params.catId, data: gamesInGenre };
  }
  //   if route is default route or new releases get new releases data
  const newReleasedGames = await getNewReleases(language);
  return { id: 'new releases', data: newReleasedGames };
};
