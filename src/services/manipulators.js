export const getRefinedGamesArray = (gameArray) => {
  return [...new Map(gameArray.map((item) => [item.id, item])).values()];
};
