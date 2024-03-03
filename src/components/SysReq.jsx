import PropTypes from 'prop-types';
const SysReq = ({ platform, title, systemReqData }) => {
  return (
    <div>
      <h4>
        {platform === 'windows' ? '' : platform} {title}
      </h4>
      <ul>
        {systemReqData.map((reqData, index) => (
          <li key={index}>
            <span>{reqData[0]}</span>
            <span>{reqData[1]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

SysReq.propTypes = {
  platform: PropTypes.oneOf(['windows', 'mac', 'linux']),
  title: PropTypes.oneOf(['minimum', 'recommended']),
  systemReqData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
export default SysReq;
