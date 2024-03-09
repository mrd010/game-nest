import { getGenresList } from '../services/dataFetchers';
import getUserLanguage from '../services/userLocaleServices';

// get user lang
const userLanguage = getUserLanguage();

export const appLoader = async () => {
  const genres = await getGenresList(userLanguage);
  return genres.map((genre) => ({ id: genre.id, name: genre.name }));
};
