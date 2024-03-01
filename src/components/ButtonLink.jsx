import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const ButtonLink = ({ text, link }) => {
  // simple Link with schematics of button

  return <Link to={link}>{text}</Link>;
};
ButtonLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
};
export default ButtonLink;
