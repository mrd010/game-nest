import PropTypes from 'prop-types';
import playIcon from '../assets/icons/player-icons/play_circle_FILL.svg';

const VideoListItem = ({
  id,
  thumbnail,
  gameName,
  name,
  iconCentered = false,
  onSelect,
  className = '',
}) => {
  return (
    <button className={`group ${className}`} onClick={() => onSelect(id, name)}>
      {/* thumbnail */}
      <div className="relative aspect-video shadow-sm">
        <img
          src={thumbnail}
          alt={name}
          className="rounded-md group-hover:opacity-90 h-full w-full contrast-[110%]"
        ></img>
        {!iconCentered && (
          <div
            className={`text-gray-50 absolute bottom-2 left-4 scale-[180%] xl:scale-[200%]  opacity-90 group-hover:opacity-100`}
          >
            <span className="material-symbols-rounded">play_circle</span>
          </div>
        )}
        {iconCentered && (
          <div className="absolute top-0 left-0 w-full h-full grid opacity-90 place-items-center group-hover:scale-125 transition-transform">
            <img className="w-16 icon-white" src={playIcon} />
          </div>
        )}
      </div>
      {/* details */}
      <div className="group-hover:text-yellow-600 flex flex-col gap-3 py-1 xl:gap-1 xl:items-start">
        {gameName && (
          <h4 className="font-bold text-lg leading-5 xl:leading-normal xl:line-clamp-1 text-left">
            {gameName.replaceAll('_', ' ')}
          </h4>
        )}
        {name.length >= 10 && (
          <p className="text-left text-sm leading-5 xl:leading-normal line-clamp-3 opacity-75 xl:line-clamp-2">
            {name.replaceAll('_', ' ')}
          </p>
        )}
      </div>
    </button>
  );
};
VideoListItem.propTypes = {
  id: PropTypes.number,
  thumbnail: PropTypes.string.isRequired,
  gameName: PropTypes.string,
  name: PropTypes.string.isRequired,
  iconCentered: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
};
export default VideoListItem;
