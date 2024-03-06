import PropTypes from 'prop-types';
import AppleIcon from '../assets/icons/AppleIcon.svg';
import LinuxIcon from '../assets/icons/LinuxIcon.svg';
import WindowsIcon from '../assets/icons/WindowsIcon.svg';
import OSIcon from './OSIcon';
import thumbPlaceholder from '../assets/img/placeholder_sm.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { steamThumbnail } from '../services/utilities';
const GamesListRow = (props) => {
  // game row button in featured categories section of home page. displays game info in preview section
  return (
    <button
      onClick={() => props.onSelect(props.id)}
      className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4  drop-shadow-sm border-gray-950/50 hover:bg-amber-50 overflow-hidden ${props.isSelected ? 'bg-gradient-to-tr from-yellow-400 to-yellow-200' : ''}`}
    >
      <LazyLoadImage
        src={steamThumbnail(props.id)}
        alt={props.name}
        placeholderSrc={thumbPlaceholder}
        width={184}
        height={69}
      ></LazyLoadImage>
      <span
        className={`p-1 line-clamp-1 text-left  transition-transform ${props.isSelected ? 'translate-x-4 font-bold' : ''}`}
      >
        {props.name}
      </span>
      <div className="grid grid-flow-col gap-1 justify-start p-3">
        <OSIcon src={AppleIcon} isAvailable={props.mac_available}></OSIcon>
        <OSIcon src={LinuxIcon} isAvailable={props.linux_available}></OSIcon>
        <OSIcon src={WindowsIcon} isAvailable={props.windows_available}></OSIcon>
      </div>
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
