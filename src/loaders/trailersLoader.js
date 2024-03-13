import { getTrailers } from '../services/dataFetchers';

export const trailersLoader = async () => {
  const trailers = await getTrailers();
  return trailers;
};
