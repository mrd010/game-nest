import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getGamesMiniData } from '../services/dataFetchers';
import GamesAlbumCard from './GamesAlbumCard';
import ContentLoader from './ContentLoader';
const GamesAlbumList = ({ gamesListIds, isActive }) => {
  const [gamesData, setGamesData] = useState(new Array(gamesListIds.length).fill(null));
  const [loaded, setLoaded] = useState(false);

  // use stringified version for preventing re-renders
  const stringifiedIds = JSON.stringify(gamesListIds);

  // if ids changed set loaded false and fetch again
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
        <div className="flex flex-col flex-nowrap gap-5 my-4">
          {gamesData.map((data, index) =>
            data && data.status === 1 ? (
              <GamesAlbumCard key={data.appid} gameData={data}></GamesAlbumCard>
            ) : (
              <div key={index} className="grid grid-cols-2 gap-4 h-[215px]">
                <div>
                  <ContentLoader size="100%"></ContentLoader>
                </div>
                <div className="grid grid-rows-[auto_1fr_auto] gap-2 py-4">
                  <ContentLoader size="30px"></ContentLoader>
                  <ContentLoader size="70px"></ContentLoader>
                  <ContentLoader size="35px"></ContentLoader>
                </div>
              </div>
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
