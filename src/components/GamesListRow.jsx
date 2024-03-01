import PropTypes from 'prop-types';
import AppleIcon from '../assets/icons/AppleIcon.svg';
import LinuxIcon from '../assets/icons/LinuxIcon.svg';
import WindowsIcon from '../assets/icons/WindowsIcon.svg';
import OSIcon from './OSIcon';
const GamesListRow = (props) => {
  return (
    <button className="grid h-14 grid-cols-[auto_1fr_auto] content-center items-center gap-4 bg-gray-200 shadow-sm drop-shadow-sm rounded-md hover:ring-2 ring-yellow-500 overflow-hidden">
      <div className="">
        <img src={props.small_capsule_image} alt={props.name} className="" />
      </div>
      <span className="text-[15px] line-clamp-1 text-left">{props.name}</span>
      <div className="grid grid-flow-col gap-1 justify-start p-3">
        <OSIcon src={AppleIcon}></OSIcon>
        <OSIcon src={LinuxIcon}></OSIcon>
        <OSIcon src={WindowsIcon}></OSIcon>
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
