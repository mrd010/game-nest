const dealsApi = `https://www.cheapshark.com/api/1.0/deals`;
const featuredCategoriesApi = 'https://store.steampowered.com/api/featuredcategories';
const trailersApi = `https://store.steampowered.com/api/trailerslideshow`;

// checks if response is ok and throws error on 400> status
export const checkResponse = (response) => {
  if (!response.ok && response.status >= 400) {
    throw new Error(response.statusText);
  }
};

// fetches json data with any api url
const getData = async (url) => {
  const response = await fetch(url, { method: 'GET', mode: 'cors' });
  checkResponse(response);
  const resJSON = await response.json();
  return resJSON;
};

// get recommended games with at least [minScore] meta score
export const getRecommendedGames = async (count, minScore) => {
  const games = await getData(`${dealsApi}?AAA=1&sortBy=Release&metacritic=${minScore}`);

  const uniqueGamesArray = new Map(games.map((game) => [game.internalName, game]));
  const recommendedGames = uniqueGamesArray
    .values()
    .slice(0, Math.min(count, uniqueGamesArray.length));
  console.log(recommendedGames);
};
