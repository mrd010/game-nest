import { extractUniqueDealsById } from './extractors';

const dealsApi = `https://www.cheapshark.com/api/1.0/deals`;
const featuredCategoriesApi = '/api/featuredcategories';
const trailersApi = `/api/trailerslideshow`;
const genreListApi = '/api/getgenrelist';
const newReleasesApi = '/api/getappsincategory/?category=cat_newreleases';
const genreGamesApi = '/api/getappsingenre';
const gameMiniDataAPi = '/api/libraryappdetails';
const gameDetailsApi = '/api/appdetails';
const searchApi = '/actions/SearchApps/';

// checks if response is ok and throws error on 400> status
export const checkResponse = (response) => {
  if (!response.ok && response.status >= 400) {
    throw new Error(response.statusText);
  }
};

// fetches json data with any api url
const getData = async (url) => {
  console.log(url);
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
  const recommendedGames = extractUniqueDealsById(games);
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
  return trailersData;
};

// gets an stringified array of ids and fetches news related to them
export const getNews = async (stringifiedGameIds) => {
  const gameIds = JSON.parse(stringifiedGameIds);
  const allNewsPromises = gameIds.map((gameId) =>
    getData(`/ISteamNews/GetNewsForApp/v0002/?appid=${gameId}&count=1&format=json`)
  );

  // fetch all and only return ok responses and valid and unique data
  return await Promise.allSettled(allNewsPromises)
    .then((results) => {
      const fulfilled = results
        .filter((result) => result.status === 'fulfilled' && result.value.appnews.newsitems.length)
        .map((fulfilledResult) => fulfilledResult.value.appnews);
      // return fulfilled result filtered buy appid in newsitems[0]
      return [...new Map(fulfilled.map((ff) => [ff.newsitems[0].appid, ff.newsitems[0]])).values()];
    })
    .catch((e) => {
      throw e;
    });
};

// get genre list of games
export const getGenresList = async (language) => {
  const genresData = await getData(`${genreListApi}${language ? `/?l=${language}` : ''}`);
  if (genresData && genresData.status === 1) {
    return genresData.genres;
  }
  return null;
};

// get new releases for games page
export const getNewReleases = async (language) => {
  const newReleasedGames = await getData(`${newReleasesApi}${language ? `&?l=${language}` : ''}`);
  if (newReleasedGames && newReleasedGames.status === 1) {
    return newReleasedGames.tabs;
  }
  return null;
};

// get games for selected genre
export const getGamesInGenre = async (genre, language) => {
  // if not provided genre name
  if (!genre) {
    return null;
  }

  const gamesInGenre = await getData(
    `${genreGamesApi}/?genre=${genre}${language ? `&l=${language}` : ''}`
  );
  if (gamesInGenre && gamesInGenre.status === 1) {
    return { id: gamesInGenre.id, name: gamesInGenre.name, data: gamesInGenre.tabs };
  }

  return null;
};

// get an array of game ids and fetch their mini info
export const getGamesMiniData = async (stringifiedIds) => {
  const gamesIds = JSON.parse(stringifiedIds);
  const gamesDataPromises = gamesIds.map((id) => getData(`${gameMiniDataAPi}/?appid=${id}`));

  // return only those fulfilled and successfully fetched
  const gamesData = await Promise.allSettled(gamesDataPromises).then((results) =>
    results
      .filter((result) => result.status === 'fulfilled' && result.value.status === 1)
      .map((result) => result.value)
  );

  return gamesData;
};

// get game details full
export const getGameDetails = async (gameId) => {
  const response = await getData(`${gameDetailsApi}?appids=${gameId}`);

  // if response got and response is for this game proceed and return game data
  const gameData = response && response[gameId];
  return gameData?.success && gameData?.data;
};

// get game search results
export const getSearchResults = async (query, minQueryLengthThreshold) => {
  if (!query || query.length < minQueryLengthThreshold) {
    return null;
  }

  const data = await getData(`${searchApi}${query}`);
  if (data && data.length > 0) {
    return data;
  }
  return null;
};
