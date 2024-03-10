import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getGamesMiniData } from '../services/dataFetchers';
import GamesAlbumCard from './GamesAlbumCard';
const GamesAlbumList = ({ gamesListIds, isActive }) => {
  const [gamesData, setGamesData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // use stringified version for preventing re-renders
  const stringifiedIds = JSON.stringify(gamesListIds);
  console.log(gamesData);
  useEffect(() => {
    if (stringifiedIds) {
      setLoaded(false);
    }
  }, [stringifiedIds]);

  // fetch all games in this album and save them for not fetching in Future
  useEffect(() => {
    let ignore = false;
    const getGamesData = async () => {
      const gamesMiniData = await getGamesMiniData(stringifiedIds);
      if (gamesMiniData && !ignore) {
        setGamesData(gamesMiniData);
        setLoaded(true);
      }
    };

    // if got data before don't fetch. use that instead
    if (!loaded && isActive) {
      getGamesData();
    }

    return () => (ignore = true);
  }, [stringifiedIds, loaded, isActive]);
  return (
    <>
      {isActive && (
        <div>
          {gamesData.map(
            (data) =>
              data.status === 1 && (
                <GamesAlbumCard key={data.appid} gameData={data}></GamesAlbumCard>
              )
          )}
        </div>
      )}
    </>
  );
};
GamesAlbumList.propTypes = {
  gamesListIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  isActive: PropTypes.bool.isRequired,
};
export default GamesAlbumList;
