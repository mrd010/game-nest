import scoreColors from '../data/scoreColors.json';

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

export const toKebabCase = (str) => {
  return str.toLowerCase().split(' ').join('-');
};

export const capitalizeWord = (str) => {
  return str.charAt(0).toUpperCase().concat(str.slice(1));
};

export const capitalizeMultiWords = (str) => {
  return str
    .split(' ')
    .map((word) => capitalizeWord(word))
    .join(' ');
};
