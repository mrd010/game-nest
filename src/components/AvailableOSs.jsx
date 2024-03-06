import PropTypes from 'prop-types';
import AppleIcon from '../assets/icons/AppleIcon.svg';
import LinuxIcon from '../assets/icons/LinuxIcon.svg';
import WindowsIcon from '../assets/icons/WindowsIcon.svg';
import OSIcon from './OSIcon';

const AvailableOSs = ({ win, mac, linux, iconSize = 18 }) => {
  return (
    <div className="grid grid-flow-col gap-1 justify-start p-3">
      <OSIcon src={AppleIcon} isAvailable={mac} size={iconSize}></OSIcon>
      <OSIcon src={LinuxIcon} isAvailable={linux} size={iconSize}></OSIcon>
      <OSIcon src={WindowsIcon} isAvailable={win} size={iconSize}></OSIcon>
    </div>
  );
};
AvailableOSs.propTypes = {
  win: PropTypes.bool.isRequired,
  mac: PropTypes.bool.isRequired,
  linux: PropTypes.bool.isRequired,
  iconSize: PropTypes.number,
};
export default AvailableOSs;
