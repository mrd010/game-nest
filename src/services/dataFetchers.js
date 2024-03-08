import { extractUniqueDealsById } from './extractors';

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

// get best deals unique by id
export const getBestDeals = async (minScore, count) => {
  const deals = await getData(`${dealsApi}?AAA=1&metacritic=${minScore}&pageSize=20`);
  return extractUniqueDealsById(deals).slice(0, count);
};
