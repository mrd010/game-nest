import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getGamesMiniData } from '../services/dataFetchers';
import GamesAlbumCard from './GamesAlbumCard';
import ContentLoader from './ContentLoader';
import { useInView } from 'react-intersection-observer';
import { useOutletContext } from 'react-router-dom';
const GamesAlbumList = ({ gamesListIds, isActive }) => {
  const [gamesData, setGamesData] = useState(new Array(gamesListIds.length).fill(null));
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  const { isMobile } = useOutletContext();

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
    if (!loaded && isActive && inView) {
      getGamesData();
    }

    return () => (ignore = true);
  }, [stringifiedIds, loaded, isActive, inView]);
  return (
    <>
      {isActive && (
        <div ref={ref} className="flex flex-col flex-nowrap gap-5 my-4">
          {gamesData.map((data, index) =>
            data && data.status === 1 ? (
              <GamesAlbumCard key={data.appid} gameData={data}></GamesAlbumCard>
            ) : (
              // load loader placeholder if no data received yet
              <div
                key={index}
                className="grid grid-cols-2 gap-4 sm:gap-0 h-[215px] sm:h-[400px] sm:grid-rows-2 sm:grid-cols-1"
              >
                <div>
                  <ContentLoader size="100%"></ContentLoader>
                </div>
                <div className="grid grid-rows-[auto_1fr_auto] gap-2 py-4 sm:grid-flow-row sm:grid-rows-none sm:gap-1">
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
