import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { steamHeaderImage } from '../services/utilities';
import PubDevRow from './PubDevRow';
import { Link, useOutletContext } from 'react-router-dom';
import placeholder from '../assets/img/placeH.png';
import { useInView } from 'react-intersection-observer';

const GamesCategoryCarouselCard = ({ gameData }) => {
  // used for animations. animations only work when image loads
  const { isHandheldDevice } = useOutletContext();
  const { ref, inView } = useInView({ threshold: 1 });

  return (
    <div
      ref={ref}
      className="group grid grid-rows-[auto_minmax(0,1fr)] size-full pt-2 pb-4 shadow-md rounded-md overflow-hidden bg-gray-50 transition-transform relative"
    >
      {
        // a fancy style container . no use
        <div
          className={`absolute left-0 top-0 w-full h-full bg-gradient-to-t from-yellow-300 to-amber-400 transition-transform duration-300 md:duration-500 md:delay-100 opacity-95 origin-top ${!isHandheldDevice ? 'scale-y-[20%] group-hover:scale-y-100' : inView ? 'scale-y-100' : 'scale-y-[20%]'}`}
        ></div>
      }
      {/* card picture */}
      <Link to={`/games/${gameData.appid}`} className={`scale-90`}>
        <LazyLoadImage
          src={steamHeaderImage(gameData.appid)}
          placeholder={<img className="rounded-xl shadow" src={placeholder}></img>}
          width={460}
          height={215}
          className="rounded-xl shadow"
        ></LazyLoadImage>
      </Link>
      {/* card details */}
      <div className="grid grid-rows-[auto_auto_auto_minmax(0,1fr)] items-start h-full divide-y-2 lg:divide-none z-10">
        {/* game name and release date */}
        <div className="pt-6 lg:py-1 pb-2 mx-4 flex flex-col flex-nowrap h-36 lg:h-28 sm:h-24 xs:h-20">
          {/* name */}
          <Link to={`/games/${gameData.appid}`} className="mb-auto">
            <h4
              className={`text-2xl lg:text-xl sm:text-lg xs:text-base uppercase font-bold line-clamp-2 transition-all md:delay-150 duration-300 hover:text-gray-50 ${inView ? 'translate-y-2' : ''} `}
            >
              {gameData.name}
            </h4>
          </Link>
          {/* game release date */}
          <div className="space-x-2">
            <PubDevRow.Title>Release Date</PubDevRow.Title>
            <PubDevRow.Value>
              {(
                (gameData.releasedata && gameData.releasedata.strSteamReleaseDate) ??
                'n/a'
              ).toUpperCase()}
            </PubDevRow.Value>
          </div>
        </div>

        {/* game publishers */}
        <div className="py-1 mx-4">
          <PubDevRow>
            <PubDevRow.Title>
              Publisher{gameData.rgPublishers && gameData.rgPublishers.length > 1 && 's'}
            </PubDevRow.Title>
            {gameData.rgPublishers && (
              <PubDevRow.Values
                values={gameData.rgPublishers.slice(0, 3).map((pub) => pub.name)}
              ></PubDevRow.Values>
            )}
          </PubDevRow>
        </div>
        {/* game developers */}
        <div className="py-1 mx-4">
          <PubDevRow>
            <PubDevRow.Title>
              Developer{gameData.rgDevelopers && gameData.rgDevelopers.length > 1 && 's'}
            </PubDevRow.Title>
            {gameData.rgDevelopers && (
              <PubDevRow.Values
                values={gameData.rgDevelopers.slice(0, 3).map((pub) => pub.name)}
              ></PubDevRow.Values>
            )}
          </PubDevRow>
        </div>
        {gameData.strSnippet && (
          <div className="mx-4 py-4 h-full grow">
            <p className="line-clamp-4 text-sm text-gray-700/85 xs:text-xs">
              {gameData.strSnippet}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
GamesCategoryCarouselCard.propTypes = {
  gameData: PropTypes.shape({
    appid: PropTypes.string,
    name: PropTypes.string,
    strSnippet: PropTypes.string,
    rgDevelopers: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
    rgPublishers: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
    releasedata: PropTypes.shape({ strSteamReleaseDate: PropTypes.string }),
  }),
};
export default GamesCategoryCarouselCard;
