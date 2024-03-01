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
