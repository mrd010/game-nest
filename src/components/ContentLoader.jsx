import PropTypes from 'prop-types';

const ContentLoader = ({ size, length }) => {
  return (
    <div style={{ height: size, width: length ? `${length}ch` : '100%' }} className="relative">
      <div className="content-loader rounded-sm"></div>
    </div>
  );
};
ContentLoader.propTypes = {
  size: PropTypes.string.isRequired,
  length: PropTypes.number,
};
export default ContentLoader;
