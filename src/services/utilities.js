import scoreColors from '../data/scoreColors.json';
import { htmlToSysReqArray } from './parsers';

// functions to get an image title from steam according to game steam id

// medium image
export const steamHeaderImage = (steamId) => {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/header.jpg`;
};
// large image
// export const steamLargeCapsuleImage = (steamId) => {
//   return `https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/header.jpg`;
// };
// small image
export const steamThumbnail = (steamId) => {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/capsule_184x69.jpg`;
};

// get color of score presenter according to how bad is score
export const getMetascoreColor = (score) => {
  if (typeof score !== 'number') {
    return scoreColors.na;
  }
  return score >= 90
    ? scoreColors.excellent
    : score >= 80
      ? scoreColors.good
      : score >= 55
        ? scoreColors.ok
        : score >= 40
          ? scoreColors.bad
          : scoreColors.trash;
};

export const extractGameSysReq = (gameData) => {
  let systemRequirements = {};
  if (gameData) {
    if (gameData.pc_requirements && gameData.pc_requirements.minimum) {
      const sysReqArray = htmlToSysReqArray(gameData.pc_requirements.minimum);
      if (sysReqArray.length) {
        systemRequirements.pcMinimum = sysReqArray;
      }
    }
    if (gameData.pc_requirements && gameData.pc_requirements.recommended) {
      const sysReqArray = htmlToSysReqArray(gameData.pc_requirements.recommended);
      if (sysReqArray.length) {
        systemRequirements.pcRecommended = sysReqArray;
      }
    }
    if (gameData.mac_requirements && gameData.mac_requirements.minimum) {
      const sysReqArray = htmlToSysReqArray(gameData.mac_requirements.minimum);
      if (sysReqArray.length) {
        systemRequirements.macMinimum = sysReqArray;
      }
    }
    if (gameData.linux_requirements && gameData.linux_requirements.minimum) {
      const sysReqArray = htmlToSysReqArray(gameData.linux_requirements.minimum);
      if (sysReqArray.length) {
        systemRequirements.linuxMinimum = sysReqArray;
      }
    }
  }
  return systemRequirements;
};
