import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { steamHeaderImage } from '../services/utilities';
import PubDevRow from './PubDevRow';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const GamesAlbumCard = ({ gameData }) => {
  // used for animations. animations only work when image loads
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Link
      to={`/games/${gameData.appid}`}
      className="group grid grid-cols-[auto_minmax(0,2fr)] gap-2 h-min items-center transition-opacity drop-shadow-md hover:drop-shadow-xl rounded-lg bg-slate-50 overflow-hidden min-h-[215px]"
    >
      {
        // a fancy style container . no use
        imageLoaded && (
          <div className="absolute left-0 -top-12 w-full h-[420px] bg-gradient-to-t from-amber-500 to-yellow-300 -z-50 transition-transform duration-300 rotate-[62deg] -translate-x-[400px] group-hover:-translate-x-10"></div>
        )
      }
      <div className="">
        <LazyLoadImage
          src={steamHeaderImage(gameData.appid)}
          placeholder={<div className="content-loader h-full w-full"></div>}
          className={`shadow-md contrast-[110%] rounded-l-lg transition-transform duration-300 ${imageLoaded ? 'group-hover:scale-90 group-hover:rounded-lg' : ''}`}
          onLoad={() => setImageLoaded(true)}
        ></LazyLoadImage>
      </div>
      <div className="grid grid-rows-[auto_minmax(0,1fr)_auto] gap-1 p-4 h-full drop-shadow-md">
        <div>
          <h4 className="text-xl font-bold line-clamp-1">{gameData.name}</h4>
        </div>
        <div className="overflow-hidden">
          <p className="text-gray-700/85 line-clamp-3">{gameData.strSnippet}</p>
        </div>
        <div className="grid grid-cols-2">
          <PubDevRow>
            <PubDevRow.Title>Publisher</PubDevRow.Title>
            <PubDevRow.Value>{gameData.rgPublishers[0].name}</PubDevRow.Value>
          </PubDevRow>
          <PubDevRow>
            <PubDevRow.Title>Developers</PubDevRow.Title>
            <PubDevRow.Value>{gameData.rgDevelopers[0].name}</PubDevRow.Value>
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
  }).isRequired,
};
export default GamesAlbumCard;
