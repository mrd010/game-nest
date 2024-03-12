import PropTypes from 'prop-types';
import Carousel from './Carousel';
import GamesCategoryCarouselCard from './GamesCategoryCarouselCard';
import { useEffect, useState } from 'react';
import { getGamesMiniData } from '../services/dataFetchers';
import { useInView } from 'react-intersection-observer';
import ContentLoader from './ContentLoader';
const GamesInGenreSection = ({ name, items }) => {
  // init data with and array of empty data
  const initialData = [...items].fill({});
  const [gamesData, setGamesData] = useState(initialData);
  console.log(gamesData);

  const { ref, inView } = useInView({ triggerOnce: true });
  // use stringified version for preventing re-renders
  const stringifiedIds = JSON.stringify(items);

  useEffect(() => {
    let ignore = false;
    const getGamesData = async () => {
      const gamesMiniData = await getGamesMiniData(stringifiedIds);
      if (gamesMiniData && !ignore) {
        setGamesData(gamesMiniData);
      }
    };

    // if element is in view fetch data
    if (inView) {
      getGamesData();
    }

    return () => (ignore = true);
  }, [stringifiedIds, inView]);

  return (
    <div ref={ref}>
      <Carousel title={name} itemWidth={400} steps={1}>
        {gamesData.map((data, index) =>
          data && data.status === 1 ? (
            <div key={data.appid} className="px-2 w-[400px] bg-transparent">
              <GamesCategoryCarouselCard
                gameData={data}
                cardWidth={400}
              ></GamesCategoryCarouselCard>
            </div>
          ) : (
            // load loader placeholder if no data received yet
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
      </Carousel>
    </div>
  );
};
GamesInGenreSection.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default GamesInGenreSection;
