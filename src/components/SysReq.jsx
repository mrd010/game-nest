import PropTypes from 'prop-types';
import { capitalizeWord } from '../services/utilities';
const SysReq = ({ platform, title, systemReqData }) => {
  return (
    <div className="grid gap-2 bg-gray-200 rounded-md p-2">
      <h4 className="text-base font-bold justify-self-start bg-gray-900 rounded-md text-gray-50 px-1">
        {platform === 'windows' ? capitalizeWord(title) : capitalizeWord(platform)}
      </h4>
      <ul className="grid grid-cols-3 gap-1">
        {systemReqData.map((reqData, index) => (
          <li
            key={index}
            className={`flex flex-col border-[1px] border-gray-900/10 px-1 rounded-sm ${index === 0 && !reqData[0].toLowerCase().includes('os') ? 'col-span-3' : ''}`}
          >
            <span className="font-bold text-sm">{reqData[0]}</span>
            <span className="text-xs text-gray-500/90">{reqData[1]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// const Title = ({children}) => { third }

SysReq.propTypes = {
  platform: PropTypes.oneOf(['windows', 'mac', 'linux']),
  title: PropTypes.oneOf(['minimum', 'recommended']),
  systemReqData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
export default SysReq;
