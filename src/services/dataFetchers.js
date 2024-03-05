const dealsApi = `https://www.cheapshark.com/api/1.0/deals`;
const featuredCategoriesApi = '/api/featuredcategories';
const trailersApi = `/api/trailerslideshow`;

// checks if response is ok and throws error on 400> status
export const checkResponse = (response) => {
  if (!response.ok && response.status >= 400) {
    throw new Error(response.statusText);
  }
};

// fetches json data with any api url
const getData = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  });
  checkResponse(response);
  const resJSON = await response.json();
  return resJSON;
};

// get recommended games with at least [minScore] meta score
export const getRecommendedGames = async (minScore) => {
  const games = await getData(`${dealsApi}?AAA=1&sortBy=Release&metacritic=${minScore}`);

  //   extract unique (non repetitive) games
  const recommendedGames = [
    ...new Map(games.map((game) => [game.internalName, game]))
      .values()
      .filter((uGame) => uGame.steamAppID),
  ];
  return recommendedGames;
};

// get games listed in special categories like:new releases, top sellers. coming soon
export const getFeaturedCategories = async (lang) => {
  const featuredCategories = await getData(`${featuredCategoriesApi}/?l=${lang}`);
  return featuredCategories;
};

// get the most recent trailers and video games released
export const getTrailers = async (lang) => {
  const trailersData = await getData(`${trailersApi}/?l=${lang}`);
  return trailersData.movies;
};

// gets an stringified array of ids and fetches news related to them
export const getNews = async (stringifiedGameIds) => {
  const gameIds = JSON.parse(stringifiedGameIds);
  const allNewsPromises = gameIds.map((gameId) =>
    getData(`/ISteamNews/GetNewsForApp/v0002/?appid=${gameId}&count=1&format=json`)
  );

  // fetch all and only return ok responses and valid data
  return await Promise.allSettled(allNewsPromises).then((results) =>
    results
      .filter((result) => result.status === 'fulfilled')
      .map((fulfilledResult) => fulfilledResult.value.appnews)
  );
};
