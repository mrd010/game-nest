import { htmlToSysReqArray } from './parsers';

// removes duplicate games with same steam id in data arrays received from steam api
export const extractRefinedGamesArray = (gameArray) => {
  return [...new Map(gameArray.map((item) => [item.id, item])).values()];
};

export const extractUniqueDealsById = (games) => {
  return [
    ...new Map(games.map((game) => [game.internalName, game]))
      .values()
      .filter((uGame) => uGame.steamAppID),
  ];
};

// extracts system requirements of a game from its steam data. doing it via parsing html to text
export const extractGameSysReq = (gameData) => {
  let systemRequirements = {};

  // if not received game data yet then return
  if (gameData) {
    // each if checks for availability of game for that os and then proceeds
    if (gameData.pc_requirements && gameData.pc_requirements.minimum) {
      const sysReqArray = htmlToSysReqArray(gameData.pc_requirements.minimum);
      if (sysReqArray.length && sysReqArray[0].length) {
        systemRequirements.minimum = sysReqArray;
      }
    }
    if (gameData.pc_requirements && gameData.pc_requirements.recommended) {
      const sysReqArray = htmlToSysReqArray(gameData.pc_requirements.recommended);
      if (sysReqArray.length && sysReqArray[0].length) {
        systemRequirements.recommended = sysReqArray;
      }
    }
    if (gameData.mac_requirements && gameData.mac_requirements.minimum) {
      const sysReqArray = htmlToSysReqArray(gameData.mac_requirements.minimum);
      if (sysReqArray.length && sysReqArray[0].length) {
        systemRequirements.mac = sysReqArray;
      }
    }
    if (gameData.linux_requirements && gameData.linux_requirements.minimum) {
      const sysReqArray = htmlToSysReqArray(gameData.linux_requirements.minimum);
      if (sysReqArray.length && sysReqArray[0].length) {
        systemRequirements.linux = sysReqArray;
      }
    }
  }

  return systemRequirements;
};

export const extractGameData = (data) => {
  // if data not provided yet status='not fetched'
  // if data provided but data is not correct or doesn't belong to a an actual game status = 'no data'
  // if everything is ok status = 'has data' and then return data
  return !data
    ? { status: 'not_fetched', gameData: null }
    : !Object.values(data)[0].success ||
        !['game', 'demo'].includes(Object.values(data)[0].data.type)
      ? { status: 'no_data', gameData: null }
      : { status: 'has_data', gameData: Object.values(data)[0].data };
};

// extract min requirements for a game for its most common platform. usually windows
export const extractPriorityMinReq = (gameData) => {
  // if no data provided
  if (!gameData) {
    return null;
  }

  // get the most important platform game is played on
  const platformName = gameData.platforms.windows
    ? 'windows'
    : gameData.platforms.mac
      ? 'mac'
      : gameData.platforms.linux
        ? 'linux'
        : null;

  // get system requirements according to most common platform

  const specs = extractGameSysReq(gameData);
  if (!specs) {
    return { platform: platformName, specs: null };
  }
  switch (platformName) {
    case 'windows':
      return { platform: platformName, specs: specs.minimum ? specs.minimum : null };
    case 'mac':
      return { platform: platformName, specs: specs.mac ? specs.mac : null };
    case 'linux':
      return {
        platform: platformName,
        specs: specs.linux ? specs.linux : null,
      };

    default:
      return null;
  }
};

// get recommended games and top sellers and return a randomized array of their ids
export const extractImportantGameIds = (recommendedGames, topSellers) => {
  const recommendedIds = new Set(recommendedGames.map((game) => Number(game.steamAppID)));
  const topSellersIds = new Set(topSellers.map((game) => game.id));
  return [...recommendedIds.union(topSellersIds)];
};

// get trailers filtered by id. every just 1 video for each game not more.
export const getRefinedTrailers = (trailersData) => {
  return [...new Map(trailersData.map((trailer) => [trailer.target.id, trailer])).values()];
};
