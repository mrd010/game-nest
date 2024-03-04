import PropTypes from 'prop-types';
import { capitalizeWord } from '../services/utilities';
const SysReq = ({ platform, title, systemReqData }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] gap-2 bg-gray-200 rounded-md p-2">
      <h4 className="text-base font-bold justify-self-start bg-gray-900 rounded-md text-gray-50 px-1">
        {platform === 'windows' ? capitalizeWord(title) : capitalizeWord(platform)}
      </h4>
      <ul className="grid grid-cols-4 grid-flow-dense gap-1 h-full">
        {systemReqData.map((reqData, index) =>
          reqData.length === 2 ? (
            <li
              key={index}
              className={`flex flex-col border-[1px] border-gray-900/10 px-1 rounded-sm ${index === 0 && !reqData[0].toLowerCase().includes('os') ? 'col-span-4 border-none' : ''} ${reqData[1].length > 80 ? 'col-span-4' : reqData[1].length > 50 ? 'col-span-3' : reqData[1].length > 25 ? 'col-span-2' : ''}`}
            >
              <span className="font-bold text-sm">{reqData[0]}</span>
              <span className={`text-xs text-gray-500/90 break-words `}>{reqData[1]}</span>
            </li>
          ) : null
        )}
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
