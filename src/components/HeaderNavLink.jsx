import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HeaderNavLink = ({ text, link, children }) => {
  return (
    <div>
      <Link
        to={link}
        className="font-semibold hover:bg-gray-50 hover:text py-2 px-4 hover:text-gray-950 rounded-md transition-colors"
      >
        {text}
      </Link>
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
