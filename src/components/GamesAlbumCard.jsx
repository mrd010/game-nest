import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { steamHeaderImage } from '../services/utilities';
import PubDevRow from './PubDevRow';
import { Link, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const GamesAlbumCard = ({ gameData }) => {
  // used for animations. animations only work when image loads
  const [imageLoaded, setImageLoaded] = useState(false);

  const { isHandheldDevice } = useOutletContext();
  const { ref, inView } = useInView({ threshold: 1 });

  return (
    <Link
      to={`/games/${gameData.appid}`}
      ref={ref}
      className={`group grid grid-cols-[auto_minmax(0,2fr)] sm:grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-0 h-min sm:h-auto items-center sm:items-stretch  drop-shadow-md transition-colors duration-300 ${isHandheldDevice ? (inView ? 'bg-yellow-400' : 'lg:bg-gray-100') : 'hover:drop-shadow-xl'} rounded-lg bg-slate-50  overflow-hidden min-h-[215px] md:min-h-full`}
    >
      {
        // a fancy style container . no use
        imageLoaded && !isHandheldDevice && (
          <div
            className={`absolute left-0 -top-12 w-full h-[420px] bg-gradient-to-t from-amber-500 to-yellow-300 -z-50 transition-transform duration-300 rotate-[62deg] md:rotate-[80deg] -translate-x-[400px]  $group-hover:-translate-x-10`}
          ></div>
        )
      }
      <div className="xl:h-full">
        {/* game image */}
        <LazyLoadImage
          src={steamHeaderImage(gameData.appid)}
          placeholder={<div className="content-loader h-full w-full"></div>}
          className={`shadow-md contrast-[110%] xl:h-full xl:object-cover rounded-l-lg transition-transform sm:w-full sm:origin-bottom duration-300 ${imageLoaded && !isHandheldDevice ? 'group-hover:scale-90 group-hover:rounded-lg' : isHandheldDevice && inView ? 'rounded-lg scale-90 sm:scale-95' : ''}`}
          onLoad={() => setImageLoaded(true)}
        ></LazyLoadImage>
      </div>
      {/* game details */}
      <div className="grid grid-rows-[auto_minmax(0,1fr)_auto] gap-1 p-4 sm:px-8 h-full xs:px-4 drop-shadow-md sm:gap-3">
        <div>
          <h4 className="text-xl font-bold line-clamp-1 md:text-2xl">{gameData.name}</h4>
        </div>
        <div className="overflow-hidden">
          <p className="text-gray-800/85 line-clamp-3 text-pretty md:line-clamp-4 xs:line-clamp-5 xs:text-sm">
            {gameData.strSnippet}
          </p>
        </div>
        <div className="grid grid-cols-2 md:pb-2">
          <PubDevRow>
            <PubDevRow.Title>Publisher</PubDevRow.Title>
            <PubDevRow.Value>
              {gameData.rgPublishers[0].name ? gameData.rgPublishers[0].name : '-'}
            </PubDevRow.Value>
          </PubDevRow>
          <PubDevRow>
            <PubDevRow.Title>Developers</PubDevRow.Title>
            <PubDevRow.Value>
              {gameData.rgDevelopers[0].name ? gameData.rgDevelopers[0].name : '-'}
            </PubDevRow.Value>
          </PubDevRow>
        </div>
      </div>
    </Link>
  );
};
GamesAlbumCard.propTypes = {
  gameData: PropTypes.shape({
    appid: PropTypes.string,
    name: PropTypes.string,
    strSnippet: PropTypes.string,
    rgDevelopers: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
    rgPublishers: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  }),
};
export default GamesAlbumCard;
