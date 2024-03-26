import { getGameDetails } from '../services/dataFetchers';

export const gamePageLoader = async ({ params }) => {
  if (!/^\d+$/.test(params.gameId)) {
    return null;
  }
  const gameDetails = await getGameDetails(params.gameId);
  if (!gameDetails) {
    throw new Error('Not Found');
  }
  return gameDetails;
};
