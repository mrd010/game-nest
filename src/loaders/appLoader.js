import genreFilterList from '../data/genres';
import { getGenresList } from '../services/dataFetchers';
import getUserLanguage from '../services/userLocaleServices';

// get user lang
const userLanguage = getUserLanguage();

export const appLoader = async () => {
  const genres = await getGenresList(userLanguage);
  // filter no use genres and genres which their id is not equal to their names before return
  const filteredGenres = genres.filter(
    (genre) => !genreFilterList.includes(genre.id) && genre.id === genre.name
  );
  return filteredGenres.map((genre) => genre.name);
};
