import PropTypes from 'prop-types';
import { getCleanUrl } from '../services/utilities';
import { Link } from 'react-router-dom';
import { useDevices } from '../hooks/useDevices';
const SearchResult = (props) => {
  const { isMobile } = useDevices();
  return (
    <Link
      to={`/games/${props.appid}`}
      className="grid grid-flow-col justify-start items-center gap-2 py-2 px-4 hover:bg-yellow-300"
    >
      <img
        src={getCleanUrl(props.icon)}
        width={isMobile ? 24 : 32}
        height={isMobile ? 24 : 32}
        className="rounded-md"
      />
      <span className="font-bold text-lg md:text-base line-clamp-1 md:tracking-tighter">
        {props.name}
      </span>
    </Link>
  );
};
SearchResult.propTypes = {
  appid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};
export default SearchResult;
