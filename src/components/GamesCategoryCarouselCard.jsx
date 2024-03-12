import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { steamHeaderImage } from '../services/utilities';
import PubDevRow from './PubDevRow';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const GamesCategoryCarouselCard = ({ gameData, cardWidth }) => {
  // used for animations. animations only work when image loads
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Link
      to={`/games/${gameData.appid}`}
      className="group grid grid-rows-[auto_minmax(0,1fr)] pb-4 shadow-md rounded-md overflow-hidden bg-gray-50 transition-transform relative"
      style={{ width: `${cardWidth}px` }}
    >
      {
        // a fancy style container . no use
        imageLoaded && (
          <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-t from-yellow-300 to-amber-500 transition-transform duration-300 opacity-95 scale-y-0 origin-top group-hover:scale-y-100"></div>
        )
      }
      {/* card picture */}
      <div className="group-hover:scale-90 scale-100 transition-transform">
        <LazyLoadImage
          src={steamHeaderImage(gameData.appid)}
          placeholder={<div className="content-loader h-full w-full"></div>}
          onLoad={() => setImageLoaded(true)}
          className="rounded-t-md group-hover:rounded-md group-hover:shadow"
        ></LazyLoadImage>
      </div>
      {/* card details */}
      <div className="grid grid-rows-[auto_auto_auto_minmax(0,1fr)] items-start h-full divide-y-2 z-10">
        {/* game name and description */}
        <div className="py-6 mx-4">
          <h4 className="text-2xl uppercase font-bold line-clamp-1">{gameData.name}</h4>
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
            <PubDevRow.Title>Publisher</PubDevRow.Title>
            {gameData.rgPublishers && (
              <PubDevRow.Values
                values={gameData.rgPublishers.map((pub) => pub.name)}
              ></PubDevRow.Values>
            )}
          </PubDevRow>
        </div>
        {/* game developers */}
        <div className="py-1 mx-4">
          <PubDevRow>
            <PubDevRow.Title>Developers</PubDevRow.Title>
            {gameData.rgDevelopers && (
              <PubDevRow.Values
                values={gameData.rgDevelopers.map((pub) => pub.name)}
              ></PubDevRow.Values>
            )}
          </PubDevRow>
        </div>
        <div className="p-4 h-full">
          <PubDevRow.Value>{gameData.strSnippet}</PubDevRow.Value>
        </div>
      </div>
    </Link>
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
  cardWidth: PropTypes.number.isRequired,
};
export default GamesCategoryCarouselCard;
