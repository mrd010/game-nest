import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const HeaderProfile = ({ isLoggedIn, userId }) => {
  // user profile notifier. shows login button if no one is logged in
  // TODO
  return isLoggedIn ? (
    <Link to={`profile/${userId}`}>
      <span className="material-symbols-rounded">account_circle</span>
    </Link>
  ) : (
    <Link
      to="login"
      className="font-semibold text-gray-950 bg-yellow-400 hover:bg-yellow-500 hover:text py-2 px-8 rounded-md transition-colors"
    >
      Login
    </Link>
  );
};
HeaderProfile.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default HeaderProfile;
