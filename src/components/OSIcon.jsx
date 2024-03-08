import PropTypes from 'prop-types';
const OSIcon = ({ src, isAvailable, size = 18 }) => {
  // icon which represents an os and has opacity according to game availability for that os
  return (
    <div>
      <img
        src={src}
        alt="OS Icon"
        width={size}
        height={size}
        className={`os-icon ${isAvailable ? 'opacity-100' : 'opacity-15'}`}
      />
    </div>
  );
};
OSIcon.propTypes = {
  isAvailable: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  size: PropTypes.number,
};
export default OSIcon;
