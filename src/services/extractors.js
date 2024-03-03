import { htmlToSysReqArray } from './parsers';

// removes duplicate games with same steam id in data arrays received from steam api
export const extractRefinedGamesArray = (gameArray) => {
  return [...new Map(gameArray.map((item) => [item.id, item])).values()];
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
  return data && Object.values(data)[0].success && Object.values(data)[0].data;
};

export const extractPriorityMinReq = (gameData) => {
  if (!gameData) {
    return null;
  }

  const platformName = gameData.platforms.windows
    ? 'windows'
    : gameData.platforms.mac
      ? 'mac'
      : gameData.platforms.linux
        ? 'linux'
        : null;

  switch (platformName) {
    case 'windows':
      return { platform: platformName, specs: extractGameSysReq(gameData).minimum };
    case 'mac':
      return { platform: platformName, specs: extractGameSysReq(gameData).mac };
    case 'linux':
      return {
        platform: platformName,
        specs: extractGameSysReq(gameData).linux,
      };

    default:
      return null;
  }
};
