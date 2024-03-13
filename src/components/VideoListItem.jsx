import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import playIcon from '../assets/icons/player-icons/play_circle_FILL.svg';

const VideoListItem = ({
  thumbnail,
  gameName,
  name,
  iconCentered = false,
  onSelect,
  className = '',
}) => {
  return (
    <button className={`group ${className}`} onClick={onSelect}>
      <div className="relative aspect-video shadow-sm">
        <LazyLoadImage
          src={thumbnail}
          alt={name}
          className="rounded-md group-hover:opacity-90 h-full w-full contrast-[110%]"
        ></LazyLoadImage>
        {!iconCentered && (
          <div
            className={`text-gray-50 absolute bottom-2 left-4 scale-[180%] opacity-75 group-hover:opacity-100`}
          >
            <span className="material-symbols-rounded">play_circle</span>
          </div>
        )}
        {iconCentered && (
          <div className="absolute top-0 left-0 w-full h-full grid opacity-85 place-items-center group-hover:scale-125 transition-transform">
            <img className="w-16 icon-white" src={playIcon} />
          </div>
        )}
      </div>
      <div className="text-left group-hover:text-yellow-600 flex flex-col gap-3 py-1">
        <h4 className="font-bold text-lg leading-5">{gameName}</h4>
        {name.length >= 10 && !name.includes('_') && (
          <p className="break-words text-sm leading-5 line-clamp-3 text-gray-700/70">{name}</p>
        )}
      </div>
    </button>
  );
};
VideoListItem.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  gameName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  iconCentered: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
};
export default VideoListItem;
