import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const GamesListRow = (props) => {
  console.log(props);
  return (
    <Link>
      <div>
        <img src={props.small_capsule_image} alt={props.name} />
      </div>
    </Link>
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
