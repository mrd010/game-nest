import { htmlToSysReqArray } from './parsers';

// removes duplicate games with same steam id in data arrays received from steam api
export const getRefinedGamesArray = (gameArray) => {
  return [...new Map(gameArray.map((item) => [item.id, item])).values()];
};

// extracts system requirements of a game from its steam data. doing it via parsing html to text
export const extractGameSysReq = (gameData) => {
  let systemRequirements = {};

  if (gameData.pc_requirements && gameData.pc_requirements.minimum) {
    const sysReqArray = htmlToSysReqArray(gameData.pc_requirements.minimum);
    if (sysReqArray.length && sysReqArray[0].length) {
      systemRequirements.pcMinimum = sysReqArray;
    }
  }
  if (gameData.pc_requirements && gameData.pc_requirements.recommended) {
    const sysReqArray = htmlToSysReqArray(gameData.pc_requirements.recommended);
    if (sysReqArray.length && sysReqArray[0].length) {
      systemRequirements.pcRecommended = sysReqArray;
    }
  }
  if (gameData.mac_requirements && gameData.mac_requirements.minimum) {
    const sysReqArray = htmlToSysReqArray(gameData.mac_requirements.minimum);
    if (sysReqArray.length && sysReqArray[0].length) {
      systemRequirements.macMinimum = sysReqArray;
    }
  }
  if (gameData.linux_requirements && gameData.linux_requirements.minimum) {
    const sysReqArray = htmlToSysReqArray(gameData.linux_requirements.minimum);
    if (sysReqArray.length && sysReqArray[0].length) {
      systemRequirements.linuxMinimum = sysReqArray;
    }
  }

  return systemRequirements;
};

export const getPriorityPlatform = (platforms) => {
  return Object.entries(platforms).find((platform) => platform[1] === true)[0];
};
