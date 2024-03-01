import PropTypes from 'prop-types';
const OSIcon = ({ src, isAvailable }) => {
  // icon which represents an os and has opacity according to game availability for that os
  return (
    <div>
      <img
        src={src}
        alt="OS Icon"
        width={18}
        height={18}
        className={`os-icon ${isAvailable ? 'opacity-100' : 'opacity-20'}`}
      />
    </div>
  );
};
OSIcon.propTypes = {
  isAvailable: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
};
export default OSIcon;
