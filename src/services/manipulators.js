// removes duplicate games with same steam id in data arrays received from steam api
export const getRefinedGamesArray = (gameArray) => {
  return [...new Map(gameArray.map((item) => [item.id, item])).values()];
};
