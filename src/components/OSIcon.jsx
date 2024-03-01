import PropTypes from 'prop-types';
const OSIcon = ({ src }) => {
  return (
    <div>
      <img src={src} alt="OS Icon" />
    </div>
  );
};
OSIcon.propTypes = {
  src: PropTypes.string.isRequired,
};
export default OSIcon;
