import { getNewReleases } from '../services/dataFetchers';
import getUserLanguage from '../services/userLocaleServices';

const language = getUserLanguage();

export const newReleasesLoader = async () => {
  const newReleasedGames = await getNewReleases(language);
  return newReleasedGames;
};
