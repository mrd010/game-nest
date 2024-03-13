import { getTrailers } from '../services/dataFetchers';

export const trailersLoader = async () => {
  const trailers = await getTrailers();
  if (trailers.status === 1) {
    return trailers.movies;
  }
  return null;
};
