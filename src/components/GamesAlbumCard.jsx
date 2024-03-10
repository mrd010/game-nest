import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { steamHeaderImage } from '../services/utilities';
import PubDevRow from './PubDevRow';
import { Link } from 'react-router-dom';

const GamesAlbumCard = ({ gameData }) => {
  return (
    <div className="grid grid-cols-[auto_minmax(0,2fr)] gap-5 h-min items-center hover:opacity-85 transition-opacity">
      <Link to={`/games/${gameData.appid}`} className="">
        <LazyLoadImage
          src={steamHeaderImage(gameData.appid)}
          placeholder={<div className="content-loader h-full w-full"></div>}
          className="shadow-md contrast-[110%]"
        ></LazyLoadImage>
      </Link>
      <div className="grid grid-rows-[auto_minmax(0,1fr)_auto] gap-1 py-4 h-full">
        <div>
          <h4 className="text-xl font-bold line-clamp-1 hover:text-yellow-600 underline">
            <Link to={`/games/${gameData.appid}`}>{gameData.name}</Link>
          </h4>
        </div>
        <div className="overflow-hidden">
          <p className="text-gray-600/85 line-clamp-3">{gameData.strSnippet}</p>
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
    </div>
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
