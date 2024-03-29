import PropTypes from 'prop-types';
import { capitalizeWord } from '../services/utilities';
const SysReq = ({ platform, title, systemReqData }) => {
  // a component gets data about system requirements and displays it
  return (
    <div className="grid grid-rows-[auto_1fr] gap-2 bg-gray-200 rounded-md p-2">
      {/* title */}
      <h4 className="text-base font-bold justify-self-start bg-gray-900 rounded-md text-gray-50 px-1">
        {platform === 'windows' ? capitalizeWord(title) : capitalizeWord(platform)}
      </h4>
      {/* sys req list as flexbox */}
      <ul className="flex flex-wrap h-full gap-1">
        {systemReqData.map((reqData, index) =>
          reqData.length > 0 ? (
            <li
              key={index}
              className={`flex flex-col border-gray-900/10 px-1 rounded-sm justify-center bg-gray-50`}
            >
              <span className="font-bold text-sm">{reqData[0]}</span>
              {reqData.length > 1 && (
                <span className={`text-xs text-gray-500/90 break-words `}>{reqData[1]}</span>
              )}
            </li>
          ) : null
        )}
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
