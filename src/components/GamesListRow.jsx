import PropTypes from 'prop-types';
import thumbPlaceholder from '../assets/img/placeholder_sm.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { steamThumbnail } from '../services/utilities';
import AvailableOSs from './AvailableOSs';
const GamesListRow = (props) => {
  // game row button in featured categories section of home page. displays game info in preview section
  return (
    <button
      onClick={() => props.onSelect(props.id)}
      className={`grid grid-cols-[auto_minmax(0,1fr)_auto] sm:grid-cols-[auto_minmax(0,1fr)] sm:grid-rows-[auto_auto] items-center gap-x-4 drop-shadow-sm border-gray-950/50 hover:bg-amber-50 overflow-hidden ${props.isSelected ? 'bg-gradient-to-tr from-yellow-400 to-yellow-200' : ''}`}
    >
      <LazyLoadImage
        src={steamThumbnail(props.id)}
        alt={props.name}
        placeholderSrc={thumbPlaceholder}
        width={184}
        height={69}
        wrapperProps={{ className: 'sm:block sm:row-span-2' }}
      ></LazyLoadImage>
      <span className={`p-1 line-clamp-1 text-left  ${props.isSelected ? 'font-bold' : ''}`}>
        {props.name}
      </span>
      <AvailableOSs
        mac={props.mac_available}
        linux={props.linux_available}
        win={props.windows_available}
      ></AvailableOSs>
    </button>
  );
};
GamesListRow.propTypes = {
  header_image: PropTypes.string,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  small_capsule_image: PropTypes.string.isRequired,
  linux_available: PropTypes.bool,
  mac_available: PropTypes.bool,
  windows_available: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
export default GamesListRow;
