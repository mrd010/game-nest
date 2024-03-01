import PropTypes from 'prop-types';
import AppleIcon from '../assets/icons/AppleIcon.svg';
import LinuxIcon from '../assets/icons/LinuxIcon.svg';
import WindowsIcon from '../assets/icons/WindowsIcon.svg';
import OSIcon from './OSIcon';
const GamesListRow = (props) => {
  console.log(props);
  return (
    <button className="grid grid-cols-[auto_1fr] gap-4 bg-gray-200 shadow-sm drop-shadow-sm p-2 rounded-md hover:ring-2 ring-yellow-500">
      <div>
        <img src={props.small_capsule_image} alt={props.name} className="rounded-md" />
      </div>
      <div className="grid grid-rows-[1fr_auto] text-left h-full">
        <span className="text-[15px] self-start line-clamp-2 pr-1">{props.name}</span>
        <div className="grid grid-flow-col self-end gap-1 justify-start items-end">
          <OSIcon src={AppleIcon}></OSIcon>
          <OSIcon src={LinuxIcon}></OSIcon>
          <OSIcon src={WindowsIcon}></OSIcon>
        </div>
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
};
export default GamesListRow;
