import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const HeaderProfile = ({ isLoggedIn = false, userId }) => {
  return isLoggedIn ? (
    <Link to={`profile/${userId}`}>
      <span className="material-symbols-rounded">account_circle</span>
    </Link>
  ) : (
    <Link to="login">Login</Link>
  );
};
HeaderProfile.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default HeaderProfile;
