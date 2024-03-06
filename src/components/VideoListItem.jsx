import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const VideoListItem = ({ thumbnail, gameName, name, onSelect }) => {
  return (
    <button className="grid grid-cols-[200px_200px] group gap-4" onClick={onSelect}>
      <div className="relative h-full">
        <LazyLoadImage
          src={thumbnail}
          alt={name}
          className="rounded-md group-hover:opacity-85 h-full object-cover"
        ></LazyLoadImage>
        <div
          className={`text-gray-50 absolute bottom-2 left-4 scale-[180%] opacity-75 group-hover:opacity-100`}
        >
          <span className="material-symbols-rounded">play_circle</span>
        </div>
      </div>
      <div className="text-left group-hover:text-yellow-600 flex flex-col gap-3 py-1">
        <h4 className="font-bold text-lg leading-5">{gameName}</h4>
        {name.length >= 10 && <p className="break-words text-sm leading-5 line-clamp-3">{name}</p>}
      </div>
    </button>
  );
};
VideoListItem.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  gameName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default VideoListItem;
