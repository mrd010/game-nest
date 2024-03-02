import PropTypes from 'prop-types';
const SysReq = ({ platform, title, systemReqData }) => {
  return <div>{platform}</div>;
};
SysReq.propTypes = {
  platform: PropTypes.oneOf(['windows', 'mac', 'linux']),
  title: PropTypes.oneOf(['minimum', 'recommended']),
  systemReqData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
export default SysReq;
