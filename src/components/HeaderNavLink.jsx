import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HeaderNavLink = ({ text, link, children }) => {
  return (
    <div>
      <Link to={link}>{text}</Link>
      {children && <div>{children}</div>}
    </div>
  );
};

HeaderNavLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default HeaderNavLink;
