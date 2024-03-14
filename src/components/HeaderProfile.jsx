import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonLink from './ButtonLink';
const HeaderProfile = ({ isLoggedIn, userId }) => {
  // user profile notifier. shows login button if no one is logged in
  // TODO
  return isLoggedIn ? (
    <Link to={`/profile/${userId}`}>
      <span className="material-symbols-rounded">account_circle</span>
    </Link>
  ) : (
    <ButtonLink text="Login" link="/login"></ButtonLink>
  );
};
HeaderProfile.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default HeaderProfile;
