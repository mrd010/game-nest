import PropTypes from 'prop-types';
const SysReq = ({ platform, title, systemReqData }) => {
  return <div>{platform}</div>;
};
SysReq.propTypes = {
  platform: PropTypes.oneOf(['windows', 'mac', 'linux']),
  title: PropTypes.oneOf(['minimum', 'recommended']),
  systemReqData: PropTypes.shape({
    pcMinimum: PropTypes.arrayOf(PropTypes.array),
    pcRecommended: PropTypes.arrayOf(PropTypes.array),
    macMinimum: PropTypes.arrayOf(PropTypes.array),
    linuxMinimum: PropTypes.arrayOf(PropTypes.array),
  }),
};
export default SysReq;
