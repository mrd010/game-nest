import { secondsToMinutes } from 'date-fns';
import scoreColors from '../data/scoreColors.json';

// functions to get an image title from steam according to game steam id

// medium image
export const steamHeaderImage = (steamId) => {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/header.jpg`;
};
// large image
export const steamLargerImage = (steamId) => {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/capsule_616x353.jpg`;
};
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

// converts any space separated string to kebab-case format
export const toKebabCase = (str) => {
  return str.toLowerCase().split(' ').join('-');
};

// converts any word to capitalized format
export const capitalizeWord = (str) => {
  return str.charAt(0).toUpperCase().concat(str.slice(1));
};

// converts any space separated string to capitalized format
export const capitalizeMultiWords = (str) => {
  return str
    .split(' ')
    .map((word) => capitalizeWord(word))
    .join(' ');
};

// shuffles an array of numbers
export const shuffled = (array) => {
  const shuffledArray = [...array];
  shuffledArray.sort(() => Math.random() - 0.5);
  return shuffledArray;
};

export const getCleanUrl = (url) => {
  return url.split('?')[0];
};

export const secondsToMinutesPlus = (seconds) => {
  const minutes = secondsToMinutes(Math.floor(seconds));
  const remainedSeconds = Math.floor(seconds) % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${remainedSeconds < 10 ? '0' : ''}${remainedSeconds}`;
};
