import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const ButtonLink = ({ text, link }) => {
  // simple Link with schematics of button

  return (
    <Link
      className="font-semibold text-gray-950 bg-yellow-400 focus:bg-yellow-300 hover:bg-yellow-300 shadow-sm py-2 px-8 rounded-md transition-colors"
      to={link}
    >
      {text}
    </Link>
  );
};
ButtonLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
};
export default ButtonLink;
